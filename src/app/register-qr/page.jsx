'use client'

import { use, useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'

import { getUser } from '@/hooks/Auth'
import Loading from '../loading'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const booptag = [
  'ea8b67cf-2142-40fb-9857-dd96e383bb5e',
  '4fb526f5-9ee1-4ab6-9ac5-cfeee06bbb55',
  '1fb37172-a993-448c-a714-1414e1015ea3',
]

export default function Page() {
  const [qrid, setQrid] = useState(null)
  const [qr, setQr] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  const [isBooptag, setIsBooptag] = useState(false)
  const [booptagPets, setBooptagPets] = useState([])

  const [userHasPages, setUserHasPages] = useState(false)
  const [userPages, setUserPages] = useState([])
  const [accountStatus, setAccountStatus] = useState(null) // true, false, or null for loading
  const router = useRouter()

  const [selected, setSelected] = useState({ name: 'Select Site' })

  const [redirectUrl, setRedirectUrl] = useState('')

  // Get the `qrid` parameter from the URL
  useEffect(() => {
    const paramQrid = new URLSearchParams(window.location.search).get('qrid')

    if (paramQrid) {
      setQrid(paramQrid)
    }
  }, [])

  //fetch QR DATA
  useEffect(() => {
    if (!qrid) return

    async function getQr() {
      setLoading(true)

      const { data, error } = await supabase
        .from('qr_codes')
        .select(
          `
    *,
    product (
      id,
      name,
      default_image
    )
  `,
        )
        .eq('id', qrid)
        .single()

      if (data.user_id) {
        router.push('/already-registered')
      }

      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

      if (!data) {
        router.push('/404')
        return
      }

      setQr(data)
      setLoading(false)
    }

    getQr()
  }, [qrid, router])

  useEffect(() => {
    if (!qr) return

    // Check if the QR code is for booptag
    if (booptag.includes(qr?.product?.id)) {
      setIsBooptag(true)
    } else {
      setIsBooptag(false)
    }
  }, [qr])

  useEffect(() => {
    async function getPets() {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', currentUser.id)

      if (error) {
        console.error('Error fetching pets:', error)
        return
      } else if (data.length > 0) {
        setBooptagPets(data)
      }
    }

    if (isBooptag) {
      getPets()
    }
  }, [isBooptag])

  // Check if user is logged in and has pages
  useEffect(() => {
    async function _getUser() {
      try {
        // Check for the auth token key in local storage with a pattern
        const tokenPattern = /^sb-[a-z0-9]+-auth-token$/
        const authTokenKey = Object.keys(localStorage).find((key) =>
          tokenPattern.test(key),
        )

        if (!authTokenKey) {
          setAccountStatus(false) // No matching auth token, user not logged in
          return
        }

        const authToken = localStorage.getItem(authTokenKey)

        if (!authToken) {
          setAccountStatus(false) // Token exists but is null or undefined
          return
        }

        // Proceed to fetch user
        const user = await getUser()

        if (!user) {
          setAccountStatus(false) // User not logged in
          return
        }

        setCurrentUser(user)
        setAccountStatus(true)

        const { data, error } = await supabase
          .from('pages')
          .select('id, name')
          .eq('user_id', user.id)

        if (error) {
          console.error(error)
          return
        }

        setUserHasPages(data.length > 0)
        setUserPages(data)
      } catch (error) {
        setAccountStatus(false)
        console.error('Error in user authentication:', error)
      }
    }

    _getUser()
  }, [])

  // Update QR status to active
  async function updateQrStatus() {
    const { data, error } = await supabase
      .from('qr_codes')
      .update({ status: 'active', user_id: user.id, redirect_url: '' })
      .eq('id', qrid)

    if (error) {
      console.error(error)
    }
  }

  const handleLogin = () => {
    window.location.href = `https://jot.space/login/?qrid=${qrid}`
  }

  const handleSignup = () => {
    window.location.href = 'https://jot.space/register'
  }

  const handleCustomUrl = () => {
    async function _updateQR() {
      const { data, error } = await supabase
        .from('qr_codes')
        .update({
          status: 'active',
          user_id: currentUser.id,
          redirect_url: redirectUrl,
        })
        .eq('id', qrid)

      if (error) {
        console.error(error)
      } else {
        // Redirect to /success if the update is successful
        router.push(redirectUrl)
      }
    }

    _updateQR()
  }

  function handleSaveSelectedPage() {
    const NewUrl = isBooptag
      ? `https://jot.space/pets/${selected.id}`
      : `https://jot.space/${selected.name}`

    async function _updateQR() {
      const { data, error } = await supabase
        .from('qr_codes')
        .update({
          status: 'active',
          user_id: currentUser.id,
          redirect_url: NewUrl,
        })
        .eq('id', qrid)

      if (error) {
        console.error(error)
      } else {
        // Redirect to /success if the update is successful
        router.push(NewUrl)
      }
    }

    _updateQR()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-neutral-100">
      <div className="container mx-auto p-4">
        <>
          {accountStatus === null && <div>Loading your account status...</div>}

          {accountStatus === false && (
            <div>
              <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                />
                <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                    <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
                      Login Or Register to continue
                    </h1>
                    <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                      <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        You must be logged in to register a QR code. If you do
                        not have an account, you can create one for free.
                        <br />
                      </p>
                      <div className="mt-10 flex items-center gap-x-6">
                        <div
                          onClick={handleSignup}
                          className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign Up FREE
                        </div>
                        <div
                          onClick={handleLogin}
                          className="cursor-pointer text-sm/6 font-semibold text-gray-900"
                        >
                          Login <span aria-hidden="true">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
              </div>
            </div>
          )}

          <DevicePreview qr={qr} />

          {accountStatus === true && !isBooptag && (
            <>
              <div className="mb-48 min-h-screen p-4">
                <div className="mx-auto max-w-md space-y-6">
                  <h1 className="text-center text-2xl font-thin tracking-wide text-primary">
                    Welcome Back
                  </h1>
                  {/* Option 1 */}{' '}
                  <div className="space-y-3 rounded-2xl bg-white p-4 shadow">
                    <h2 className="text-lg font-light uppercase text-gray-600">
                      Option 1
                    </h2>
                    <p className="text-sm font-black text-gray-600">
                      Redirect your QR code to any custom URL.
                    </p>
                    <div>
                      <label
                        htmlFor="custom-url"
                        className="mb-1 block text-sm text-gray-700"
                      >
                        Enter your URL
                      </label>
                      <input
                        id="custom-url"
                        type="text"
                        value={redirectUrl}
                        onChange={(e) => setRedirectUrl(e.target.value)}
                        placeholder="https://your-link.com"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      onClick={() => handleCustomUrl()}
                      type="button"
                      className="w-full rounded-lg bg-primary py-2 text-white transition hover:brightness-110"
                    >
                      Register QR
                    </button>
                  </div>
                  {/* Option 2 */}
                  <div className="space-y-3 rounded-2xl bg-white p-4 shadow">
                    <h2 className="text-lg font-light uppercase text-gray-600">
                      Option 2
                    </h2>
                    <p className="text-sm font-black text-gray-600">
                      Create a brand-new page from a template.
                    </p>
                    <button
                      onClick={() => router.push(`/site-create/?qrid=${qrid}`)}
                      className="w-full rounded-lg bg-primary py-2 text-white transition hover:brightness-110"
                    >
                      Create a New Page
                    </button>
                  </div>
                  {/* Option 3 */}
                  {userHasPages && (
                    <div className="space-y-3 rounded-2xl bg-white p-4 shadow">
                      <h2 className="text-lg font-light uppercase text-gray-600">
                        Option 3
                      </h2>
                      <p className="text-sm font-black text-gray-600">
                        Select an existing page for your QR code.
                      </p>
                      <Listbox value={selected} onChange={setSelected}>
                        <Label className="block text-sm/6 font-medium text-gray-900">
                          Select Site
                        </Label>
                        <div className="relative mt-2">
                          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            <span className="col-start-1 row-start-1 truncate pr-6">
                              {selected.name}
                            </span>
                            <ChevronUpDownIcon
                              aria-hidden="true"
                              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {userPages.map((page) => (
                              <ListboxOption
                                key={page.id}
                                value={page}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                              >
                                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                  {page.name}
                                </span>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                      <button
                        onClick={handleSaveSelectedPage}
                        className="w-full rounded-lg bg-primary py-2 text-white transition hover:brightness-110"
                      >
                        Save Selected Page
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-8 cursor-pointer text-center text-gray-500 hover:underline">
                  <p
                    onClick={() => {
                      setRedirectUrl('https://jot.space/') // Default redirect URL
                      handleCustomUrl()
                    }}
                  >
                    Skip for now
                  </p>
                </div>
              </div>
            </>
          )}

          {accountStatus === true && isBooptag && (
            <>
              <div className="mb-48 min-h-screen p-4">
                <div className="mx-auto max-w-md space-y-6">
                  <div className="space-y-3 rounded-2xl bg-white p-4 shadow">
                    <h2 className="text-lg font-light uppercase text-gray-600">
                      Option 1
                    </h2>
                    <p className="text-sm font-black text-gray-600">
                      Create a brand-new page from a template.
                    </p>
                    <button
                      onClick={() => router.push(`/pets/form?qrid=${qrid}`)}
                      className="w-full rounded-lg bg-primary py-2 text-white transition hover:brightness-110"
                    >
                      Create a New Page
                    </button>
                  </div>
                  {booptagPets.length > 0 && (
                    <div className="space-y-3 rounded-2xl bg-white p-4 shadow">
                      <h2 className="text-lg font-light uppercase text-gray-600">
                        Option 2
                      </h2>
                      <p className="text-sm font-black text-gray-600">
                        Select an existing page for your BoopTag Device.
                      </p>
                      <Listbox value={selected} onChange={setSelected}>
                        <Label className="block text-sm/6 font-medium text-gray-900">
                          Select Site
                        </Label>
                        <div className="relative mt-2">
                          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            <span className="col-start-1 row-start-1 truncate pr-6">
                              {selected.name}
                            </span>
                            <ChevronUpDownIcon
                              aria-hidden="true"
                              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {booptagPets.map((page) => (
                              <ListboxOption
                                key={page.id}
                                value={page}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                              >
                                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                  {page.name}
                                </span>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                      <button
                        onClick={handleSaveSelectedPage}
                        className="w-full rounded-lg bg-primary py-2 text-white transition hover:brightness-110"
                      >
                        Save Selected Page
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  )
}

function DevicePreview({ qr }) {
  const hasDevice = !!qr?.product?.id

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow">
      {hasDevice ? (
        <div className="flex items-center gap-4">
          <img
            src={qr.product.default_image || qr.product.img_ref}
            alt={qr.product.name}
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{qr.product.name}</h2>
            <p className="text-sm text-gray-500">Detected Device</p>
            <a
              href={`/set-device?qrid=${qr.id}`}
              className="mt-1 text-sm text-indigo-600 hover:underline"
            >
              Fix mislabeled device
            </a>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-200">
            <span className="text-gray-500">No Device</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">No Device Detected</h2>
            <p className="text-sm text-gray-500">
              This QR code has no associated device. Please assign one.
            </p>
            <a
              href={`/set-device?qrid=${qr.id}`}
              className="mt-1 text-sm text-indigo-600 hover:underline"
            >
              Assign Device
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
