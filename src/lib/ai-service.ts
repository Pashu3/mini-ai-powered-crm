import OpenAI from 'openai';
import { cacheGet, cacheSet } from './redis';

interface AIResponse {
  text?: string;
  suggestion?: string;
  reasoning?: string;
  followUpDays?: number;
  priority?: number;
  subject?: string;
  body?: string;
  [key: string]: any; 
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

const getAiResponse = async (type: string, prompt: string): Promise<AIResponse> => {
  if (process.env.MOCK_AI === 'true') {
    if (type === 'suggestion') {
      const suggestion = mockAiResponses.followUp[Math.floor(Math.random() * mockAiResponses.followUp.length)];
      return { 
        suggestion,
        reasoning: "This is a mock suggestion.",
        followUpDays: Math.floor(Math.random() * 5) + 1,
        priority: Math.floor(Math.random() * 5) + 1
      };
    }
    if (type === 'emailDraft') {
      return mockAiResponses.emailDraft as AIResponse;
    }
    if (type === 'leadInsights') {
      return {
        keyInsights: "This lead shows moderate interest based on their interaction history.",
        riskFactors: "Competitor engagement, budget constraints",
        recommendedApproach: "Value-based selling with ROI focus",
        estimatedCloseTimeframe: "3-4 weeks",
        confidenceAdjustment: 5
      };
    }
    return { text: "This is a mock AI response." };
  }

  const cacheKey = `ai:${type}:${prompt.substring(0, 50)}`;
  
  const cachedResponse = await cacheGet<AIResponse>(cacheKey);
  if (cachedResponse) return cachedResponse;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
      response_format: { type: "json_object" } 
    });

    const result = response.choices[0].message.content;
    let finalResult: AIResponse;
    
    try {
      finalResult = result ? JSON.parse(result) : { text: "" };
    } catch (parseError) {
      console.error('Failed to parse OpenAI JSON response:', parseError);
      
      if (type === 'suggestion') {
        const suggestion = mockAiResponses.followUp[Math.floor(Math.random() * mockAiResponses.followUp.length)];
        finalResult = { 
          suggestion, 
          reasoning: "Generated as fallback due to parsing error",
          followUpDays: 3,
          priority: 2
        };
      } else if (type === 'emailDraft') {
        finalResult = mockAiResponses.emailDraft as AIResponse;
      } else {
        finalResult = { text: result || "Failed to parse response" };
      }
    }
    
    await cacheSet(cacheKey, finalResult, 3600);
    
    return finalResult;
  } catch (error) {
    console.error('AI service error:', error);
    
    if (type === 'suggestion') {
      const suggestion = mockAiResponses.followUp[Math.floor(Math.random() * mockAiResponses.followUp.length)];
      return { 
        suggestion, 
        reasoning: "Generated as fallback due to API error",
        followUpDays: 3,
        priority: 2
      };
    } else if (type === 'emailDraft') {
      return mockAiResponses.emailDraft as AIResponse;
    }
    
    return { text: "Failed to get AI response. Using fallback." };
  }
};

export const getNextStepSuggestion = async (leadData: any): Promise<AIResponse> => {
  const prompt = `
    Based on this lead's information, suggest the next best step to take:
    - Name: ${leadData.name}
    - Company: ${leadData.company || 'Not provided'}
    - Position: ${leadData.position || 'Not provided'}
    - Current Stage: ${leadData.stage}
    - Lead Source: ${leadData.source || 'Not specified'}
    - Confidence Score: ${leadData.confidence || 50}/100
    - Priority Level: ${leadData.priority || 2}/5
    - Region/Territory: ${leadData.region || 'Not specified'}
    - Timezone: ${leadData.timezone || 'Not specified'}
    - Last Contacted: ${leadData.lastContactedDate ? new Date(leadData.lastContactedDate).toLocaleDateString() : 'Never'}
    - Notes: ${leadData.notes || 'No notes available'}

    Given this is a lead from ${leadData.source || 'an unknown source'} with a confidence score of ${leadData.confidence || 50}/100, 
    provide a specific next action to move this lead forward. Include a suggested timeframe for the follow-up.
    
    You MUST format your response as a valid JSON object with these fields:
    {
      "suggestion": "The specific action to take",
      "reasoning": "Brief explanation of why this action is appropriate",
      "followUpDays": Number of days to wait before following up,
      "priority": Number from 1-5 representing urgency (5 being highest)
    }
  `;
  
  try {
    return await getAiResponse('suggestion', prompt);
  } catch (error) {
    console.error('Failed to get next step suggestion:', error);
    // Return a mock suggestion if all else fails
    const suggestion = mockAiResponses.followUp[Math.floor(Math.random() * mockAiResponses.followUp.length)];
    return {
      suggestion,
      reasoning: "Generated as ultimate fallback due to processing error",
      followUpDays: 3,
      priority: 2
    };
  }
};

