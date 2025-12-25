import {
  EnvelopeIcon,
  PhoneIcon,
  FlagIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function ContactCard({ contact, subscription, onDelete }) {
  const hasEmail = contact?.emails?.length > 0
  const hasPhone = contact?.numbers?.length > 0
  const primaryEmail = hasEmail ? contact.emails[0] : null
  const primaryPhone = hasPhone ? contact.numbers[0] : null
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <li
      key={primaryEmail || contact.name}
      className="relative col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      {/* Profile & Details Row */}
      <div
        className={`flex items-start justify-between p-4 ${
          !subscription ? 'blur-sm' : ''
        }`}
      >
        <div className="flex items-center space-x-4">
          <img
            alt=""
            src={contact.imageUrl}
            className="size-12 rounded-full bg-gray-300"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {contact.name}
              </h3>
              {hasEmail && (
                <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  email
                </span>
              )}
              {hasPhone && (
                <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  phone
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{contact.title}</p>
            {hasEmail && (
              <p className="truncate text-sm text-gray-500">
                {contact.emails.length > 1
                  ? contact.emails.join(', ')
                  : primaryEmail}
              </p>
            )}
          </div>
        </div>

        {/* Menu Icon */}
        <div className="relative">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <EllipsisVerticalIcon className="h-5 w-5" />
          </button>
          {menuOpen && (
            <ul className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100">
                Edit
              </li>
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100">
                Duplicate
              </li>
              <li
                className="cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50"
                onClick={onDelete}
              >
                Delete
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`${!subscription ? 'blur-sm' : ''}`}>
        <div className="-mt-px flex divide-x divide-gray-200">
          {hasEmail && (
            <div className="flex w-0 flex-1">
              <a
                href={`mailto:${primaryEmail}`}
                className={`relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 ${
                  !subscription ? 'pointer-events-none' : ''
                }`}
              >
                <EnvelopeIcon className="size-5 text-gray-400" />
                Email
              </a>
            </div>
          )}
          {hasPhone && (
            <div className="flex w-0 flex-1">
              <a
                href={`tel:${primaryPhone}`}
                className={`relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 border border-transparent py-4 text-sm font-semibold text-gray-900 ${
                  !subscription ? 'pointer-events-none' : ''
                }`}
              >
                <PhoneIcon className="size-5 text-gray-400" />
                Call
              </a>
            </div>
          )}
          {hasPhone && (
            <div className="flex w-0 flex-1">
              <a
                href={`sms:${primaryPhone}`}
                className={`relative -ml-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 ${
                  !subscription ? 'pointer-events-none' : ''
                }`}
              >
                <ChatBubbleBottomCenterTextIcon className="size-5 text-gray-400" />
                SMS
              </a>
            </div>
          )}

          {/* Fallback Icon if no contact methods */}
          {!hasEmail && !hasPhone && (
            <div className="flex w-full items-center justify-center py-4">
              <FlagIcon className="size-6 text-yellow-500" />
              <span className="ml-2 text-sm text-gray-600">
                Missing contact info
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Overlay if not subscribed */}
      {!subscription && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-white/70">
          <span className="text-sm font-semibold text-gray-600">
            Subscribe to view contact details
          </span>
        </div>
      )}
    </li>
  )
}
