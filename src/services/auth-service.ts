import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email'; // You'll need to implement this

export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Don't return the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return null;
  }

  // Don't return the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function createPasswordResetToken(email: string) {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // For security reasons, don't reveal if a user doesn't exist
  if (!user) {
    return true;
  }

  // Generate token
  const token = randomBytes(32).toString('hex');
  
  // Token expires in 1 hour
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  // Delete any existing reset tokens for this user
  await prisma.passwordReset.deleteMany({
    where: { email },
  });

  // Create new reset token
  await prisma.passwordReset.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  // Construct reset URL
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`;

  // Send email with reset link
  try {
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      text: `Please use the following link to reset your password: ${resetUrl}. This link is valid for 1 hour.`,
      html: `
        <p>You requested a password reset.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link is valid for 1 hour.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send reset email:', error);
    throw new Error('Failed to send reset email');
  }
}

export async function resetPassword(token: string, newPassword: string) {
  // Find the reset record
  const resetRecord = await prisma.passwordReset.findUnique({
    where: { token },
  });

  if (!resetRecord) {
    throw new Error('Invalid or expired token');
  }

  // Check if token is expired
  if (resetRecord.expiresAt < new Date()) {
    await prisma.passwordReset.delete({
      where: { token },
    });
    throw new Error('Token has expired');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password
  await prisma.user.update({
    where: { email: resetRecord.email },
    data: { password: hashedPassword },
  });

  // Remove the used token
  await prisma.passwordReset.delete({
    where: { token },
  });

  return true;
}