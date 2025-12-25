// app/api/verify-captcha/route.js
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { captchaToken } = await req.json()

  if (!captchaToken) {
    return NextResponse.json(
      { success: false, error: 'No CAPTCHA token provided' },
      { status: 400 },
    )
  }

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    })

    const data = await res.json()

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: 'CAPTCHA verification failed' },
        { status: 400 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'CAPTCHA verification error' },
      { status: 500 },
    )
  }
}
