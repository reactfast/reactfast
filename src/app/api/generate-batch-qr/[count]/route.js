// app/api/generate-batch-qr/route.js

import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function GET(req, { params }) {
  const { count } = params

  // Validate count parameter
  if (isNaN(count) || count <= 0) {
    return new Response(JSON.stringify({ message: 'Invalid count' }), {
      status: 400,
    })
  }

  console.log('Generating QR codes for batch:')

  const qrCodeUrls = []

  for (let i = 0; i < parseInt(count); i++) {
    try {
      // Step 1: Generate UUID
      const uuid = uuidv4()
      const redirectUrl = `https://jot.space/redirect/${uuid}`

      // Step 2: Generate the QR code as a buffer (JPEG)
      const qrBuffer = await QRCode.toBuffer(redirectUrl, { type: 'jpeg' })

      // Step 3: Upload the image to Supabase storage (S3)
      const filePath = `${uuid}.jpg`
      const { data, error } = await supabase.storage
        .from('qr_codes')
        .upload(filePath, qrBuffer)

      console.log('HIT 1')

      //add4a67817961666e4a545faf367e426
      //3d7462e8a1dd5ff22d2e345a40994e205eefc0136ae686c5d4e38aa9ed48b4a4

      if (error) {
        console.error('Error uploading QR code image', error)
        throw error
      }

      // Step 4: Get the public URL of the uploaded image
      const { publicURL, error: urlError } = supabase.storage
        .from('qr_codes')
        .getPublicUrl(filePath)

      if (urlError) {
        throw urlError
      }

      console.log('HIT 2')

      // Step 5: Save the URL to Supabase table
      const { data: insertData, error: insertError } = await supabase
        .from('qr_codes')
        .insert([
          {
            uuid: uuid,
            img_ref: publicURL,
          },
        ])

      if (insertError) {
        throw insertError
      }

      // Add the generated QR code URL to the response array
      qrCodeUrls.push(publicURL)
    } catch (error) {
      console.error('Error generating QR code for batch', error)
      return new Response(
        JSON.stringify({ message: 'Error generating QR codes' }),
        {
          status: 500,
        },
      )
    }
  }

  // Step 6: Return the list of QR code URLs
  return new Response(JSON.stringify({ qrCodeUrls }), {
    status: 200,
  })
}
