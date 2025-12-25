'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import Loading from '../loading'
import AccountPageHeader from '@/components/accountPageHeader'
import { Card } from '../pages/siteCard'
import ModelToolBar from '@/components/modelToolBar'
import ShareModal from '@/components/ShareModal'

export default function TeamSpaces() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState({})

  function handleShareClick(page) {
    setPage({
      id: page.id,
      name: page.title,
    })
    setOpen(true)
  }

  async function getTeamPages() {
    setLoading(true)
    const thisUser = await getUser()
    setUser(thisUser)

    // fetch only team/collaboration pages
    const { data, error } = await supabase
      .from('org_members_pages')
      .select(
        `
        page:pages(*)
      `,
      )
      .eq('user_id', thisUser.id)

    if (error) {
      console.error(error)
    } else {
      setPages(data?.map((row) => row.page) || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    getTeamPages()
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <ModelToolBar
        modelName="team-spaces"
        searchColumn={'name'}
        columns={['name', 'id']}
        onRowClick={(link) => {
          window.location.href = `/account/pages/${link.id}`
        }}
      />

      <AccountPageHeader
        kicker={'Jot Space Teams'}
        title="Team Spaces"
        description={
          'Spaces that have been shared with you by your team or organization.'
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
                active={page.active}
                shareHandle={handleShareClick}
              />
            ))
          ) : (
            <div className="col-span-12 flex h-[70vh] w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:bg-gray-100">
              <p className="text-gray-600">
                No team spaces have been shared with you yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <ShareModal open={open} setOpen={setOpen} site={page} />
    </>
  )
}
