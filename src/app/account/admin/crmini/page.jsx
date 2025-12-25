'use client'

import { useState } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [notifications, setNotifications] = useState([
    'New lead from landing page!',
    'Customer #1234 submitted a ticket',
    'Meeting scheduled for 3 PM',
  ])

  return (
    <div>
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="relative rounded p-2 hover:bg-gray-200">
            <BellIcon className="h-6 w-6 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute right-0 top-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {notifications.length}
              </span>
            )}
          </button>
          <button className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
            Profile
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Notifications */}
        <div className="rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">Notifications</h2>
          <ul className="space-y-2">
            {notifications.map((note, idx) => (
              <li key={idx} className="border-b pb-2 text-gray-700">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Stats */}
        <div className="col-span-1 grid grid-cols-2 gap-4 rounded bg-white p-4 shadow md:col-span-2">
          <div className="rounded bg-indigo-100 p-4 text-center">
            <h3 className="text-sm text-gray-600">New Leads</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="rounded bg-green-100 p-4 text-center">
            <h3 className="text-sm text-gray-600">Open Tickets</h3>
            <p className="text-2xl font-bold">7</p>
          </div>
          <div className="rounded bg-yellow-100 p-4 text-center">
            <h3 className="text-sm text-gray-600">Upcoming Meetings</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="rounded bg-red-100 p-4 text-center">
            <h3 className="text-sm text-gray-600">Overdue Tasks</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">Recent Activity</h2>
          <ul className="space-y-2 text-gray-700">
            <li>John Doe opened ticket #123</li>
            <li>New lead signed up via landing page</li>
            <li>Meeting scheduled with ACME Corp</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button className="rounded bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-400">
              Add Lead
            </button>
            <button className="rounded bg-green-500 px-3 py-2 text-white hover:bg-green-400">
              Add Ticket
            </button>
            <button className="rounded bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-400">
              Schedule Meeting
            </button>
            <button className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-400">
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
