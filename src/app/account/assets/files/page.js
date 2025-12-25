'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Account = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/account/assets/files/root')
  }, [router])

  return null
}

export default Account
