export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { createPasswordResetToken } from '@/services/auth-service';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    await createPasswordResetToken(email);
    
    // Always return success for security reasons
    // Even if the email doesn't exist in the system
    return NextResponse.json(
      { success: true, message: 'If an account with this email exists, a password reset link has been sent' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}