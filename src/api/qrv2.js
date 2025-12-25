import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'
import { supabaseClient as supabase } from '@/config/supabase-client' // Assuming you've already set up Supabase client

async function generateQrCode() {
  try {
    // Step 1: Generate UUID
    const uuid = uuidv4()
    const redirectUrl = `https://jot.space/redirect/${uuid}`

    // Step 2: Generate the QR code as a Data URL (Base64 encoded)
    const qrDataUrl = await QRCode.toDataURL(redirectUrl, { type: 'jpeg' })

    // Step 3: Convert Data URL to buffer
    const base64Data = qrDataUrl.split(',')[1] // Remove the "data:image/jpeg;base64," prefix
    const qrBuffer = Buffer.from(base64Data, 'base64')

    // Step 4: Upload the image to Supabase storage
    const filePath = `${uuid}.jpg`
    const { data, error } = await supabase.storage
      .from('qr_codes') // Your Supabase bucket name
      .upload(filePath, qrBuffer, { contentType: 'image/jpeg' })

    if (error) {
      console.error('Error uploading QR code image:', error)
      throw new Error(`Error uploading QR code image: ${error.message}`)
    }

    // Step 5: Get the public URL of the uploaded image
    const { publicURL, error: urlError } = supabase.storage
      .from('qr_codes')
      .getPublicUrl(filePath)

    if (urlError) {
      console.error('Error fetching public URL:', urlError)
      throw new Error(`Error fetching public URL: ${urlError.message}`)
    }

    console.log(`Public URL for uploaded QR code: ${publicURL}`)

    // Step 6: Save the URL to Supabase table
    const { data: insertData, error: insertError } = await supabase
      .from('qr_codes')
      .insert([
        {
          uuid: uuid,
          img_ref: publicURL,
        },
      ])

    if (insertError) {
      console.error('Error inserting data into table:', insertError)
      throw new Error(`Error inserting data into table: ${insertError.message}`)
    }

    console.log(`Data inserted into 'qr_codes' table for UUID: ${uuid}`)

    // Return the generated QR code URL
    return publicURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    console.error('Full Error Stack:', error.stack) // More detailed error stack logging
    throw new Error('Error generating QR code')
  }
}

export default generateQrCode
