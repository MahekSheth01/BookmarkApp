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
        email: "maheksheth77@gmail.com",
        name: "Bookmark App",
      },
      to: [
        {
          email,
        },
      ],
      subject: "Welcome to Bookmark App",
      htmlContent: `
        <h1>Welcome ${handle}!</h1>
        <p>Your account has been created successfully.</p>
        <p>Start saving and sharing your bookmarks.</p>
      `,
    });

    console.log("BREVO RESULT:", result);
    return result;
  } catch (error) {
    console.error("BREVO ERROR:", error);
    throw error;
  }
}