import { BrevoClient, Brevo } from "@getbrevo/brevo";

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!,
});

export async function sendWelcomeEmail(
  email: string,
  handle: string
) {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "Bookmark App",
      },
      to: [
        {
          email,
        },
      ],
      subject: "Welcome to Bookmark App",
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center"
              style="background:#2563eb;padding:30px;">
              <h1 style="color:white;margin:0;font-size:28px;">
                🔖 BookmarkHub
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;">

              <h2 style="margin-top:0;color:#0f172a;">
                Welcome, ${handle}! 🎉
              </h2>

              <p style="color:#475569;font-size:16px;line-height:1.6;">
                Your account has been created successfully.
              </p>

              <p style="color:#475569;font-size:16px;line-height:1.6;">
                BookmarkHub helps you organize, manage, and access your favorite links from anywhere.
              </p>

              <div style="text-align:center;margin:35px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
                  style="
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    padding:14px 28px;
                    border-radius:10px;
                    font-weight:bold;
                    display:inline-block;
                  ">
                  Go To Dashboard
                </a>
              </div>

              <table width="100%" style="margin-top:30px;">
                <tr>
                  <td style="padding:15px;background:#f8fafc;border-radius:10px;">
                    ⭐ Save bookmarks easily
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td style="padding:15px;background:#f8fafc;border-radius:10px;">
                    📁 Organize links efficiently
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td style="padding:15px;background:#f8fafc;border-radius:10px;">
                    🚀 Access your collection anytime
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
              style="padding:25px;background:#f8fafc;color:#64748b;font-size:13px;">
              © ${new Date().getFullYear()} BookmarkHub. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
    });

    console.log("BREVO RESULT:", result);
    return result;
  } catch (error) {
    console.error("BREVO ERROR:", error);
    throw error;
  }
}