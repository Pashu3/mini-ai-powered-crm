import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export function successResponse<T>(data: T, message?: string): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message
  }, { status: 200 });
}

export function createdResponse<T>(data: T, message?: string): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message
  }, { status: 201 });
}

export function errorResponse(error: string, status: number = 400): NextResponse {
  return NextResponse.json({
    success: false,
    error
  }, { status });
}

export function notFoundResponse(message: string = 'Resource not found'): NextResponse {
  return errorResponse(message, 404);
}

export function unauthorizedResponse(message: string = 'Unauthorized'): NextResponse {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message: string = 'Forbidden'): NextResponse {
  return errorResponse(message, 403);
}

export async function getCurrentUser(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return null;
    
    // In a real app you'd validate the JWT here
    // For now, we're using Next-Auth so this would be done in middleware
    return null;
  } catch (error) {
    return null;
  }
}