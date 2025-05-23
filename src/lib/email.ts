import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

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

// Export start notification template
export function getExportStartedEmailTemplate(
  userName: string,
  exportType: string
) {
  return {
    subject: `Your ${exportType} Export Has Started`,
    text: `Hello ${userName},

We've started processing your ${exportType} export. You'll receive another notification when it's ready for download.

Thank you for using our CRM system.

Best regards,
CRM Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; margin-bottom: 10px;">Export Processing</h1>
          <p style="color: #666; font-size: 16px;">We're working on your data export</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;">Hello ${userName},</p>
          <p style="margin: 0 0 15px 0;">We've started processing your <strong>${exportType}</strong> export. This may take a few minutes depending on the amount of data.</p>
          <p style="margin: 0 0 15px 0;">You'll receive another notification when your export is ready for download.</p>
        </div>
        
        <div style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0 0 10px 0;">If you didn't request this export, please ignore this email or contact support.</p>
          <p style="margin: 0;">Thank you for using our CRM system.</p>
        </div>
      </div>
    `,
  };
}

// Export completed notification template
export function getExportCompletedEmailTemplate(
  userName: string, 
  exportType: string, 
  exportUrl: string,
  expiryHours: number = 72
) {
  return {
    subject: `Your ${exportType} Export is Ready`,
    text: `Hello ${userName},

Your ${exportType} export is now ready for download. You can access it from your dashboard or by clicking the link in this email.

Download link: ${exportUrl}

Note: This download link will expire in ${expiryHours} hours.

Thank you for using our CRM system.

Best regards,
CRM Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; margin-bottom: 10px;">Export Ready</h1>
          <p style="color: #666; font-size: 16px;">Your requested data is available for download</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;">Hello ${userName},</p>
          <p style="margin: 0 0 15px 0;">Your <strong>${exportType}</strong> export has been successfully processed and is now ready for download.</p>
          <p style="margin: 0 0 5px 0;"><strong>Note:</strong> This download link will expire in ${expiryHours} hours.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${exportUrl}" style="background-color: #4a6cf7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Download Export</a>
        </div>
        
        <div style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0 0 10px 0;">If you didn't request this export, please ignore this email or contact support.</p>
          <p style="margin: 0;">Thank you for using our CRM system.</p>
        </div>
      </div>
    `,
  };
}

// Export failed notification template
export function getExportFailedEmailTemplate(
  userName: string,
  exportType: string,
  errorMessage: string = "An unexpected error occurred"
) {
  return {
    subject: `Your ${exportType} Export Failed`,
    text: `Hello ${userName},

We encountered a problem while processing your ${exportType} export. 

Error details: ${errorMessage}

You can try again by creating a new export from your dashboard. If the problem persists, please contact our support team.

Thank you for your patience.

Best regards,
CRM Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; margin-bottom: 10px;">Export Failed</h1>
          <p style="color: #666; font-size: 16px;">We encountered a problem with your export</p>
        </div>
        
        <div style="background-color: #fff4f4; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #f87171;">
          <p style="margin: 0 0 10px 0;">Hello ${userName},</p>
          <p style="margin: 0 0 15px 0;">We encountered a problem while processing your <strong>${exportType}</strong> export.</p>
          <p style="margin: 0 0 15px 0;"><strong>Error details:</strong> ${errorMessage}</p>
          <p style="margin: 0;">You can try again by creating a new export from your dashboard. If the problem persists, please contact our support team.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/exports" style="background-color: #4a6cf7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Go to Exports</a>
        </div>
        
        <div style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0;">Thank you for your patience and for using our CRM system.</p>
        </div>
      </div>
    `,
  };
}

// Large export notification template (for particularly large exports that might take longer)
export function getLargeExportNotificationTemplate(
  userName: string,
  exportType: string,
  estimatedTimeMinutes: number = 30
) {
  return {
    subject: `Your Large ${exportType} Export is Processing`,
    text: `Hello ${userName},

Your ${exportType} export is larger than usual and may take approximately ${estimatedTimeMinutes} minutes to complete.

You'll receive another notification when your export is ready for download.

Thank you for your patience.

Best regards,
CRM Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; margin-bottom: 10px;">Large Export Processing</h1>
          <p style="color: #666; font-size: 16px;">Your export is larger than usual</p>
        </div>
        
        <div style="background-color: #f0f7ff; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #60a5fa;">
          <p style="margin: 0 0 10px 0;">Hello ${userName},</p>
          <p style="margin: 0 0 15px 0;">Your <strong>${exportType}</strong> export is larger than usual and may take approximately <strong>${estimatedTimeMinutes} minutes</strong> to complete.</p>
          <p style="margin: 0;">You'll receive another notification when your export is ready for download.</p>
        </div>
        
        <div style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0 0 10px 0;">If you didn't request this export, please ignore this email or contact support.</p>
          <p style="margin: 0;">Thank you for your patience and for using our CRM system.</p>
        </div>
      </div>
    `,
  };
}

// Export about to expire notification template
export function getExportExpiringEmailTemplate(
  userName: string,
  exportType: string,
  exportUrl: string,
  hoursRemaining: number = 24
) {
  return {
    subject: `Your ${exportType} Export Will Expire Soon`,
    text: `Hello ${userName},

Your ${exportType} export will expire in ${hoursRemaining} hours. If you haven't downloaded it yet, please do so before it expires.

Download link: ${exportUrl}

After expiration, you'll need to create a new export.

Thank you for using our CRM system.

Best regards,
CRM Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; margin-bottom: 10px;">Export Expiring Soon</h1>
          <p style="color: #666; font-size: 16px;">Download your export before it expires</p>
        </div>
        
        <div style="background-color: #fff8e6; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0 0 10px 0;">Hello ${userName},</p>
          <p style="margin: 0 0 15px 0;">Your <strong>${exportType}</strong> export will expire in <strong>${hoursRemaining} hours</strong>. If you haven't downloaded it yet, please do so before it expires.</p>
          <p style="margin: 0;">After expiration, you'll need to create a new export.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${exportUrl}" style="background-color: #4a6cf7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Download Now</a>
        </div>
        
        <div style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0 0 10px 0;">If you no longer need this export, you can ignore this email.</p>
          <p style="margin: 0;">Thank you for using our CRM system.</p>
        </div>
      </div>
    `,
  };
}