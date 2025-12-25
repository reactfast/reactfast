'use client'

import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isAfter,
  addMinutes,
} from 'date-fns'
import { supabaseClient } from '@/config/supabase-client'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Generate days for calendar grid
const generateCalendarDays = (month) => {
  const startDate = startOfWeek(startOfMonth(month))
  const endDate = endOfWeek(endOfMonth(month))

  const days = []
  let day = startDate
  while (day <= endDate) {
    days.push(day)
    day = addDays(day, 1)
  }
  return days
}

export default function DatePicker() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today))
  const [selectedDate, setSelectedDate] = useState(today)
  const [bookingFlow, setBookingFlow] = useState(null)
  const [bookingHours, setBookingHours] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [blackoutDates, setBlackoutDates] = useState([])

  const days = generateCalendarDays(currentMonth)

  const fetchBlackoutDates = async (flowId) => {
    const { data, error } = await supabaseClient
      .from('blackout_dates')
      .select('*')
      .eq('booking_flow_id', flowId)

    if (error) {
      console.error('Error fetching blackout dates:', error)
    } else {
      setBlackoutDates(data || [])
    }
  }

  // Fetch Booking Flow on initial render
  useEffect(() => {
    const fetchBookingFlow = async () => {
      const { data, error } = await supabaseClient
        .from('booking_flows')
        .select('*')
        .limit(1)
        .single()

      if (error) {
        console.error('Error fetching booking flow:', error)
      } else {
        setBookingFlow(data)
        fetchBookingHoursAndSlots(data, selectedDate)
        fetchBlackoutDates(data.id)
      }
    }

    fetchBookingFlow()
  }, [])

  // Fetch booking hours and slots when selected date changes
  useEffect(() => {
    if (bookingFlow) {
      fetchBookingHoursAndSlots(bookingFlow, selectedDate)
    }
  }, [selectedDate])

  // Fetch booking hours and slots for the selected date
  const fetchBookingHoursAndSlots = async (flow, date) => {
    const dayOfWeek = format(date, 'EEEE')

    const { data: hoursData } = await supabaseClient
      .from('booking_hours')
      .select('*')
      .eq('booking_flow_id', flow.id)
      .eq('day_of_week', dayOfWeek)
      .single()

    setBookingHours(hoursData || null)

    const { data: bookingsData } = await supabaseClient
      .from('bookings')
      .select('booking_time')
      .eq('booking_flow_id', flow.id)
      .eq('booking_date', format(date, 'yyyy-MM-dd'))

    const booked = bookingsData?.map((b) => b.booking_time) || []
    setBookedSlots(booked)
  }

  // Generate time slots based on booking hours and flow
  useEffect(() => {
    const generateTimeSlots = () => {
      if (!bookingHours || !bookingFlow || isDateBlackedOut(selectedDate)) {
        setTimeSlots([])
        return
      }

      const incrementMinutes = bookingFlow.time_increment

      let current = new Date(
        `${format(selectedDate, 'yyyy-MM-dd')}T${bookingHours.start_time}`,
      )
      const end = new Date(
        `${format(selectedDate, 'yyyy-MM-dd')}T${bookingHours.end_time}`,
      )

      const slots = []
      while (current < end) {
        slots.push(new Date(current))
        current = addMinutes(current, incrementMinutes)
      }

      setTimeSlots(slots)
    }

    generateTimeSlots()
  }, [bookingHours, bookingFlow, selectedDate, blackoutDates])

  // ! TESTING USE EFFECT
  useEffect(() => {
    console.log('Booking Flow:', bookingFlow)
    console.log('Booking Hours:', bookingHours)
    console.log('Booked Slots:', bookedSlots)
  }, [bookingFlow, bookingHours, bookedSlots])

  const handleSlotSelect = (slot) => {
    console.log('Selected Time Slot:', format(slot, 'HH:mm'))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (day) => {
    if (bookingFlow) {
      const maxDate = addDays(today, bookingFlow.max_days_in_advance)
      if (isAfter(day, maxDate)) return // Prevent selecting beyond allowed
    }

    setSelectedDate(day)
    console.log('Selected Date:', day.toISOString().split('T')[0])
  }

  const isDateBlackedOut = (date) => {
    return blackoutDates.some(({ start_date, end_date }) => {
      const start = new Date(start_date)
      const end = end_date ? new Date(end_date) : start
      return date >= start && date <= end
    })
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center">
        <h2 className="flex-auto text-sm font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          type="button"
          onClick={handlePrevMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleNextMonth}
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="mt-10 grid grid-cols-7 text-center text-xs text-gray-500">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => {
          const isBeyondMax =
            bookingFlow &&
            isAfter(day, addDays(today, bookingFlow.max_days_in_advance))

          return (
            <div
              key={day.toISOString()}
              className={classNames(
                dayIdx >= 7 && 'border-t border-gray-200',
                'py-2',
              )}
            >
              <button
                type="button"
                onClick={() => handleDateClick(day)}
                disabled={isBeyondMax}
                className={classNames(
                  isSameDay(day, selectedDate) && 'text-white',
                  !isSameDay(day, selectedDate) &&
                    isSameDay(day, today) &&
                    'text-indigo-600',
                  !isSameDay(day, selectedDate) &&
                    !isSameDay(day, today) &&
                    isSameMonth(day, currentMonth) &&
                    'text-gray-900',
                  !isSameDay(day, selectedDate) &&
                    !isSameDay(day, today) &&
                    !isSameMonth(day, currentMonth) &&
                    'text-gray-400',
                  isSameDay(day, selectedDate) &&
                    isSameDay(day, today) &&
                    'bg-indigo-600',
                  isSameDay(day, selectedDate) &&
                    !isSameDay(day, today) &&
                    'bg-gray-900',
                  !isSameDay(day, selectedDate) && 'hover:bg-gray-200',
                  (isSameDay(day, selectedDate) || isSameDay(day, today)) &&
                    'font-semibold',
                  isBeyondMax && 'cursor-not-allowed opacity-30',
                  'mx-auto flex size-8 items-center justify-center rounded-full',
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>
            </div>
          )
        })}
      </div>

      {bookingFlow && bookingHours ? (
        <>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              Available from {bookingHours.start_time} to{' '}
              {bookingHours.end_time}
            </p>
            <p>Time Increment: {bookingFlow.time_increment}</p>
          </div>

          {/* Time Slots */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {timeSlots.length === 0 ? (
              <p className="col-span-3 text-sm text-gray-500">
                No available slots for this day.
              </p>
            ) : (
              timeSlots.map((slot) => {
                const slotTime = format(slot, 'HH:mm')
                const isBooked = bookedSlots.includes(slotTime)

                return (
                  <button
                    key={slotTime}
                    type="button"
                    disabled={isBooked}
                    onClick={() => handleSlotSelect(slot)}
                    className={classNames(
                      'rounded-md px-2 py-1 text-sm font-medium',
                      isBooked
                        ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
                    )}
                  >
                    {format(slot, 'h:mm a')}
                  </button>
                )
              })
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          No booking hours set for this day.
        </p>
      )}

      {/* Selected Date Info */}
      <section className="mt-12">
        <h2 className="text-base font-semibold text-gray-900">
          Schedule for{' '}
          <time dateTime={format(selectedDate, 'yyyy-MM-dd')}>
            {format(selectedDate, 'MMMM d, yyyy')}
          </time>
        </h2>

        {/* Booking Flow Info */}
        {bookingFlow ? (
          <div className="mt-4 text-sm text-gray-500">
            <p>
              Booking Flow: <strong>{bookingFlow.name}</strong>
            </p>
            <p>Max Days in Advance: {bookingFlow.max_days_in_advance} days</p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">Loading booking flow...</p>
        )}
      </section>
    </div>
  )
}
