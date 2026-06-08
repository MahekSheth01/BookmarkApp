import { resend } from "./resend";

export async function sendWelcomeEmail(
  email: string,
  handle: string
) {
  const result=await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to Bookmark App",
    html: `
      <h1>Welcome ${handle}!</h1>

      <p>
        Your bookmark account has been created successfully.
      </p>

      <p>
        Start saving and sharing bookmarks.
      </p>
    `,
  });
  console.log("RESEND RESULT:", result);
}