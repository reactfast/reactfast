import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function POST(request) {
  try {
    const body = await request.json()

    // Prepare order object for insertion
    const secsData = body.items.map((item) => ({
      page: item.page, // If applicable, use the page id
      definition: item.definition, // Assuming the item has a 'definition' object
      sec_type: item.sec_type, // Assuming the item has a 'sec_type'
      title: item.title, // If title is available
      status: 'active', // Default status is 'active'
      user_id: item.user_id || null, // Will be null if guest
    }))

    // Insert multiple rows into 'secs' table
    const { data, error } = await supabase
      .from('secs')
      .insert(secsData)
      .select()

    if (error) {
      console.error('Error inserting data into "secs" table:', error)
      return NextResponse.json(
        { error: 'Failed to insert records' },
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
