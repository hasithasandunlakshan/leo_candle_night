import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.NODE_ENV !== 'development', // Use secure connection if not in development
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

export interface EmailAttachment {
  filename: string;
  content: string; // Base64 content
  encoding: string; // Typically 'base64'
  cid?: string; // Content ID for inline images
}

type SendEmailDto = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  message: string;
  attachments?: EmailAttachment[]; // Add attachments property
  
};

export const sendEmail = async (dto: SendEmailDto) => {
  const { sender, recipients, subject, message, attachments,} = dto;

  return await transport.sendMail({
    from: sender,
    to: recipients,
    subject,
    html: `<p>${message}</p>`, // Embed the QR code inline
    attachments,
  });
};
