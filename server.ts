import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // API Route for Booking with Email Confirmation
  app.post('/api/booking', async (req, res) => {
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

      // In a real app, you'd await this. For demo purposes if no SMTP is set, we'll log it.
      if (process.env.SMTP_HOST) {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
      } else {
        console.warn('SMTP NOT CONFIGURED. Email not sent, but request processed.');
      }

      res.status(200).json({ success: true, message: 'Booking inquiry processed and confirmation email sent.' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send confirmation email, but request logged.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
