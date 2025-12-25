'use client'

import { use, useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline' // Heroicons v2
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function VCardEditor({ initialState, handleSave }) {
  const [vCardData, setVCardData] = useState(initialState)

  useEffect(() => {
    setVCardData(initialState)
  }, [initialState])

  const template = `BEGIN:VCARD
VERSION:4.0
FN:John Doe
N:Doe;John;;;
EMAIL:johndoe@example.com
TEL;TYPE=work,voice;VALUE=uri:tel:+1-800-555-1234
TEL;TYPE=home,voice;VALUE=uri:tel:+1-800-555-5678
ADR;TYPE=work;LABEL=\"123 Business Rd, Business City, BC 54321\":
 ;;;123 Business Rd;Business City;BC;54321;USA
ADR;TYPE=home;LABEL=\"456 Home St, Hometown, HT 98765\":
 ;;;456 Home St;Hometown;HT;98765;USA
URL;TYPE=work:https://www.johndoe.com
TITLE:Senior Developer
ORG:Example Corp
ROLE:Team Lead
NOTE:Placeholder note about John Doe.
BDAY:1985-05-15
PHOTO;MEDIATYPE=image/jpeg:https://www.example.com/photos/johndoe.jpg
IMPP;X-SERVICE-TYPE=Skype:skype:johndoe
REV:20240106T120000Z
END:VCARD`

  const fieldExplanation = `Explanation of Fields:
- BEGIN:VCARD and END:VCARD: Mark the start and end of the vCard file.
- VERSION: Specifies the vCard version. The latest is 4.0.
- FN: Full Name (formatted name).
- N: Name in structured format (Last name; First name; Additional names; Prefixes; Suffixes).
- EMAIL: Email address.
- TEL: Telephone number with optional type labels (e.g., work, home, voice, fax).
- ADR: Address with optional type labels (e.g., work, home) and structured fields (PO box, extended address, street, city, state, postal code, country).
- URL: Website URL.
- TITLE: Job title.
- ORG: Organization name.
- ROLE: Role within the organization.
- NOTE: Additional notes or comments.
- BDAY: Birthday in YYYY-MM-DD format.
- PHOTO: URL to a profile picture.
- IMPP: Instant messaging protocol (e.g., Skype, XMPP).
- REV: Revision date for when the vCard was last updated.`

  return (
    <div className="">
      <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">vCard Editor</h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <label
              htmlFor="vCardInput"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your vCard Information
            </label>
            <textarea
              id="vCardInput"
              value={vCardData}
              onChange={(e) => setVCardData(e.target.value)}
              rows={20}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Fill out your vCard details here..."
            />
            <button
              onClick={() => handleSave(vCardData)}
              className="mt-4 flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <CheckCircleIcon className="mr-2 h-5 w-5" />
              Save
            </button>
          </div>

          {/* Template Section */}
          <div className="lg:col-span-1">
            <h2 className="mb-2 text-lg font-semibold text-gray-700">
              vCard Template
            </h2>
            <pre className="overflow-auto rounded-md bg-gray-100 p-4 text-sm text-gray-600">
              {template}
            </pre>
          </div>

          {/* Explanation Section */}
          <div className="lg:col-span-1">
            <h2 className="mb-2 text-lg font-semibold text-gray-700">
              Explanation of Fields
            </h2>
            <pre className="overflow-auto rounded-md bg-gray-100 p-4 text-sm text-gray-600">
              {fieldExplanation}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
