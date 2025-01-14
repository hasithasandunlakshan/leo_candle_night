import nodemailer from "nodemailer";

interface EmailOptions {
  sender: { name: string; address: string };
  recipients: { name: string; address: string }[];
  subject: string;
  message: string;
}

export async function sendEmail({ sender, recipients, subject, message }: EmailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.SMTP_PORT === "465", // Use secure for port 465
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `${sender.name} <${sender.address}>`,
      to: recipients.map((recipient) => `${recipient.name} <${recipient.address}>`).join(", "),
      subject,
      text: message,
    });
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error while sending email:", error);
    throw new Error("Email sending failed.");
  }
}
