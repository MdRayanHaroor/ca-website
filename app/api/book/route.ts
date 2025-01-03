import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { name, email, phone, description, service, date } = await req.json()

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "mohammedrayan977@gmail.com",
    subject: "New Booking Request",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request</title>
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
            border-radius: 5px;
          }
          .header {
            background-color: #3b82f6;
            color: white;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .value {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 3px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Booking Request</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone}</div>
            </div>
            <div class="field">
              <div class="label">Description:</div>
              <div class="value">${description || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="label">Service:</div>
              <div class="value">${service}</div>
            </div>
            <div class="field">
              <div class="label">Date:</div>
              <div class="value">${date}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: "Booking request sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Failed to send booking request:", error)
    return NextResponse.json({ error: "Failed to send booking request" }, { status: 500 })
  }
}

