import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function POST(request) {
  try {
    const body = await request.json()

    // Prepare page object for insertion
    const pageData = {
      name: body.name, // Page name (required)
      order: body.order || [], // JSONB array for order (default to empty array if not provided)
      user_id: body.user_id || null, // User ID, defaults to null if not provided
      active: body.active || false, // Active status, defaults to false
      primary: body.primary || null, // Primary field, optional
      secondary: body.secondary || null, // Secondary field, optional
      tertiary: body.tertiary || null, // Tertiary field, optional
      quaternary: body.quaternary || null, // Quaternary field, optional
      meta_title: body.meta_title || null, // Meta title, optional
      meta_description: body.meta_description || null, // Meta description, optional
      meta_img: body.meta_img || null, // Meta image URL, optional
      vcard: body.vcard || null, // vCard field, optional
      bg_color: body.bg_color || '#ffffff', // Background color (defaults to white)
      sms_number: body.sms_number || null, // SMS number, optional
      sms_message: body.sms_message || null, // SMS message, optional
      email_address: body.email_address || null, // Email address, optional
      email_content: body.email_content || null, // Email content, optional
      foreground_color: body.foreground_color || '#ffffff', // Foreground color (defaults to white)
      font_name: body.font_name || 'Inter', // Font name, defaults to 'Inter'
      font_color: body.font_color || '#000000', // Font color (defaults to black)
    }

    // Insert new page into 'pages' table
    const { data, error } = await supabase
      .from('pages')
      .insert([pageData])
      .select()

    if (error) {
      console.error('Error inserting data into "pages" table:', error)
      return NextResponse.json(
        { error: 'Failed to insert page' },
        { status: 400 },
      )
    }

    return NextResponse.json({ received: true, data }, { status: 200 })
  } catch (error) {
    console.error('Error handling request:', error)
    return NextResponse.json(
      { error: 'Webhook handling failed' },
      { status: 400 },
    )
  }
}
