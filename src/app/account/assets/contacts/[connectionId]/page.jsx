'use client'

import { useState } from 'react'
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOffice2Icon,
  TagIcon,
  MapPinIcon,
  LinkIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline'

const TABS = ['About', 'Contact', 'Engagement', 'Admin']

export default function LeadDetailTabbedForm() {
  const [activeTab, setActiveTab] = useState('About')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner
                </label>
                <select className="mt-1 w-full rounded border-gray-300 shadow-sm">
                  <option>Unassigned</option>
                  <option>Jonathon McClendon</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 'Contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                rows={2}
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
              />
            </div>
          </div>
        )
      case 'Engagement':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lifecycle Stage
                </label>
                <select className="mt-1 w-full rounded border-gray-300 shadow-sm">
                  <option>Lead</option>
                  <option>MQL</option>
                  <option>SQL</option>
                  <option>Customer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Contacted
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
              />
            </div>
          </div>
        )
      case 'Admin':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned Team
                </label>
                <select className="mt-1 w-full rounded border-gray-300 shadow-sm">
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Active
                </label>
                <input
                  type="checkbox"
                  className="mt-2 size-5 text-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Created At
                </label>
                <input
                  type="date"
                  disabled
                  className="mt-1 w-full rounded border-gray-200 bg-gray-100 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Updated At
                </label>
                <input
                  type="date"
                  disabled
                  className="mt-1 w-full rounded border-gray-200 bg-gray-100 shadow-sm"
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <form className="space-y-6">{renderTabContent()}</form>

      <div className="mt-8 flex justify-end gap-x-4">
        <button
          type="button"
          className="text-sm font-medium text-gray-600 hover:underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
