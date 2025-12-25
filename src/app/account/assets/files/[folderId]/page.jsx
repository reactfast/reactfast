'use client'

import { use, useEffect, useState } from 'react'
import FolderCard from '@/components/fileManagement/folderCard'
import FileCard from '@/components/fileManagement/fileCard'
import {
  HomeIcon,
  PlusIcon,
  ArrowUpTrayIcon as UploadIcon,
} from '@heroicons/react/24/outline'
import FileUpload from '@/components/formFields/singleFileUploadNullable'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { getUser } from '@/hooks/Auth'
import Loading from '../../../loading'
import AccountPageHeader from '@/components/accountPageHeader'
import StorageBar from '../StorageBar'
import MediaSelector from '@/components/formFields/MediaSelector'
import MediaSelectorModal from '@/components/formFields/MediaSelectorModal'

const pages = [{ name: 'Root', href: '/account/assets/files', current: false }]

function formatFileName(fileName) {
  if (fileName.length <= 15) {
    return fileName // Return the original name if it's too short
  }
  const firstPart = fileName.slice(0, 10) // First 10 characters
  const lastPart = fileName.slice(-5) // Last 5 characters
  return `${firstPart}...${lastPart}`
}

export default function FileManager({ params }) {
  const [loading, setLoading] = useState(true)
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false)
  const [isUploadModalOpen, setUploadModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const [folders, setFolders] = useState(null)
  const [files, setFiles] = useState(null)

  const [changed, setChanged] = useState(false)

  const [currentUser, setCurrentUser] = useState(null)

  const [usedKB, setUsedKB] = useState(0)

  const handleAddFolder = () => {
    if (params.folderId === 'root') {
      setAddFolderModalOpen(false)

      async function addFolder() {
        const { data, error } = await supabase
          .from('folders')
          .insert([{ name: newFolderName }])
        if (error) console.error('error', error)
        else console.log('Folder added:', data)
      }

      addFolder()
    } else {
      setAddFolderModalOpen(false)

      async function addFolder() {
        const { data, error } = await supabase.from('folders').insert([
          {
            name: newFolderName,
            parent_folder: params.folderId,
          },
        ])
        if (error) console.error('error', error)
        else console.log('Folder added:', data)
      }

      addFolder()
    }
  }

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  useEffect(() => {
    if (!currentUser) return

    async function getRootFolders() {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', currentUser.id)
        .is('parent_folder', null)
      if (error) console.error('error', error)
      else setFolders(data)
    }

    async function getRootFiles() {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', currentUser.id)
        .is('folder_id', null)
      if (error) console.error('error', error)
      else {
        setFiles(data)
        setLoading(false)
      }
    }

    async function getFolders() {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('parent_folder', params.folderId)
      if (error) console.error('error', error)
      else setFolders(data)
    }

    async function getFiles() {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('folder_id', params.folderId)
      if (error) console.error('error', error)
      else {
        setFiles(data)
        setLoading(false)
      }
    }

    if (params.folderId === 'root') {
      getRootFolders()
      getRootFiles()
    } else {
      getFolders()
      getFiles()
    }

    calculateUsedStorage()
  }, [currentUser])

  async function calculateUsedStorage() {
    const { data, error } = await supabase.storage
      .from('images')
      .list(`${currentUser.id}/`, { limit: 1000 }) // or the folder where uploads live

    if (error) {
      console.error('Error listing files:', error)
      return 0
    }

    const totalBytes = data.reduce(
      (sum, file) => sum + (file.metadata?.size || 0),
      0,
    )
    const totalKB = totalBytes / 1024

    console.log('Total storage used:', totalKB, 'KB')

    setUsedKB(totalKB)
  }

  const handleDeleteFolder = async (folderId) => {
    const { error } = await supabase.from('folders').delete().eq('id', folderId)
    if (error) {
      console.error('Error deleting folder:', error)
    } else {
      setFolders(folders.filter((folder) => folder.id !== folderId)) // Update UI
    }
  }

  const handleDeleteFile = async (fileId, fileName) => {
    const filePath = `${currentUser.id}/${fileName}`

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('images')
      .remove([filePath])

    if (storageError) {
      console.error('Error deleting file from storage:', storageError)
      return
    }

    // Delete from DB
    const { error: dbError } = await supabase
      .from('files')
      .delete()
      .eq('id', fileId)

    if (dbError) {
      console.error('Error deleting file reference from DB:', dbError)
    } else {
      setFiles(files.filter((file) => file.id !== fileId))
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <AccountPageHeader
        kicker={'File Manager'}
        title="File Manager"
        description={
          ' You can create folders to organize your files. This area is for public files and folders only. this is where media can be stored to be useable on your customizable jot.space pages. do not store anything you do not want publicly available.'
        }
      />
      <StorageBar currentKB={usedKB} maxKB={10485760} />

      {/* Breadcrumb */}
      {/* <nav
        aria-label="Breadcrumb"
        className="flex border border-gray-200 bg-white"
      >
        <ol
          role="list"
          className="flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
        >
          <li className="flex">
            <div className="flex items-center">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={page.href}
                  aria-current={page.current ? 'page' : undefined}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav> */}

      <div className="container mx-auto min-h-screen p-4 px-8">
        {/* Header */}
        {/* <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setAddFolderModalOpen(true)}
              className="flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Folder</span>
            </button>
          </div>
        </div> */}

        {/* Files and Folders Area */}
        {/* {folders && (
          <>
            <h2>Folders</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {folders?.map((folder) => (
                <FolderCard
                  name={folder.name}
                  folderId={folder.id}
                  onDelete={handleDeleteFolder}
                  link={`/account/assets/files/${folder.id}`}
                />
              ))}
            </div>
          </>
        )} */}
        <div>Files</div>
        <div>
          <FileUpload folder={params.folderId} />
        </div>
        <br />
        {files && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {files?.map((file) => (
                <FileCard
                  name={formatFileName(file.file_name)}
                  previewUrl={file.ref}
                  fileId={file.id}
                  onDelete={() => handleDeleteFile(file.id, file.file_name)}
                />
              ))}
            </div>
          </>
        )}

        {/* Add Folder Modal */}
        {isAddFolderModalOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold">Add Folder</h2>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Folder Name"
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setAddFolderModalOpen(false)}
                  className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFolder}
                  className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
