'use client'

import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ShareIcon,
  Cog6ToothIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation'

export default function BuilderToolBar({
  saveFields,
  hasUnsavedChanges,
  savingFields,
  exportJSON,
  importJSON,
  onShare = () => alert('Share functionality coming soon!'),
  published,
  publishForm,
}) {
  const router = useRouter()
  const pathname = usePathname()

  function onSettings() {
    router.push(`${pathname}/settings`)
  }

  function onTheme() {
    router.push(`${pathname}/theme`)
  }

  return (
    <div className="-mx-8 flex items-center justify-between border-y border-gray-200 px-8 py-3">
      <div className="flex items-center gap-3">
        {/* Save Button */}
        <button
          onClick={saveFields}
          disabled={!hasUnsavedChanges || savingFields}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            hasUnsavedChanges
              ? 'bg-green-600 text-white shadow-sm hover:bg-green-700'
              : 'cursor-not-allowed bg-gray-200 text-gray-400'
          } `}
        >
          {savingFields ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="hidden sm:inline">Saving...</span>
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Save Changes</span>
            </>
          )}
        </button>

        {/* Publish Button */}
        <button
          onClick={publishForm}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors ${
            published
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {published ? 'Published' : 'Publish'}
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={exportJSON}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          title="Export form as JSON"
        >
          <ArrowUpTrayIcon className="h-4 w-4" />
          <span className="hidden lg:inline">Export</span>
        </button>

        <label
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          title="Import form from JSON"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span className="hidden lg:inline">Import</span>
          <input
            type="file"
            accept="application/json"
            onChange={importJSON}
            className="hidden"
          />
        </label>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50"
          title="Share this form"
        >
          <ShareIcon className="h-5 w-5" />
        </button>

        {/* Theme Button */}
        <button
          onClick={onTheme}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50"
          title="Form Theme"
        >
          <SwatchIcon className="h-5 w-5" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onSettings}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50"
          title="Form Settings"
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
