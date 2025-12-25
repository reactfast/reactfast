'use client'

import { useEffect, useState } from 'react'
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
  parseISO,
  startOfDay,
} from 'date-fns'
import { supabaseClient } from '@/config/supabase-client'
import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BookingCalendar({ bookingFlowId }) {
  const today = startOfDay(new Date())
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today))
  const [selectedDate, setSelectedDate] = useState(today)
  const [bookings, setBookings] = useState([])

  // Generate calendar days
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

  const days = generateCalendarDays(currentMonth)

  // Fetch bookings for selected date
  useEffect(() => {
    const fetchBookings = async () => {
      const dateStr = format(selectedDate, 'yyyy-MM-dd')

      const { data, error } = await supabaseClient
        .from('bookings')
        .select('*')
        .eq('booking_flow_id', bookingFlowId)
        .eq('booking_date', dateStr)
        .order('booking_time', { ascending: true })

      if (error) {
        console.error('Error fetching bookings:', error)
      } else {
        setBookings(data || [])
      }
    }

    if (bookingFlowId && selectedDate) {
      fetchBookings()
    }
  }, [bookingFlowId, selectedDate])

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (day) => {
    if (day < today) return
    setSelectedDate(day)
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Bookings for {format(selectedDate, 'MMMM d, yyyy')}
      </h2>

      {/* Calendar */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-between text-gray-900">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 text-gray-400 hover:text-gray-500"
          >
            <ChevronLeftIcon className="size-5" aria-hidden="true" />
          </button>
          <h3 className="text-sm font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 text-gray-400 hover:text-gray-500"
          >
            <ChevronRightIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs text-gray-500">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => {
            const isBeforeToday = day < today
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
                  disabled={isBeforeToday}
                  className={classNames(
                    isSameDay(day, selectedDate) && 'bg-indigo-600 text-white',
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
                    !isSameDay(day, selectedDate) && 'hover:bg-gray-200',
                    isBeforeToday && 'cursor-not-allowed opacity-30',
                    'mx-auto flex size-8 items-center justify-center rounded-full font-semibold',
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
      </div>

      {/* Booking List */}
      <ol className="divide-y divide-gray-100 text-sm">
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings for this date.</p>
        ) : (
          bookings.map((booking) => {
            const bookingDateTime = parseISO(
              `${booking.booking_date}T${booking.booking_time}`,
            )

            return (
              <li key={booking.id} className="relative flex gap-x-6 py-6">
                <img
                  src="https://via.placeholder.com/56"
                  alt=""
                  className="size-14 flex-none rounded-full"
                />
                <div className="flex-auto">
                  <h3 className="pr-10 font-semibold text-gray-900">
                    Booking ID: {booking.id}
                  </h3>
                  <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                    <div className="flex items-start gap-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Date</span>
                        <CalendarIcon
                          className="size-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>
                        <time dateTime={bookingDateTime.toISOString()}>
                          {format(bookingDateTime, 'MMMM do, yyyy')} at{' '}
                          {format(bookingDateTime, 'h:mm a')}
                        </time>
                      </dd>
                    </div>
                    <div className="mt-2 flex items-start gap-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400/50 xl:pl-3.5">
                      <dt className="mt-0.5">
                        <span className="sr-only">Flow ID</span>
                        <MapPinIcon
                          className="size-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>{booking.booking_flow_id}</dd>
                    </div>
                  </dl>
                </div>
                <Menu as="div" className="absolute right-0 top-6">
                  <div>
                    <MenuButton className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <EllipsisHorizontalIcon
                        className="size-5"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Edit
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Cancel
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </li>
            )
          })
        )}
      </ol>
    </div>
  )
}
