import nodemailer from "nodemailer";

const port = Number(process.env.MAIL_PORT) || 587;

const isEmailConfigured = () =>
  Boolean(
    process.env.MAIL_HOST &&
      process.env.MAIL_USERNAME &&
      process.env.MAIL_PASSWORD,
  );

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD?.replace(/\s+/g, ""),
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
      "Email service is not configured (MAIL_HOST/MAIL_USERNAME/MAIL_PASSWORD missing)",
    );
  }

  await transporter.sendMail({
    from: from || process.env.MAIL_FROM_ADDRESS,
    to,
    subject,
    ...(html ? { html } : { text }),
  });
};

export default sendEmail;
