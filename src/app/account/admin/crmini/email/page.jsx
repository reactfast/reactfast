'use client'

import { useState } from 'react'
import {
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'

const dummyEmails = [
  {
    id: 1,
    sender: 'alice@example.com',
    subject: 'Welcome to CRM!',
    snippet: 'Thanks for signing up for our platform...',
    time: '10:15 AM',
    folder: 'inbox',
  },
  {
    id: 2,
    sender: 'bob@example.com',
    subject: 'Your Subscription',
    snippet: 'Your monthly subscription invoice is ready...',
    time: '9:30 AM',
    folder: 'inbox',
  },
  {
    id: 3,
    sender: 'me@example.com',
    subject: 'Meeting Notes',
    snippet: 'Here are the notes from today’s meeting...',
    time: 'Yesterday',
    folder: 'sent',
  },
  {
    id: 4,
    sender: 'team@example.com',
    subject: 'New Features',
    snippet: 'Check out what’s new in the dashboard...',
    time: '2 days ago',
    folder: 'inbox',
  },
]

export default function EmailUI() {
  const [emails, setEmails] = useState(dummyEmails)
  const [folder, setFolder] = useState('inbox')
  const [selectedEmail, setSelectedEmail] = useState(null)

  const filteredEmails = emails.filter((email) => email.folder === folder)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-white p-4">
        <button
          onClick={() => setFolder('inbox')}
          className={`flex items-center gap-2 rounded p-2 hover:bg-gray-100 ${
            folder === 'inbox' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <EnvelopeIcon className="h-5 w-5" />
          Inbox
        </button>
        <button
          onClick={() => setFolder('sent')}
          className={`flex items-center gap-2 rounded p-2 hover:bg-gray-100 ${
            folder === 'sent' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
          Sent
        </button>
        <button
          onClick={() => setFolder('compose')}
          className={`mt-4 flex items-center gap-2 rounded bg-indigo-600 p-2 text-white hover:bg-indigo-500`}
        >
          <PencilIcon className="h-5 w-5" />
          New Email
        </button>
      </aside>

      {/* Email List */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto">
          {folder === 'compose' ? (
            <ComposeEmail setEmails={setEmails} setFolder={setFolder} />
          ) : (
            <div className="p-4">
              <h2 className="mb-4 text-xl font-semibold">
                {folder.charAt(0).toUpperCase() + folder.slice(1)}
              </h2>
              <ul className="divide-y divide-gray-200">
                {filteredEmails.map((email) => (
                  <li
                    key={email.id}
                    className="flex cursor-pointer justify-between p-3 hover:bg-gray-50"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div>
                      <p className="font-semibold">{email.sender}</p>
                      <p className="text-sm text-gray-600">
                        {email.subject} - {email.snippet}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">{email.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Email Preview */}
        {selectedEmail && folder !== 'compose' && (
          <div className="border-t bg-white p-4">
            <h3 className="text-lg font-bold">{selectedEmail.subject}</h3>
            <p className="mb-2 text-gray-600">From: {selectedEmail.sender}</p>
            <p>{selectedEmail.snippet} (full email content would go here)</p>
            <button
              className="mt-2 flex items-center gap-2 text-red-600 hover:underline"
              onClick={() =>
                setEmails((prev) =>
                  prev.filter((e) => e.id !== selectedEmail.id),
                )
              }
            >
              <TrashIcon className="h-5 w-5" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ComposeEmail({ setEmails, setFolder }) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const sendEmail = () => {
    setEmails((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me@example.com',
        subject,
        snippet: body.slice(0, 50),
        time: 'Just now',
        folder: 'sent',
      },
    ])
    setFolder('sent')
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Compose Email</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="To"
          className="w-full rounded border p-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Subject"
          className="w-full rounded border p-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Body"
          className="h-40 w-full rounded border p-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button
        className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        onClick={sendEmail}
      >
        Send
      </button>
    </div>
  )
}
