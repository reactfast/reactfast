'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'

const actionTabs = [
  {
    key: 'view',
    label: 'On Form View',
    actions: [
      { type: 'Show/Hide Field', enabled: false },
      { type: 'Skip to Page', enabled: false },
      { type: 'Require Field', enabled: false },
      { type: 'Bind/Update Field via JS', enabled: false },
    ],
  },
  {
    key: 'validation',
    label: 'On Form Validation',
    actions: [
      { type: 'Execute JS', enabled: false },
      { type: 'Compare Fields', enabled: false },
    ],
  },
  {
    key: 'submission',
    label: 'On Form Submission',
    actions: [
      { type: 'HTTP POST', enabled: true },
      { type: 'Execute JS', enabled: true },
      { type: 'Show Message', enabled: true },
      { type: 'Redirect', enabled: true },
      { type: 'Stripe', enabled: true },
      { type: 'Zapier', enabled: true },
      { type: 'webhook', enabled: true },
      { type: 'Add/Remove Role', enabled: false },
      { type: 'Login/Register', enabled: false },
      { type: 'Update Profile', enabled: false },
      { type: 'Execute SQL', enabled: false },
      { type: 'Send Email', enabled: false },
      { type: 'Send Text', enabled: false },
      { type: 'Generate PDF', enabled: false },
      { type: 'PayPal Express', enabled: false },
      { type: 'Braintree', enabled: false },
      {},
    ],
  },
]

export default function FormActionsPage({ initialData, onChange, onSave }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('view')
  const [actions, setActions] = useState({
    view: [],
    validation: [],
    submission: [],
  })

  const moveAction = (tab, index, direction) => {
    const newActions = [...actions[tab]]
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= newActions.length) return
    const [moved] = newActions.splice(index, 1)
    newActions.splice(newIndex, 0, moved)
    setActions({ ...actions, [tab]: newActions })
  }

  const addAction = (tab, actionType, enabled) => {
    if (!enabled) return // 🚫 Disabled → no-op
    setActions({
      ...actions,
      [tab]: [...actions[tab], { type: actionType, config: {} }],
    })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h1 className="text-xl font-semibold text-gray-900">Form Actions</h1>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-50"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Form
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {actionTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 border-b-2 px-1 py-2 text-sm font-medium ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <p>Actions are executed from top to bottom</p>

      {/* Tab Content */}
      <div className="space-y-6">
        <ul className="space-y-2">
          {actions[activeTab].map((action, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-2 shadow-sm"
            >
              <span className="text-sm text-gray-700">{action.type}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => moveAction(activeTab, index, -1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <ArrowUpIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveAction(activeTab, index, 1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add Action */}
        <div className="flex flex-wrap gap-2">
          {actionTabs
            .find((t) => t.key === activeTab)
            .actions.map(({ type, enabled }) => (
              <button
                key={type}
                onClick={() => addAction(activeTab, type, enabled)}
                disabled={!enabled}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs shadow-sm ${
                  enabled
                    ? 'border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
                    : 'cursor-not-allowed border border-dashed border-gray-300 bg-gray-100 text-gray-400'
                }`}
              >
                <PlusCircleIcon className="h-3 w-3" />
                {type}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
