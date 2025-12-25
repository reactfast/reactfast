'use client'

import { use, useState } from 'react'
import { useEffect } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import Toast from '@/components/toast'

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    id: '',
    company_name: '',
    company_website: '',
    theme: '',
    primaryPhone: '',
    twitter: '',
    linkedIn: '',
    facebook: '',
    instagram: '',
    threads: '',
    tikTok: '',
    spotify: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    github: '',
    venmo: '',
    cashApp: '',
    bio: '',
    profilePhoto: null,
    companyLogo: null,
  })

  const [toastVisible, setToastVisible] = useState(false)

  const showToast = () => {
    setToastVisible(true)
  }

  const hideToast = () => {
    setToastVisible(false)
  }

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error.message)
    } else {
      console.log('User logged out successfully')
      window.location.href = '/' // Redirect to homepage or login
    }
  }

  useEffect(() => {
    if (!currentUser) return
    console.log(currentUser)
    async function getProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()
      if (error) console.error('error', error)
      else setProfile(data)
    }

    getProfile()
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setProfile((prev) => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Upload profile photo if it's a new file
      let profilePhotoUrl = profile.profilePhoto
      if (profile.profilePhoto instanceof File) {
        const { data, error } = await supabase.storage
          .from('public')
          .upload(`profiles/${profile.id}/profilePhoto`, profile.profilePhoto, {
            cacheControl: '3600',
            upsert: true,
          })

        if (error) throw error
        profilePhotoUrl = data.path
      }

      // Upload company logo if it's a new file
      let companyLogoUrl = profile.companyLogo
      if (profile.companyLogo instanceof File) {
        const { data, error } = await supabase.storage
          .from('public')
          .upload(`profiles/${profile.id}/companyLogo`, profile.companyLogo, {
            cacheControl: '3600',
            upsert: true,
          })

        if (error) throw error
        companyLogoUrl = data.path
      }

      // Update profile in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          company_name: profile.company_name,
          company_website: profile.company_website,
          theme: profile.theme,
          primaryPhone: profile.primaryPhone,
          twitter: profile.twitter,
          linkedIn: profile.linkedIn,
          facebook: profile.facebook,
          instagram: profile.instagram,
          threads: profile.threads,
          tikTok: profile.tikTok,
          spotify: profile.spotify,
          first_name: profile.first_name,
          last_name: profile.last_name,
          middle_name: profile.middle_name,
          github: profile.github,
          venmo: profile.venmo,
          cashApp: profile.cashApp,
          bio: profile.bio,
          profilePhoto: profilePhotoUrl,
          companyLogo: companyLogoUrl,
        })
        .eq('id', profile.id)

      if (error) {
        console.error('Error updating profile:', error.message)
      } else {
        console.log('Profile updated successfully')
        showToast()
      }
    } catch (err) {
      console.error('Error during save:', err.message)
    }
  }

  return (
    <div className="mx-8 my-4 max-w-3xl">
      <form onSubmit={handleSubmit}>
        {' '}
        <h2 className="text-lg font-semibold text-gray-800">
          Profile Information
        </h2>
        <p className="text-sm text-gray-600">
          Fill out the details below to update your profile.
        </p>
        <p>Customer Id: {currentUser?.id}</p>
        {/* Company Section */}
        <div className="mt-8">
          <h3 className="text-md border-b pb-2 font-semibold text-gray-700">
            Company Details
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-medium text-gray-800"
              >
                Company Name
              </label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                value={profile.company_name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="company_website"
                className="block text-sm font-medium text-gray-800"
              >
                Company Website
              </label>
              <input
                id="company_website"
                name="company_website"
                type="text"
                value={profile.company_website}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="theme"
                className="block text-sm font-medium text-gray-800"
              >
                Theme
              </label>
              <input
                id="theme"
                name="theme"
                type="text"
                value={profile.theme}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="companyLogo"
                className="block text-sm font-medium text-gray-800"
              >
                Company Logo
              </label>
              <input
                id="companyLogo"
                name="companyLogo"
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-600 hover:file:bg-indigo-100"
              />
            </div>
          </div>
        </div>
        {/* Social Media Section */}
        <div className="mt-8">
          <h3 className="text-md border-b pb-2 font-semibold text-gray-700">
            Social Media
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-800"
              >
                Twitter
              </label>
              <input
                id="twitter"
                name="twitter"
                type="text"
                value={profile.twitter}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="linkedIn"
                className="block text-sm font-medium text-gray-800"
              >
                LinkedIn
              </label>
              <input
                id="linkedIn"
                name="linkedIn"
                type="text"
                value={profile.linkedIn}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-gray-800"
              >
                Facebook
              </label>
              <input
                id="facebook"
                name="facebook"
                type="text"
                value={profile.facebook}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="instagram"
                className="block text-sm font-medium text-gray-800"
              >
                Instagram
              </label>
              <input
                id="instagram"
                name="instagram"
                type="text"
                value={profile.instagram}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="threads"
                className="block text-sm font-medium text-gray-800"
              >
                Threads
              </label>
              <input
                id="threads"
                name="threads"
                type="text"
                value={profile.threads}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="tikTok"
                className="block text-sm font-medium text-gray-800"
              >
                TikTok
              </label>
              <input
                id="tikTok"
                name="tikTok"
                type="text"
                value={profile.tikTok}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="spotify"
                className="block text-sm font-medium text-gray-800"
              >
                Spotify
              </label>
              <input
                id="spotify"
                name="spotify"
                type="text"
                value={profile.spotify}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        {/* Personal Details Section */}
        <div className="mt-8">
          <h3 className="text-md border-b pb-2 font-semibold text-gray-700">
            Personal Details
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-800"
              >
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={profile.first_name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="middle_name"
                className="block text-sm font-medium text-gray-800"
              >
                Middle Name
              </label>
              <input
                id="middle_name"
                name="middle_name"
                type="text"
                value={profile.middle_name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-800"
              >
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={profile.last_name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-800"
              >
                GitHub
              </label>
              <input
                id="github"
                name="github"
                type="text"
                value={profile.github}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="venmo"
                className="block text-sm font-medium text-gray-800"
              >
                Venmo
              </label>
              <input
                id="venmo"
                name="venmo"
                type="text"
                value={profile.venmo}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="cashApp"
                className="block text-sm font-medium text-gray-800"
              >
                CashApp
              </label>
              <input
                id="cashApp"
                name="cashApp"
                type="text"
                value={profile.cashApp}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        {/* Profile Section */}
        <div className="mt-8">
          <h3 className="text-md border-b pb-2 font-semibold text-gray-700">
            Profile Photo & Bio
          </h3>
          <div className="mt-4">
            <div>
              <label
                htmlFor="profilePhoto"
                className="block text-sm font-medium text-gray-800"
              >
                Profile Photo
              </label>
              <input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-600 hover:file:bg-indigo-100"
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-800"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={profile.bio}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="mr-4 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
      <Toast
        title="Action Successful"
        message="Your changes have been saved."
        show={toastVisible}
        onClose={hideToast}
        duration={3000}
      />
    </div>
  )
}
