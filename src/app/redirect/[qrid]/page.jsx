'use client'

import { useEffect } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'

import Loading from '@/components/loading'

export default function page({ params }) {
  useEffect(() => {
    async function getQrCode() {
      try {
        let { data, error } = await supabase
          .from('qr_codes')
          .select(`*`)
          .filter('id', 'eq', params.qrid)
          .single()

        if (error) {
          console.error('Error fetching QR code:', error)
          alert(
            'An error occurred while fetching the QR code. Please try again.',
          )
          return
        }

        const redirectURL = data?.redirect_url

        if (data.status === 'awaiting registration') {
          window.location.href = `https://jot.space/register-qr/?qrid=${params.qrid}`
        } else if (data.status === 'not printed' || data.status === 'new') {
          window.location.href = `https://jot.space/printed/?qrid=${params.qrid}`
        } else {
          // If the status is neither of the above, handle QR scan insertion
          async function _post() {
            try {
              let { data: postData, error: postError } = await supabase
                .from('qr_scans')
                .insert([{ qr_id: params.qrid }])

              if (postError) {
                console.error('Error inserting QR scan:', postError)
                alert(
                  'An error occurred while recording the QR scan. Please try again.',
                )
                return null
              }

              return postData
            } catch (err) {
              console.error('Unexpected error during QR scan insertion:', err)
              alert('An unexpected error occurred. Please try again later.')
              return null
            }
          }

          const postData = await _post() // Await the _post function
          window.location.href = redirectURL // Redirect if redirect_url exists
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        alert('An unexpected error occurred. Please try again later.')
      }
    }

    getQrCode()
  }, [])

  return (
    <>
      <Loading />
    </>
  )
}
