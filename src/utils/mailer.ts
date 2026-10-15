import nodemailer from "nodemailer";

const isEmailConfigured = () =>
  Boolean(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

type SendEmailArgs = {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export const sendEmail = async ({
  from,
  to,
  subject,
  text,
  html,
}: SendEmailArgs) => {
  if (!to || !subject || (!text && !html)) {
    throw new Error("Email must include to, subject and body/text/html");
  }

  if (!isEmailConfigured()) {
    throw new Error(
      "Email service is not configured (EMAIL_HOST/EMAIL_USER/EMAIL_PASS missing)",
    );
  }

  await transporter.sendMail({
    from: from || process.env.EMAIL_FROM,
    to,
    subject,
    ...(html ? { html } : { text }),
  });
};

export default sendEmail;
