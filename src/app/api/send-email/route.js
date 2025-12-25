// import { NextResponse } from 'next/server'
// import nodemailer from 'nodemailer'

// export async function POST(Request) {
//   try {
//     const { to, subject, message } = await req.json()

//     if (!to || !subject || !message) {
//       return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
//     }

//     // Configure the mail transporter (Use your own SMTP provider or Vercel Email)
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com', // Replace with your SMTP provider
//       port: 465,
//       secure: true, // true for 465, false for 587
//       auth: {
//         user: process.env.EMAIL_USER, // Stored in environment variables
//         pass: process.env.EMAIL_PASS, // App password or SMTP password
//       },
//     })

//     // Email options
//     const mailOptions = {
//       from: `"Your Website" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html: `<p>${message}</p>`,
//     }

//     // Send email
//     const info = await transporter.sendMail(mailOptions)

//     return NextResponse.json({ success: true, messageId: info.messageId })
//   } catch (error) {
//     console.error('Error sending email:', error)
//     return NextResponse.json({ error: 'Email failed to send' }, { status: 500 })
//   }
// }
