'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Account = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/account/pages')
  }, [router])

  return null
}

export default Account
