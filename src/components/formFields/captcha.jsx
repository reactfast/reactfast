'use client'

import { useEffect, useRef, useState } from 'react'

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export default function CaptchaField({ field, value, onChange, theme }) {
  const recaptchaRef = useRef(null)
  const [widgetId, setWidgetId] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // If grecaptcha is already on the page, wait until it's ready
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => renderCaptcha())
      return
    }

    // Otherwise, inject the script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => {
      window.grecaptcha.ready(() => renderCaptcha())
    }
    document.body.appendChild(script)
  }, [])

  const renderCaptcha = () => {
    if (!window.grecaptcha || widgetId !== null) return

    // Check if the element already has children (already rendered)
    if (recaptchaRef.current?.hasChildNodes()) return

    const id = window.grecaptcha.render(recaptchaRef.current, {
      sitekey: SITE_KEY,
      theme: 'light',
      callback: (token) => {
        setError(false)
        onChange({ target: { name: field.name, value: token } })
      },
      'expired-callback': () => {
        onChange({ target: { name: field.name, value: '' } })
        setError(true)
      },
    })

    setWidgetId(id)
  }

  return (
    <div className="mb-4">
      {field.title && (
        <label
          htmlFor={field.name}
          style={{ color: theme.label }}
          className="mb-2 block text-sm font-medium"
        >
          {field.title}
          {field.required && (
            <span style={{ color: theme.requiredAsterisk }}> *</span>
          )}
        </label>
      )}

      <div ref={recaptchaRef}></div>

      {error && (
        <p style={{ color: theme.error }} className="mt-1 text-sm">
          Please complete the CAPTCHA
        </p>
      )}
    </div>
  )
}
