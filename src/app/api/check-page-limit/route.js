export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUserSubscription } from '@/helpers/subs'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    // Fetch user's subscription type
    const subscriptionType = await getUserSubscription(userId)

    if (!subscriptionType) {
      return NextResponse.json(
        { error: 'Could not fetch subscription' },
        { status: 500 },
      )
    }

    const page_limit = subscriptionType.sites_allowed

    // Count active pages for the user
    const { data: pages, error: pageError } = await supabase
      .from('pages')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('active', true)

    if (pageError) {
      console.error('Error fetching active pages:', pageError)
      return NextResponse.json(
        { error: 'Error fetching pages' },
        { status: 500 },
      )
    }

    const activePageCount = pages.length

    return NextResponse.json({
      canCreateMorePages: activePageCount < parseInt(page_limit),
      activePageCount,
      pageLimit: page_limit,
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
