import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { to, subject, message } = await req.json()

    const data = await resend.emails.send({
      from: 'Your App <onboarding@resend.dev>', // or your verified domain
      to,
      subject,
      html: `<p>${message}</p>`,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    )
  }
}
