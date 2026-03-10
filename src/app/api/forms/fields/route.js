import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const stepId = searchParams.get('stepId')

    if (!stepId) {
      return NextResponse.json({ error: 'Step ID required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('form_step_fields')
      .select('*')
      .eq('step_id', stepId)
      .order('field_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/forms/fields:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('form_step_fields')
      .insert([body])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in POST /api/forms/fields:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const { data, error } = await supabase
      .from('form_step_fields')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/forms/fields:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const fieldId = searchParams.get('id')

    if (!fieldId) {
      return NextResponse.json({ error: 'Field ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('form_step_fields')
      .delete()
      .eq('id', fieldId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/forms/fields:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Bulk update fields order
export async function PATCH(request) {
  try {
    const body = await request.json()
    const { fields } = body // Array of { id, field_order }

    const promises = fields.map((field) =>
      supabase
        .from('form_step_fields')
        .update({ field_order: field.field_order })
        .eq('id', field.id),
    )

    const results = await Promise.all(promises)
    const hasError = results.some((r) => r.error)

    if (hasError) {
      throw new Error('Failed to update field orders')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in PATCH /api/forms/fields:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
