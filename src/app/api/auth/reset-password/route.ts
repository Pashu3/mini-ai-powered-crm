import { NextRequest, NextResponse } from 'next/server';
import { resetPassword } from '@/services/auth-service';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    await resetPassword(token, password);
    
    return NextResponse.json(
      { success: true, message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to reset password' },
      { status: 400 }
    );
  }
}