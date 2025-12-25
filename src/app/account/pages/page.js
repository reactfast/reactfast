'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AccountPageHeader from '@/components/accountPageHeader'
import { getUser } from '@/hooks/Auth'
import { getUserSubscription } from '@/helpers/subs'
import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Loading from '../loading'
import ShareModal from '@/components/ShareModal'
import ModelToolBar from '@/components/modelToolBar'
import PageSelectionModal from './selectThree'
import { Card } from './siteCard'
import { AddPage } from './addPageModal'
import { DeleteModal } from './deletePageModal'

export default function Pages() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [addPageModal, setAddPageModal] = useState(false)
  const handleModal = () => setAddPageModal(!addPageModal)
  const [user, setUser] = useState({})
  const [subType, setSubType] = useState(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [pageToDelete, setPageToDelete] = useState({})

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState({})

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle the change of the published status
  const canMakeMorePages = () => {
    console.log(subType.draft_sites_allowed)
    console.log(pages.length)
    if (subType?.draft_sites_allowed <= pages.length) {
      alert(
        'You have reached your page limit. Please upgrade your plan to create more pages.',
      )
      return false
    }

    return true
  }

  const openDeleteModal = ({ id, title }) => {
    setPageToDelete({ id, title })
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  async function getUserPages() {
    setLoading(true)

    const thisUser = await getUser()
    setUser(thisUser)

    let { data, error } = await supabase
      .from('pages')
      .select(`*`)
      .filter('user_id', 'eq', thisUser.id)
      .order('created_at', { ascending: true })
    if (error) {
      console.warn(error)
    } else if (data) {
      setPages(data)
      console.log(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserPages()
  }, [])

  useEffect(() => {
    getUserSubscription(user.id).then((data) => setSubType(data))
  }, [user])

  function handleShareClick(page) {
    setPage({
      id: page.id,
      name: page.title,
    })
    setOpen(true)
  }

  function handleCreateSiteClick() {
    if (!canMakeMorePages()) return
    setIsModalOpen(true)
  }

  if (loading) return <Loading />

  return (
    <>
      <ModelToolBar
        modelName="pages"
        searchColumn={'name'}
        columns={['name', 'id']}
        onRowClick={(link) => {
          window.location.href = `/account/pages/${link.id}`
        }}
      >
        <div className="justify-right flex">
          <span className="isolate inline-flex rounded-md shadow-sm">
            {subType && (
              <>
                <button
                  onClick={handleCreateSiteClick}
                  type="button"
                  className="relative inline-flex items-center gap-1 rounded bg-secondary px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 transition-all duration-200 hover:brightness-110 focus:z-10"
                >
                  <PlusCircleIcon className="h-5 w-5" /> Create Page
                </button>
              </>
            )}
          </span>
        </div>
      </ModelToolBar>
      <AccountPageHeader
        kicker={'Jot Space User Spaces'}
        title="My Spaces"
        description={
          'All users Spaces in an index view See previews & other useful information.'
        }
      />
      <div className="container mx-auto min-h-screen p-4">
        <div className="grid max-h-[92vh] w-full grid-cols-12 gap-4 p-4">
          {pages?.length > 0 ? (
            pages.map((page) => (
              <Card
                key={page.id}
                title={page.name}
                metaImg={page.meta_img}
                metaDesc={page.meta_description}
                order={page.order}
                description={page.description}
                link={`pages/${page.id}`}
                id={page.id}
                handleOpenDeleteModal={openDeleteModal}
                active={page.active}
                shareHandle={handleShareClick}
              />
            ))
          ) : (
            <div className="col-span-12 flex h-[70vh] w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:bg-gray-100">
              <button
                onClick={handleCreateSiteClick}
                className="flex flex-col items-center justify-center p-10 text-gray-600 transition-all duration-300 hover:scale-105 hover:text-gray-800"
              >
                <PlusCircleIcon className="h-20 w-20 text-gray-400 transition-all duration-300 group-hover:text-gray-600" />
                <span className="mt-4 text-2xl font-bold">
                  Create your first Page
                </span>
                <span className="mt-2 text-sm text-gray-500">
                  Click to get started
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {addPageModal && <AddPage closeModal={handleModal} user={user} />}

      <DeleteModal
        id={pageToDelete.id}
        title={pageToDelete.title}
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
      />

      <ShareModal open={open} setOpen={setOpen} site={page} />

      <PageSelectionModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        blankPageModal={() => setAddPageModal(true)}
      />
    </>
  )
}
