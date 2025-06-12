import { sendEmailAction } from "@/app/actions/sendMail";

export interface BlogPost {
  id: string;
  title: string;
  readTime?: string | null;
}

export interface User {
  name?: string | null;
  email: string;
}

export interface Category {
  name: string;
}

export async function sendBlogPublishedEmail(
  user: User,
  blogPost: BlogPost,
  category: Category
) {
  if (!user.email) {
    throw new Error("User email is required");
  }

  const emailResult = await sendEmailAction({
    to: user.email,
    subject: "🎉 Your Blog Post Has Been Published Successfully!",
    text: `Hi ${user.name || "there"},

Congratulations! Your blog post "${
      blogPost.title
    }" has been successfully published on Bits and Bytes.

Your post is now live and can be viewed at: ${process.env.NEXTAUTH_URL}/blog/${
      blogPost.id
    }

Post Details:
- Title: ${blogPost.title}
- Category: ${category.name}
- Published: ${new Date().toLocaleDateString()}
- Estimated Read Time: ${blogPost.readTime || "N/A"}

Thank you for contributing to our developer community! Your insights and knowledge help make our platform a valuable resource for fellow developers.

Happy coding!
The Bits and Bytes Team`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1f2937; margin-bottom: 20px; font-size: 24px;">🎉 Blog Post Published Successfully!</h1>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Hi <strong>${user.name || "there"}</strong>,
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Congratulations! Your blog post has been successfully published on <strong>Bits and Bytes</strong>.
        </p>
        
        <div style="background-color: #f3f4f6; border-radius: 6px; padding: 20px; margin: 20px 0;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">"${
            blogPost.title
          }"</h2>
          <p style="color: #6b7280; margin: 5px 0;"><strong>Category:</strong> ${
            category.name
          }</p>
          <p style="color: #6b7280; margin: 5px 0;"><strong>Published:</strong> ${new Date().toLocaleDateString()}</p>
          <p style="color: #6b7280; margin: 5px 0;"><strong>Read Time:</strong> ${
            blogPost.readTime || "N/A"
          }</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/blog/${blogPost.id}" 
             style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
            View Your Post
          </a>
        </div>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Thank you for contributing to our developer community! Your insights and knowledge help make our platform a valuable resource for fellow developers.
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Happy coding!<br>
          <strong>The Bits and Bytes Team</strong>
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #9ca3af; font-size: 14px; text-align: center;">
          You received this email because you published a blog post on Bits and Bytes.
        </p>
      </div>
    </div>
    `,
  });

  return emailResult;
}

export async function sendWelcomeEmail(user: User) {
  if (!user.email) {
    throw new Error("User email is required");
  }

  const emailResult = await sendEmailAction({
    to: user.email,
    subject: "Welcome to Bits and Bytes! 🚀",
    text: `Hi ${user.name || "there"},

Welcome to Bits and Bytes - the community-driven platform for developers!

We're excited to have you join our community of passionate developers who share insights, tutorials, and experiences in software development.

What you can do on Bits and Bytes:
- Share your knowledge by writing blog posts
- Discover trending topics in tech
- Connect with fellow developers
- Learn from others' experiences
- Build your developer profile

Ready to get started? Visit your dashboard: ${process.env.NEXTAUTH_URL}/profile

Happy coding!
The Bits and Bytes Team`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1f2937; margin-bottom: 20px; font-size: 24px;">Welcome to Bits and Bytes! 🚀</h1>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Hi <strong>${user.name || "there"}</strong>,
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Welcome to <strong>Bits and Bytes</strong> - the community-driven platform for developers!
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          We're excited to have you join our community of passionate developers who share insights, tutorials, and experiences in software development.
        </p>
        
        <div style="background-color: #f3f4f6; border-radius: 6px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">What you can do on Bits and Bytes:</h3>
          <ul style="color: #374151; margin: 0; padding-left: 20px;">
            <li style="margin: 8px 0;">Share your knowledge by writing blog posts</li>
            <li style="margin: 8px 0;">Discover trending topics in tech</li>
            <li style="margin: 8px 0;">Connect with fellow developers</li>
            <li style="margin: 8px 0;">Learn from others' experiences</li>
            <li style="margin: 8px 0;">Build your developer profile</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/profile" 
             style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
            Visit Your Dashboard
          </a>
        </div>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Happy coding!<br>
          <strong>The Bits and Bytes Team</strong>
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #9ca3af; font-size: 14px; text-align: center;">
          You received this email because you joined Bits and Bytes.
        </p>
      </div>
    </div>
    `,
  });

  return emailResult;
}

export async function sendNewPostNotificationToAdmin(
  user: User,
  blogPost: BlogPost,
  category: Category
) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn(
      "ADMIN_EMAIL environment variable not set, skipping admin notification"
    );
    return { success: false, error: "Admin email not configured" };
  }

  const emailResult = await sendEmailAction({
    to: adminEmail,
    subject: "📝 New Blog Post Published on Bits and Bytes",
    text: `Hello Admin,

A new blog post has been published on Bits and Bytes.

Author: ${user.name || "Anonymous"} (${user.email})
Title: "${blogPost.title}"
Category: ${category.name}
Published: ${new Date().toLocaleDateString()}
Read Time: ${blogPost.readTime || "N/A"}

View the post: ${process.env.NEXTAUTH_URL}/blog/${blogPost.id}

This is an automated notification from the Bits and Bytes platform.`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1f2937; margin-bottom: 20px; font-size: 24px;">📝 New Blog Post Published</h1>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Hello Admin,
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          A new blog post has been published on <strong>Bits and Bytes</strong>.
        </p>
        
        <div style="background-color: #f3f4f6; border-radius: 6px; padding: 20px; margin: 20px 0;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">"${
            blogPost.title
          }"</h2>
          <p style="color: #6b7280; margin: 5px 0;"><strong>Author:</strong> ${
            user.name || "Anonymous"
          } (${user.email})</p>
          <p style="color: #6b7280; margin: 5px 0;"><strong>Category:</strong> ${
            category.name
          }</p>
          <p style="color: #6b7280; margin: 5px 0;"><strong>Published:</strong> ${new Date().toLocaleDateString()}</p>
          <p style="color: #6b7280; margin: 5px 0;"><strong>Read Time:</strong> ${
            blogPost.readTime || "N/A"
          }</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/blog/${blogPost.id}" 
             style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
            View Post
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #9ca3af; font-size: 14px; text-align: center;">
          This is an automated notification from the Bits and Bytes platform.
        </p>
      </div>
    </div>
    `,
  });

  return emailResult;
}
