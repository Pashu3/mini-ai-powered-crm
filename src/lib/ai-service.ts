import OpenAI from 'openai';
import { cacheGet, cacheSet } from './redis';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock AI responses for development without API key
const mockAiResponses = {
  followUp: [
    "Send a follow-up email reminding them about your last conversation.",
    "Connect on LinkedIn and engage with their recent post.",
    "Wait 3 days before reaching out again.",
    "Share a relevant case study that addresses their pain points.",
    "Schedule a quick call to address any questions they may have.",
    "Send them a personalized video message.",
  ],
  emailDraft: {
    subject: "Following up on our conversation",
    body: "Hi {{name}},\n\nI hope you're doing well. I wanted to follow up on our conversation about {{topic}}. I thought you might find this resource helpful: {{resource}}.\n\nWould you have 15 minutes this week to discuss how we can help you with {{painPoint}}?\n\nBest regards,\n{{sender}}"
  }
};

// Helper to get mock or real AI response
const getAiResponse = async (type: string, prompt: string) => {
  if (process.env.MOCK_AI === 'true') {
    // Return mock response for development
    if (type === 'suggestion') {
      return { suggestion: mockAiResponses.followUp[Math.floor(Math.random() * mockAiResponses.followUp.length)] };
    }
    if (type === 'emailDraft') {
      return mockAiResponses.emailDraft;
    }
    return { text: "This is a mock AI response." };
  }

  // Cache key for AI responses to reduce API calls
  const cacheKey = `ai:${type}:${prompt.substring(0, 50)}`;
  
  // Check cache first
  const cachedResponse = await cacheGet(cacheKey);
  if (cachedResponse) return cachedResponse;

  // Call OpenAI API
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful sales assistant that provides advice on next steps with leads."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = response.choices[0].message.content;
    
    // Cache result for future use (1 hour TTL)
    await cacheSet(cacheKey, { text: result }, 3600);
    
    return { text: result };
  } catch (error) {
    console.error('AI service error:', error);
    throw new Error('Failed to get AI suggestion');
  }
};

export const getNextStepSuggestion = async (leadData: any) => {
  const prompt = `
    Based on this lead's information, suggest the next best step to take:
    - Name: ${leadData.name}
    - Company: ${leadData.company || 'Not provided'}
    - Position: ${leadData.position || 'Not provided'}
    - Current Stage: ${leadData.stage}
    - Last Contacted: ${leadData.lastContactedDate ? new Date(leadData.lastContactedDate).toLocaleDateString() : 'Never'}
    - Notes: ${leadData.notes || 'No notes available'}

    Provide a single, specific next action to move this lead forward.
  `;
  
  return getAiResponse('suggestion', prompt);
};

export const generateEmailDraft = async (leadData: any, purpose: string) => {
  const prompt = `
    Generate a personalized email for this lead:
    - Name: ${leadData.name}
    - Company: ${leadData.company || 'Not provided'}
    - Position: ${leadData.position || 'Not provided'}
    - Email Purpose: ${purpose}
    - Notes: ${leadData.notes || 'No notes available'}

    Write a subject line and email body that is professional, concise, and effective.
    Format your response as JSON with "subject" and "body" fields.
  `;
  
  const response = await getAiResponse('emailDraft', prompt) as { text?: string; subject?: string; body?: string };
  
  // Parse JSON if it's a string
  if (typeof response.text === 'string' && response.text.includes('{')) {
    try {
      const jsonStart = response.text.indexOf('{');
      const jsonEnd = response.text.lastIndexOf('}') + 1;
      const jsonStr = response.text.substring(jsonStart, jsonEnd);
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', e);
    }
  }
  
  return response;
};

export default {
  getNextStepSuggestion,
  generateEmailDraft,
};