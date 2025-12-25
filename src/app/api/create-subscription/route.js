import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      user_id,
      sub_type,
      stripe_id,
      replaced_by = null,
      status = 'active',
    } = body

    if (!user_id || !sub_type || !stripe_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{ user_id, sub_type, stripe_id, replaced_by, status }])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(
      { success: true, subscription: data },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
