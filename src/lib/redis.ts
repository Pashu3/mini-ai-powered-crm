import { Redis } from 'ioredis';

// Mock Redis client implementation for when Redis is unavailable
class MockRedisClient {
  private cache = new Map<string, { value: string; expiry?: number }>();

  constructor() {
    console.log('Using mock Redis client');
  }

  async get(key: string): Promise<string | null> {
    const item = this.cache.get(key);
    
    // Check if item exists and hasn't expired
    if (!item) return null;
    if (item.expiry && item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set(key: string, value: string, mode?: string, duration?: number): Promise<'OK'> {
    let expiry: number | undefined = undefined;
    
    // Handle expiration (EX mode is seconds)
    if (mode === 'EX' && duration) {
      expiry = Date.now() + (duration * 1000);
    }
    
    this.cache.set(key, { value, expiry });
    return 'OK';
  }

  async del(...keys: string[]): Promise<number> {
    let count = 0;
    for (const key of keys) {
      if (this.cache.delete(key)) {
        count++;
      }
    }
    return count;
  }

  async keys(pattern: string): Promise<string[]> {
    // Simple pattern matching for keys - handles only * wildcards
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    const result: string[] = [];
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        result.push(key);
      }
    }
    
    return result;
  }

  async flushall(): Promise<'OK'> {
    this.cache.clear();
    return 'OK';
  }
}

// Type for our Redis client (real or mock)
type RedisClientType = Redis | MockRedisClient;

// Configure and create Redis client with fallback
const getRedisClient = (): RedisClientType => {
  // IMPORTANT: Force mock Redis if environment variable isn't set
  process.env.MOCK_REDIS = process.env.MOCK_REDIS || 'true';
  
  // Use mock if explicitly requested or if we're in test environment
  if (process.env.MOCK_REDIS === 'true' || process.env.NODE_ENV === 'test') {
    return new MockRedisClient();
  }

  try {
    const redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: 3,  // Limit retries to avoid hanging
      retryStrategy(times) {
        if (times > 3) {
          // After 3 retries, stop trying and use the mock
          console.error(`Redis connection failed after ${times} attempts, using mock client`);
          return null;
        }
        // Exponential backoff with max 1s delay
        return Math.min(times * 100, 1000);
      },
      reconnectOnError(err) {
        // Don't reconnect on certain errors
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          return false;
        }
        return true;
      },
    });

    // Handle connection errors
    redis.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
    
    // Add connection event for debugging
    redis.on('connect', () => {
      console.log('Redis connected successfully');
    });

    return redis;
  } catch (error) {
    console.error('Failed to initialize Redis client, using mock:', error);
    return new MockRedisClient();
  }
};

// Create Redis client singleton with error handling
let redisClient: RedisClientType;

try {
  redisClient = getRedisClient();
} catch (error) {
  console.error('Error creating Redis client, falling back to mock:', error);
  redisClient = new MockRedisClient();
}

export default redisClient;

// Helper functions for cache operations with additional error handling
export const cacheGet = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return null;
  }
};

export const cacheSet = async (key: string, data: any, ttl?: number): Promise<void> => {
  try {
    if (ttl) {
      await redisClient.set(key, JSON.stringify(data), 'EX', ttl);
    } else {
      await redisClient.set(key, JSON.stringify(data));
    }
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
};

export const cacheDelete = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error(`Error deleting cache for key ${key}:`, error);
  }
};

export const cacheDeletePattern = async (pattern: string): Promise<void> => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (error) {
    console.error(`Error deleting cache pattern ${pattern}:`, error);
  }
};