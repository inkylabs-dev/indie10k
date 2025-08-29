import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistConfirm(to: string, confirmUrl: string) {
  const fromEmail = process.env.EMAIL_FROM || 'Indie10k <hello@indie10k.com>';
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Confirm your email</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Welcome to Indie10k!</h2>
        <p>Thanks for joining our waitlist. Please confirm your email address by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${confirmUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Confirm Email
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          If the button doesn't work, you can also copy and paste this link into your browser:<br>
          <a href="${confirmUrl}" style="color: #2563eb;">${confirmUrl}</a>
        </p>
        
        <p style="color: #666; font-size: 12px; margin-top: 40px;">
          If you didn't sign up for our waitlist, you can safely ignore this email.
        </p>
      </body>
    </html>
  `;

  const textContent = `
Welcome to Indie10k!

Thanks for joining our waitlist. Please confirm your email address by visiting this link:

${confirmUrl}

If you didn't sign up for our waitlist, you can safely ignore this email.
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: 'Confirm your email - Indie10k',
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send confirmation email');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}