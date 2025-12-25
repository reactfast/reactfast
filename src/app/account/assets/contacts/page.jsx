'use client'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import Loading from '../../loading'
import { getUserSubscription } from '@/helpers/subs'
import AccountPageHeader from '@/components/accountPageHeader'
import ModelToolBar from '@/components/modelToolBar'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import ContactCard from './contactCard'
import ContactDeleteModal from './DeleteConnectionModal' // adjust import if needed

export default function Connections() {
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [subscription, setSubscription] = useState(null)

  // For delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  // get user on mount
  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  // get subscription on mount
  useEffect(() => {
    if (!currentUser) return

    async function getSubscription() {
      if (currentUser) {
        const sub = await getUserSubscription(currentUser.id)
        setSubscription(sub.designation == 'free' ? null : sub)
      }
      setLoading(false)
    }
    getSubscription()
  }, [currentUser])

  // get contacts
  useEffect(() => {
    if (!currentUser) return

    async function getPeople() {
      try {
        // Get the pages where user == current user
        const { data: pages, error: pagesError } = await supabase
          .from('pages')
          .select('name')
          .eq('user_id', currentUser.id) // Make sure `currentUser` is defined

        if (pagesError) {
          console.error('Error fetching pages:', pagesError)
          return
        }

        const pageNames = pages.map((page) => page.name)

        if (pageNames.length === 0) {
          setContacts([]) // No pages found, so no contacts to fetch
          return
        }

        // Get contacts where name is in pages.name
        const { data: contacts, error: contactsError } = await supabase
          .from('contacts')
          .select('*')
          .in('page', pageNames)
          .order('name')

        if (contactsError) {
          console.error('Error fetching contacts:', contactsError)
          return
        }

        setContacts(contacts)
        setLoading(false)
      } catch (err) {
        console.error('Unexpected error:', err)
      }
    }

    getPeople()
  }, [currentUser])

  function exportContactsToCSV() {
    if (!Array.isArray(contacts) || contacts.length === 0 || !contacts[0]) {
      alert('No contacts to export.')
      return
    }

    const headers = Object.keys(contacts[0])
    const csvRows = [
      headers.join(','), // Header row
      ...contacts.map((contact) =>
        headers
          .map((key) => {
            const val = contact[key]
            return typeof val === 'string' && val.includes(',')
              ? `"${val.replace(/"/g, '""')}"`
              : (val ?? '')
          })
          .join(','),
      ),
    ]

    const blob = new Blob([csvRows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'contacts.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // If loading, show loading component
  if (loading) return <Loading />

  return (
    <>
      <ModelToolBar
        modelName="contacts"
        searchColumn={'name'}
        columns={['name', 'id']}
        onRowClick={(link) => {
          window.location.href = `/account/connections/${link.id}`
        }}
      >
        <div className="mt-4 gap-2 sm:ml-4 sm:mt-0 sm:flex-none">
          <Link href="/account/assets/contacts/new">
            <button className="mr-1 inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
              <PlusCircleIcon className="h-5 w-5" />
              Create New Contact
            </button>
          </Link>
          <button
            onClick={exportContactsToCSV}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Export to CSV
          </button>
        </div>
      </ModelToolBar>
      <AccountPageHeader
        kicker={'Contacts'}
        title="Connections"
        description={
          'See all your connections in one place. You can add, edit, and delete contacts here.'
        }
      />
      <div className="container mx-auto min-h-screen p-4 px-8">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {contacts?.map((person) => (
            <ContactCard
              contact={person}
              subscription={subscription}
              key={person.id}
              onDelete={() => {
                setSelectedContact(person)
                setDeleteModalOpen(true)
              }}
            />
          ))}
        </ul>
      </div>

      {selectedContact && (
        <ContactDeleteModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          contactName={selectedContact.name}
          onConfirm={async () => {
            const { error } = await supabase
              .from('contacts')
              .delete()
              .eq('id', selectedContact.id)

            if (error) {
              console.error('Error deleting contact:', error)
            } else {
              console.log('Deleted:', selectedContact.id)
              setContacts((prev) =>
                prev.filter((contact) => contact.id !== selectedContact.id),
              )
            }

            setDeleteModalOpen(false)
            setSelectedContact(null)
          }}
        />
      )}
    </>
  )
}
