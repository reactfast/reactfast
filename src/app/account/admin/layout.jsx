'use client'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page({ params, children }) {
  const [roles, setRoles] = useState([])
  const router = useRouter()

  async function getUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        throw error
      }
      return user
    } catch (err) {
      console.error('Error getting user:', err)
      router.push('/login')
    }
  }

  async function getUserRoles(userId) {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('roles(*)')
        .eq('user', userId)

      if (error) {
        throw error
      }

      const cleanedData = data.map((item) => item.roles)
      setRoles(cleanedData)

      // Check if the user has the 'Admin' role
      const hasAdminRole = cleanedData.some((role) => role.name === 'Admin')

      if (!hasAdminRole) {
        router.push('/login')
      }
    } catch (err) {
      console.error('Error fetching user roles:', err)
      router.push('/login')
    }
  }

  useEffect(() => {
    async function checkUserAndRoles() {
      const user = await getUser()
      if (user) {
        await getUserRoles(user.id)
      } else {
        router.push('/login')
      }
    }

    checkUserAndRoles()
  }, [])

  return <>{children}</>
}
