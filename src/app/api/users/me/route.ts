import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        preferences: true,
        createdAt: true,
      },
    });
    
    if (!user) {
      return errorResponse('User not found');
    }
    
    return successResponse(user);
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return errorResponse(error.message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    const updateData: any = {};
    
    // Only allow updating certain fields
    if (data.name) updateData.name = data.name;
    
    // Handle password change
    if (data.currentPassword && data.newPassword) {
      // Verify current password
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
      });
      
      if (!user) {
        return errorResponse('User not found');
      }
      
      const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password);
      
      if (!isPasswordValid) {
        return errorResponse('Current password is incorrect');
      }
      
      // Validate new password
      if (data.newPassword.length < 8) {
        return errorResponse('New password must be at least 8 characters long');
      }
      
      // Hash and set new password
      updateData.password = await bcrypt.hash(data.newPassword, 10);
    }
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        preferences: true,
        createdAt: true,
      },
    });
    
    return successResponse(updatedUser);
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return errorResponse(error.message);
  }
}