import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const formId = searchParams.get('id')
    const userId = searchParams.get('userId')

    if (formId) {
      // Get specific form with all related data
      const { data, error } = await supabase
        .from('forms')
        .select(
          `
          *,
          form_steps(
            *,
            form_step_fields(*)
          )
        `,
        )
        .eq('id', formId)
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    if (userId) {
      // Get all forms for a user
      const { data, error } = await supabase
        .from('forms')
        .select(
          `
          *,
          form_steps(count),
          form_submissions(count)
        `,
        )
        .eq('author', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  } catch (error) {
    console.error('Error in GET /api/forms:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { form, steps } = body

    // Create form
    const { data: formData, error: formError } = await supabase
      .from('forms')
      .insert([form])
      .select()
      .single()

    if (formError) throw formError

    // Create steps if provided
    if (steps && steps.length > 0) {
      const stepsWithFormId = steps.map((step) => ({
        ...step,
        form_id: formData.id,
      }))

      const { error: stepsError } = await supabase
        .from('form_steps')
        .insert(stepsWithFormId)

      if (stepsError) throw stepsError
    }

    return NextResponse.json(formData)
  } catch (error) {
    console.error('Error in POST /api/forms:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const { data, error } = await supabase
      .from('forms')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/forms:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const formId = searchParams.get('id')

    if (!formId) {
      return NextResponse.json({ error: 'Form ID required' }, { status: 400 })
    }

    const { error } = await supabase.from('forms').delete().eq('id', formId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/forms:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
