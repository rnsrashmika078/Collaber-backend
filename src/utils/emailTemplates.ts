type LayoutArgs = {
  title: string;
  heading: string;
  bodyHtml: string;
  ctaText?: string;
  ctaUrl?: string;
};

const layout = ({ title, heading, bodyHtml, ctaText, ctaUrl }: LayoutArgs) => {
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Arial,Helvetica,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(30,58,95,0.10);">
            <tr>
              <td style="background-color:#1e3a5f;padding:30px 32px;text-align:center;">
                <div style="font-size:22px;font-weight:800;letter-spacing:3px;color:#ffffff;">SLSTINET</div>
                <div style="height:3px;width:56px;background-color:#d4af37;margin:12px auto 0;border-radius:3px;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px;">
                <h1 style="margin:0 0 18px;font-size:20px;line-height:1.3;color:#1e3a5f;">${heading}</h1>
                ${bodyHtml}
                ${
                  ctaText && ctaUrl
                    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 6px;">
                        <tr>
                          <td style="border-radius:8px;background-color:#1e3a5f;">
                            <a href="${ctaUrl}" style="display:inline-block;padding:13px 32px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;">${ctaText}</a>
                          </td>
                        </tr>
                      </table>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <div style="height:1px;background-color:#eef1f5;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 32px;text-align:center;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#9ca3af;">This is an automated message from SLSTINET. Please do not reply to this email.</p>
                <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#9ca3af;">&copy; ${year} SLSTINET. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const resetPasswordTemplate = ({
  name,
  resetUrl,
}: {
  name?: string;
  resetUrl: string;
}) =>
  layout({
    title: "Reset your SLSTINET password",
    heading: "Reset your password",
    ctaText: "Reset Password",
    ctaUrl: resetUrl,
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Hello${name ? ` ${name}` : ""},</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;">We received a request to reset the password for your <strong>SLSTINET</strong> account.</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Click the button below to choose a new password. This link is valid for <strong>1 hour</strong>.</p>
      <p style="margin:26px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="margin:6px 0 0;font-size:13px;line-height:1.6;word-break:break-all;"><a href="${resetUrl}" style="color:#1e3a5f;">${resetUrl}</a></p>
      <p style="margin:26px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">If you did not request a password reset, you can safely ignore this email &mdash; your password will remain unchanged.</p>
    `,
  });

export const registrationReceivedTemplate = ({
  name,
  email,
}: {
  name?: string;
  email: string;
}) =>
  layout({
    title: "SLSTINET registration received",
    heading: "Registration received",
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Dear ${name || "Applicant"},</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Thank you for registering with <strong>SLSTINET</strong>. We're glad to have you on board.</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Your registration has been <strong>received</strong> and is currently <strong style="color:#b8860b;">pending admin approval</strong>. You will be notified once your account has been reviewed.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background-color:#f8fafc;border:1px solid #eef1f5;border-radius:10px;margin:22px 0 4px;">
        <tr>
          <td style="padding:16px 18px;font-size:14px;line-height:1.6;">
            <div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Registered email</div>
            <div style="color:#1e3a5f;font-weight:700;">${email}</div>
          </td>
        </tr>
      </table>
      <p style="margin:22px 0 0;font-size:14px;line-height:1.65;color:#6b7280;">If you did not create this account, please contact the SLSTINET administrator.</p>
    `,
  });
