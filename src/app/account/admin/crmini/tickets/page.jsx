'use client'

import { useState } from 'react'
import {
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'

const dummyTickets = [
  {
    id: 1,
    title: 'Login Issue',
    customer: 'alice@example.com',
    status: 'open',
    created: '2025-10-08 10:15 AM',
    message: 'I cannot login to my account, keeps saying invalid credentials.',
  },
  {
    id: 2,
    title: 'Billing Problem',
    customer: 'bob@example.com',
    status: 'closed',
    created: '2025-10-07 09:30 AM',
    message: 'My invoice shows wrong amount, please correct.',
  },
  {
    id: 3,
    title: 'Feature Request',
    customer: 'charlie@example.com',
    status: 'open',
    created: '2025-10-06 02:45 PM',
    message: 'Can you add dark mode to the dashboard?',
  },
]

export default function TicketUI() {
  const [tickets, setTickets] = useState(dummyTickets)
  const [filter, setFilter] = useState('all')
  const [selectedTicket, setSelectedTicket] = useState(null)

  const filteredTickets =
    filter === 'all' ? tickets : tickets.filter((t) => t.status === filter)

  const closeTicket = (id) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'closed' } : t)),
    )
  }

  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id))
    if (selectedTicket?.id === id) setSelectedTicket(null)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col gap-2 border-r bg-white p-4">
        <button
          onClick={() => setFilter('all')}
          className={`rounded p-2 hover:bg-gray-100 ${
            filter === 'all' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          All Tickets
        </button>
        <button
          onClick={() => setFilter('open')}
          className={`rounded p-2 hover:bg-gray-100 ${
            filter === 'open' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          Open
        </button>
        <button
          onClick={() => setFilter('closed')}
          className={`rounded p-2 hover:bg-gray-100 ${
            filter === 'closed' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          Closed
        </button>
        <button
          onClick={() => setSelectedTicket({})}
          className="mt-4 flex items-center justify-center gap-2 rounded bg-indigo-600 p-2 text-white hover:bg-indigo-500"
        >
          <PencilIcon className="h-5 w-5" />
          New Ticket
        </button>
      </aside>

      {/* Ticket List */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto">
          {selectedTicket && selectedTicket.id === undefined ? (
            <NewTicketForm
              setTickets={setTickets}
              setSelectedTicket={setSelectedTicket}
            />
          ) : selectedTicket ? (
            <TicketDetail
              ticket={selectedTicket}
              closeTicket={closeTicket}
              deleteTicket={deleteTicket}
            />
          ) : (
            <div className="p-4">
              <h2 className="mb-4 text-xl font-semibold">Tickets</h2>
              <ul className="divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="flex cursor-pointer justify-between p-3 hover:bg-gray-50"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div>
                      <p className="font-semibold">{ticket.title}</p>
                      <p className="text-sm text-gray-600">{ticket.customer}</p>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        ticket.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {ticket.status}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TicketDetail({ ticket, closeTicket, deleteTicket }) {
  return (
    <div className="h-full bg-white p-4">
      <h2 className="mb-2 text-2xl font-bold">{ticket.title}</h2>
      <p className="mb-2 text-gray-600">From: {ticket.customer}</p>
      <p className="mb-4 text-gray-600">Created: {ticket.created}</p>
      <p className="mb-4">{ticket.message}</p>

      {ticket.status === 'open' && (
        <button
          className="mr-2 flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          onClick={() => closeTicket(ticket.id)}
        >
          <CheckCircleIcon className="h-5 w-5" /> Close Ticket
        </button>
      )}

      <button
        className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
        onClick={() => deleteTicket(ticket.id)}
      >
        <TrashIcon className="h-5 w-5" /> Delete Ticket
      </button>
    </div>
  )
}

function NewTicketForm({ setTickets, setSelectedTicket }) {
  const [title, setTitle] = useState('')
  const [customer, setCustomer] = useState('')
  const [message, setMessage] = useState('')

  const createTicket = () => {
    const newTicket = {
      id: Date.now(),
      title,
      customer,
      status: 'open',
      created: new Date().toLocaleString(),
      message,
    }
    setTickets((prev) => [newTicket, ...prev])
    setSelectedTicket(newTicket)
  }

  return (
    <div className="flex h-full flex-col gap-2 bg-white p-4">
      <h2 className="mb-2 text-xl font-semibold">New Ticket</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
      />
      <input
        type="text"
        placeholder="Customer Email"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="w-full rounded border p-2"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-40 w-full rounded border p-2"
      />
      <button
        onClick={createTicket}
        className="mt-2 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
      >
        Create Ticket
      </button>
    </div>
  )
}
