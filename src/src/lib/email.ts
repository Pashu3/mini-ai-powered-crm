import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// For production, use a real email service
// For development, you can use services like Ethereal or Mailtrap
export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  // Create a testing account for development
  let testAccount = await nodemailer.createTestAccount();

  // Create reusable transporter
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || testAccount.user,
      pass: process.env.EMAIL_PASSWORD || testAccount.pass,
    },
  });

  // Send mail
  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"CRM System" <crm@example.com>',
    to,
    subject,
    text,
    html,
  });

  console.log('Message sent: %s', info.messageId);
  
  // In development, log preview URL
  if (!process.env.EMAIL_HOST) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

  return info;
}