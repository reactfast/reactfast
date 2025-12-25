import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function PATCH(request) {
  try {
    const body = await request.json()

    const { pageId, newOrder } = body

    if (!pageId || !Array.isArray(newOrder)) {
      return NextResponse.json(
        { error: 'Invalid request: pageId and newOrder are required' },
        { status: 400 },
      )
    }

    // Update the 'order' field in the 'pages' table
    const { data, error } = await supabase
      .from('pages')
      .update({ order: newOrder })
      .eq('id', pageId)
      .select()

    if (error) {
      console.error('Error updating order in "pages" table:', error)
      return NextResponse.json(
        { error: 'Failed to update order' },
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