export const generateEmailDraft = async (leadData: any, purpose: string): Promise<AIResponse> => {
  const prompt = `
    Generate a personalized email for this lead:
    - Name: ${leadData.name}
    - Company: ${leadData.company || 'Not provided'}
    - Position: ${leadData.position || 'Not provided'}
    - Lead Source: ${leadData.source || 'Not specified'}
    - Region/Territory: ${leadData.region || 'Not specified'} 
    - Email Purpose: ${purpose}
    - Confidence Score: ${leadData.confidence || 50}/100
    - Current Stage: ${leadData.stage || 'NEW'}
    - Notes: ${leadData.notes || 'No notes available'}

    Write a subject line and email body that is:
    1. Tailored to someone from ${leadData.source || 'any source'}
    2. Appropriate for their region: ${leadData.region || 'any location'}
    3. Aligned with their current stage: ${leadData.stage || 'NEW'} 
    4. Professional, concise, and effective

    You MUST format your response as a valid JSON object with these fields:
    {
      "subject": "The email subject line",
      "body": "The complete email body"
    }
  `;
  
  try {
    return await getAiResponse('emailDraft', prompt);
  } catch (error) {
    console.error('Failed to generate email draft:', error);
    // Return mock email template as ultimate fallback
    const mockEmail = mockAiResponses.emailDraft as AIResponse;
    
    // Personalize the mock template with the lead's data
    if (mockEmail.body && leadData.name) {
      mockEmail.body = mockEmail.body.replace('{{name}}', leadData.name);
      mockEmail.body = mockEmail.body.replace('{{topic}}', 'your business needs');
      mockEmail.body = mockEmail.body.replace('{{resource}}', 'our latest case study');
      mockEmail.body = mockEmail.body.replace('{{painPoint}}', 'improving your business processes');
      mockEmail.body = mockEmail.body.replace('{{sender}}', 'Your Account Manager');
    }
    
    return mockEmail;
  }
};

export const generateLeadInsights = async (leadData: any): Promise<AIResponse> => {
  const prompt = `
    Based on this lead's information, provide insights and recommendations:
    - Name: ${leadData.name}
    - Company: ${leadData.company || 'Not provided'}
    - Position: ${leadData.position || 'Not provided'}
    - Stage: ${leadData.stage}
    - Source: ${leadData.source || 'Not specified'}
    - Confidence: ${leadData.confidence || 50}/100
    - Priority: ${leadData.priority || 2}/5
    - Region: ${leadData.region || 'Not specified'}
    - Notes: ${leadData.notes || 'No notes available'}
    
    If available, here are past conversations:
    ${leadData.conversations?.map((conv: any) => 
      `- ${new Date(conv.date).toLocaleDateString()}: ${conv.summary}`).join('\n') || 'No conversation history available'}

    You MUST format your response as a valid JSON object with these fields:
    {
      "keyInsights": "Key observations about this lead and their potential",
      "riskFactors": "Potential risks or challenges in closing this lead",
      "recommendedApproach": "Suggested sales approach based on their source and profile",
      "estimatedCloseTimeframe": "Estimated time to close (in days/weeks)",
      "confidenceAdjustment": "Suggested adjustment to confidence score (-10 to +10)"
    }
  `;
  
  try {
    return await getAiResponse('leadInsights', prompt);
  } catch (error) {
    console.error('Failed to generate lead insights:', error);
    // Return default insights as fallback
    return {
      keyInsights: `${leadData.name} from ${leadData.company || 'their company'} is at the ${leadData.stage || 'NEW'} stage with moderate potential.`,
      riskFactors: "Limited information available to assess risks accurately.",
      recommendedApproach: leadData.source === 'REFERRAL' ? "Leverage the referral relationship" : "Standard sales process with regular follow-ups",
      estimatedCloseTimeframe: "4-6 weeks",
      confidenceAdjustment: 0
    };
  }
};

export const analyzeConversation = async (conversationText: string, leadData: any): Promise<AIResponse> => {
  const prompt = `
    Analyze this sales conversation with a lead:
    
    "${conversationText.substring(0, 2000)}"
    
    Lead context:
    - Name: ${leadData.name}
    - Company: ${leadData.company || 'Not provided'}
    - Current Stage: ${leadData.stage || 'NEW'}
    - Source: ${leadData.source || 'Not specified'}
    
    You MUST format your response as a valid JSON object with these fields:
    {
      "summary": "Brief summary of the conversation (1-2 sentences)",
      "sentiment": "Positive, Neutral, or Negative assessment of lead's interest",
      "keyPoints": ["Array of key points discussed"],
      "objections": ["Array of any objections raised"],
      "nextSteps": "Recommended next action based on this conversation",
      "followUpDate": "Suggested follow-up date in YYYY-MM-DD format"
    }
  `;
  
  try {
    return await getAiResponse('conversationAnalysis', prompt);
  } catch (error) {
    console.error('Failed to analyze conversation:', error);
    // Return basic analysis as fallback
    return {
      summary: "Conversation with lead about product features and pricing.",
      sentiment: "Neutral",
      keyPoints: ["Discussed product features", "Addressed pricing questions"],
      objections: ["Current budget constraints"],
      nextSteps: "Follow up with detailed proposal",
      followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  }
};

export default {
  getNextStepSuggestion,
  generateEmailDraft,
  generateLeadInsights,
  analyzeConversation
};