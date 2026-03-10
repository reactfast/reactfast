import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function POST(request) {
  try {
    const body = await request.json()
    const { formId, data, metadata = {} } = body

    // Get form to check if it's public and active
    const { data: form, error: formError } = await supabase
      .from('forms')
      .select('is_public, is_active')
      .eq('id', formId)
      .single()

    if (formError || !form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    if (!form.is_public || !form.is_active) {
      return NextResponse.json(
        { error: 'Form is not accepting submissions' },
        { status: 403 },
      )
    }

    // Get user ID if authenticated
    const authHeader = request.headers.get('authorization')
    let userId = null

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      const {
        data: { user },
      } = await supabase.auth.getUser(token)
      userId = user?.id
    }

    // Create submission
    const submission = {
      form_id: formId,
      submitted_by: userId,
      submission_data: data,
      metadata: {
        ...metadata,
        ip:
          request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString(),
      },
      status: 'completed',
    }

    const { data: submissionData, error: submissionError } = await supabase
      .from('form_submissions')
      .insert([submission])
      .select()
      .single()

    if (submissionError) {
      console.error('Error creating submission:', submissionError)
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      submissionId: submissionData.id,
      message: 'Form submitted successfully',
    })
  } catch (error) {
    console.error('Error in POST /api/forms/submit:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const formId = searchParams.get('formId')
    const submissionId = searchParams.get('submissionId')

    if (submissionId) {
      // Get specific submission
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('id', submissionId)
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    if (formId) {
      // Get all submissions for a form (requires auth)
      const authHeader = request.headers.get('authorization')
      if (!authHeader) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 },
        )
      }

      const token = authHeader.replace('Bearer ', '')
      const {
        data: { user },
      } = await supabase.auth.getUser(token)

      if (!user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }

      // Check if user owns the form
      const { data: form } = await supabase
        .from('forms')
        .select('author')
        .eq('id', formId)
        .single()

      if (!form || form.author !== user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
      }

      // Get submissions
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('form_id', formId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  } catch (error) {
    console.error('Error in GET /api/forms/submit:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
