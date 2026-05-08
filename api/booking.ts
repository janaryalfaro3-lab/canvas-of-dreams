import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, artist, style, vision, preferredDate, preferredTime } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  try {
    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'no-reply@canvasofdreams.com',
        pass: process.env.SMTP_PASS || 'password_here',
      },
    });

    const mailOptions = {
      from: '"Canvas of Dreams" <no-reply@canvasofdreams.com>',
      to: email,
      subject: 'Booking Inquiry Received - Canvas of Dreams',
      html: `
        <div style="font-family: serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; padding: 40px; border-radius: 12px; background-color: #ffffff;">
          <h1 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">Canvas of Dreams</h1>
          <p>Dear <strong>${fullName}</strong>,</p>
          <p>We have received your booking inquiry. Our team will review your vision and contact you shortly to confirm the details.</p>
          
          <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin: 30px 0; border: 1px solid #eeeeee;">
            <h3 style="margin-top: 0; color: #ea580c; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Inquiry Summary</h3>
            <p style="margin: 8px 0;"><strong>Artist:</strong> ${artist}</p>
            <p style="margin: 8px 0;"><strong>Style:</strong> ${style}</p>
            <p style="margin: 8px 0;"><strong>Preferred Date:</strong> ${preferredDate || 'To be discussed'}</p>
            <p style="margin: 8px 0;"><strong>Preferred Time:</strong> ${preferredTime || 'To be discussed'}</p>
            <p style="margin: 15px 0 0 0;"><strong>Your Vision:</strong></p>
            <p style="margin: 5px 0; font-style: italic; color: #444;">"${vision}"</p>
          </div>

          <p>If you need to make urgent changes, please reply to this email or call us at <strong>09764421242</strong>.</p>
          
          <p style="margin-top: 40px;">Stay Creative,</p>
          <p><strong>The Canvas of Dreams Team</strong></p>
          
          <div style="border-top: 1px solid #e5e5e5; margin-top: 40px; padding-top: 20px;">
            <p style="font-style: italic; color: #71717a; font-size: 11px;">This is an automated confirmation of your inquiry. Please wait for our resident artist to contact you directly for final confirmation.</p>
          </div>
        </div>
      `,
    };

    if (process.env.SMTP_HOST) {
      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({ success: true, message: 'Booking inquiry processed and confirmation email sent.' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    const errorMessage = error.code === 'EAI_AGAIN' || error.code === 'ENOTFOUND'
      ? `Connectivity/DNS error. Please check if your SMTP_HOST ("${process.env.SMTP_HOST}") is correct.`
      : 'Failed to process request.';
    return res.status(500).json({ error: errorMessage });
  }
}
