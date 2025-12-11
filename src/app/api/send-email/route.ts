// app/api/send-email/route.ts (Using NodeMailer with Gmail)
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    console.log('Received contact form data:', process.env.EMAIL_USER);
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email to receive messages
      replyTo: email, // User's email for easy reply
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background-color: #4F46E5;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 5px 5px;
              }
              .info-row {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
              }
              .label {
                font-weight: bold;
                color: #4F46E5;
              }
              .message-box {
                background-color: #f5f5f5;
                padding: 15px;
                border-left: 4px solid #4F46E5;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="info-row">
                  <span class="label">Name:</span><br/>
                  ${name}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span><br/>
                  <a href="mailto:${email}">${email}</a>
                </div>
                <div class="info-row">
                  <span class="label">Subject:</span><br/>
                  ${subject}
                </div>
                <div class="message-box">
                  <span class="label">Message:</span><br/><br/>
                  ${message.replace(/\n/g, '<br/>')}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };
    const mailOptionstoUser = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject: `Thank You for Reaching Out – ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f7;
                padding: 20px;
                color: #333;
              }
              .container {
                max-width: 650px;
                margin: auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              }
              .header {
                background: #4F46E5;
                color: #ffffff;
                padding: 25px;
                text-align: center;
              }
              .content {
                padding: 30px;
                line-height: 1.7;
              }
              .user-message-box {
                background: #f5f5f5;
                border-left: 4px solid #4F46E5;
                padding: 15px;
                margin: 20px 0;
                white-space: pre-line;
              }
              .footer {
                background: #f9f9f9;
                padding: 25px;
                font-size: 14px;
                color: #444;
                border-top: 1px solid #eee;
              }
              .footer a {
                color: #4F46E5;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">

              <div class="header">
                <h2>Thank You for Contacting Me</h2>
              </div>

              <div class="content">
                <p>Hi <strong>${name}</strong>,</p>

                <p>Thank you for reaching out through my portfolio contact form. I truly appreciate you taking the time to connect.</p>

                <p>I have received your message and will get back to you very soon.  
                Your details have been successfully recorded, and I will review them shortly.</p>

                <h3>Your Message:</h3>
                <div class="user-message-box">
                  ${message.replace(/\n/g, "<br/>")}
                </div>

                <p>If your request is urgent, feel free to contact me directly using the information below.</p>
              </div>

              <div class="footer">
                <p><strong>Best Regards,</strong><br/>
                <strong>Parth Pipaliya</strong></p>

                <p>
                  📞 <strong>Contact:</strong> <a href="tel:+917383274687">+91 73832 74687</a><br/>
                  📧 <strong>Email:</strong> <a href="mailto:parthpipaliya1712@gmail.com">parthpipaliya1712@gmail.com</a><br/>
                  🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/parthpipaliya/" target="_blank">linkedin.com/in/parthpipaliya</a><br/>
                  🌐 <strong>Website:</strong> <a href="https://parthpipaliya.com" target="_blank">parthpipaliya.com</a>
                </p>
              </div>

            </div>
          </body>
        </html>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    const infoToUser = await transporter.sendMail(mailOptionstoUser);
    
    console.log('Email sent successfully:', info.messageId, infoToUser.messageId);

    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error },
      { status: 500 }
    );
  }
}