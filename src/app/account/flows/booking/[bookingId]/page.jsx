'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { useRouter } from 'next/navigation'

const defaultBookingHours = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
].map((day) => ({
  day_of_week: day,
  start_time: '09:00',
  end_time: '17:00',
}))

export default function BookingFlowForm({ params }) {
  const bookingFlowId = params.bookingFlowId
  const router = useRouter()

  const [bookingFlow, setBookingFlow] = useState({
    name: '',
    requires_payment: false,
    max_days_in_advance: 30,
    time_increment: 30,
  })
  const [bookingHours, setBookingHours] = useState(defaultBookingHours)
  const [blackoutDates, setBlackoutDates] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (bookingFlowId && bookingFlowId !== 'new') {
      loadBookingFlow(bookingFlowId)
    }
  }, [bookingFlowId])

  const loadBookingFlow = async (id) => {
    setLoading(true)
    const { data: flow } = await supabase
      .from('booking_flows')
      .select('*')
      .eq('id', id)
      .single()
    const { data: hours } = await supabase
      .from('booking_hours')
      .select('*')
      .eq('booking_flow_id', id)
    const { data: blackouts } = await supabase
      .from('blackout_dates')
      .select('*')
      .eq('booking_flow_id', id)

    if (flow) setBookingFlow(flow)
    if (hours) setBookingHours(hours)
    if (blackouts) setBlackoutDates(blackouts)

    setLoading(false)
  }

  const handleFlowChange = (e) => {
    const { name, value, type, checked } = e.target
    setBookingFlow((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleHoursChange = (index, field, value) => {
    setBookingHours((prev) => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  const handleAddBlackout = () => {
    setBlackoutDates((prev) => [...prev, { start_date: '', end_date: '' }])
  }

  const handleBlackoutChange = (index, field, value) => {
    setBlackoutDates((prev) => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    let flowId = bookingFlowId

    if (bookingFlowId && bookingFlowId !== 'new') {
      await supabase
        .from('booking_flows')
        .update(bookingFlow)
        .eq('id', bookingFlowId)
    } else {
      const { data, error } = await supabase
        .from('booking_flows')
        .insert(bookingFlow)
        .select()
        .single()
      if (error) return console.error(error)
      flowId = data.id
    }

    // Save booking hours
    for (let hour of bookingHours) {
      const { data: exists } = await supabase
        .from('booking_hours')
        .select('*')
        .eq('booking_flow_id', flowId)
        .eq('day_of_week', hour.day_of_week)
        .single()

      if (exists) {
        await supabase
          .from('booking_hours')
          .update({ start_time: hour.start_time, end_time: hour.end_time })
          .eq('id', exists.id)
      } else {
        await supabase
          .from('booking_hours')
          .insert({ ...hour, booking_flow_id: flowId })
      }
    }

    // Save blackout dates
    await supabase.from('blackout_dates').delete().eq('booking_flow_id', flowId)
    for (let blackout of blackoutDates) {
      if (blackout.start_date) {
        await supabase
          .from('blackout_dates')
          .insert({ ...blackout, booking_flow_id: flowId })
      }
    }

    setLoading(false)
    router.push('/booking-flows')
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">
        {bookingFlowId && bookingFlowId !== 'new' ? 'Edit' : 'Create'} Booking
        Flow
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            type="text"
            value={bookingFlow.name}
            onChange={handleFlowChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            name="requires_payment"
            type="checkbox"
            checked={bookingFlow.requires_payment}
            onChange={handleFlowChange}
          />
          <label className="text-sm font-medium text-gray-700">
            Requires Payment
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Days in Advance
          </label>
          <input
            name="max_days_in_advance"
            type="number"
            value={bookingFlow.max_days_in_advance}
            onChange={handleFlowChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Increment (minutes)
          </label>
          <input
            name="time_increment"
            type="number"
            value={bookingFlow.time_increment}
            onChange={handleFlowChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>

        <hr className="my-6" />

        <h2 className="mb-2 text-lg font-semibold">Booking Hours</h2>
        {bookingHours.map((hour, index) => (
          <div
            key={hour.day_of_week}
            className="mb-2 flex items-center space-x-4"
          >
            <span className="w-20 font-medium">{hour.day_of_week}</span>
            <input
              type="time"
              value={hour.start_time}
              onChange={(e) =>
                handleHoursChange(index, 'start_time', e.target.value)
              }
              className="rounded border-gray-300"
            />
            <input
              type="time"
              value={hour.end_time}
              onChange={(e) =>
                handleHoursChange(index, 'end_time', e.target.value)
              }
              className="rounded border-gray-300"
            />
          </div>
        ))}

        <hr className="my-6" />

        <h2 className="mb-2 text-lg font-semibold">Blackout Dates</h2>
        {blackoutDates.map((date, index) => (
          <div key={index} className="mb-2 flex items-center space-x-4">
            <input
              type="date"
              value={date.start_date}
              onChange={(e) =>
                handleBlackoutChange(index, 'start_date', e.target.value)
              }
              className="rounded border-gray-300"
            />
            <input
              type="date"
              value={date.end_date || ''}
              onChange={(e) =>
                handleBlackoutChange(index, 'end_date', e.target.value)
              }
              className="rounded border-gray-300"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddBlackout}
          className="text-sm text-indigo-600 hover:underline"
        >
          + Add Blackout Date
        </button>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
          >
            {loading ? 'Saving...' : 'Save Booking Flow'}
          </button>
        </div>
      </div>
    </div>
  )
}
