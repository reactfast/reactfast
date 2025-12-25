'use client'

import { use, useEffect, useState } from 'react'
import ReturnSection from './returnSecs3.js'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Loading from './loading.jsx'
import QRCodeCanvas from '@/components/qrv2.js'
import MobileOnlyPage from '@/components/mobileOnly.jsx'
import { fonts } from '@/utils/fonts.js'
import { useRouter, useSearchParams } from 'next/navigation'
import PoweredByJot from '@/components/poweredByJot.jsx'
import { getUser } from '@/hooks/Auth'
import { v4 as uuidv4 } from 'uuid'
import { checkGeolocationPermission } from '@/helpers/checkLocationPermission.js'
import CartBtn from '@/components/cartBtn.jsx'
import JoinJotNow from '@/components/joinJotNow.jsx'
import ActionMenu from './actionMenu'
import MobileDrawerForm from './shareContactDrawer.jsx'
import JotAccountPromptDrawer from './createJotAccount.jsx'
import QRModal from './QrModal.jsx'
import { usePathname } from 'next/navigation'

function useSlug(params) {
  const pathname = usePathname()

  // If params.slug exists (standard dynamic route), use it
  if (params?.slug) return params.slug

  // Fallback to extracting from path (custom domain via rewrite)
  if (typeof window === 'undefined') return null // Avoid SSR mismatch
  const segments = pathname.split('/').filter(Boolean)
  return segments.length > 0 ? segments[0] : null
}

export default function Page({ params }) {
  const router = useRouter()
  const slug = useSlug(params) // page-name

  const [page, setPage] = useState({})
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showQR, setShowQR] = useState(false) // State to toggle QR display
  const [currentURL, setCurrentURL] = useState('')
  const [shareContact, setShareContact] = useState(false)
  const [aditionalQrUri, setAditionalQrUri] = useState([])
  const [testing, setTesting] = useState('')
  const [userData, setUserData] = useState(null)
  const [fontClass, setFontClass] = useState('') // State for font
  const [location, setLocation] = useState(null) // State for location
  const [locationState, setLocationState] = useState('') // State for location permission
  const searchParams = useSearchParams()

  const [sectionsIdArray, setSectionsIdArray] = useState([])

  const [shareDrawerOpen, setShareDrawerOpen] = useState(false)
  const [createAccountDrawer, setCreateAccountDrawer] = useState(false)

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      setUserData(user)
    }
    _getUser()

    async function _GeoInit() {
      const permissionState = await checkGeolocationPermission()
      if (permissionState === 'granted' || permissionState === 'prompt') {
        setLocationState(permissionState)
      }
    }

    _GeoInit()

    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (lat && lon) {
      setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) })
      console.log('Location found in URL:', { latitude: lat, longitude: lon })
    } else {
      console.log('No location in URL')
    }
  }, [])

  function getGeo() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }

  // location logic
  useEffect(() => {
    console.log('Location State:', locationState)
    console.log('Location:', location)
    if (location) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('lat', location.latitude.toString())
      params.set('lon', location.longitude.toString())

      router.push(`?${params.toString()}`, { scroll: false })
      setCurrentURL(`${window.location.href}/?${params.toString()}`)
    }
  }, [location, locationState])

  // VISIT CODE
  useEffect(() => {
    // check for logged in user
    // if logged in user don't count
    if (!page || !page.id) return
    if (userData) return

    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)'),
      )
      return match ? match[2] : null
    }

    function setCookie(name, value, days) {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure`
    }

    async function saveVisit(guestId) {
      const { data, error } = await supabase
        .from('visits')
        .insert({
          page: page.id,
          guest_id: guestId,
          lat: location ? location.latitude : null,
          lon: location ? location.longitude : null,
        })
        .select()

      if (error) {
        console.warn('Error saving visit:', error)
      } else {
        console.log('Visit recorded:', data)
      }
    }

    let guestId = getCookie('jotProdGuestId')

    if (!guestId) {
      guestId = uuidv4()
      setCookie('jotProdGuestId', guestId, 365) // Store for 1 year
    }

    saveVisit(guestId)
  }, [page])

  useEffect(() => {
    setCurrentURL(window.location.href)
    async function getPage() {
      setLoading(true)
      let { data, error } = await supabase
        .from('pages')
        .select(`*`)
        .eq('name', slug)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setPage(data)
        setFontClass(fonts[data.font_name]?.variable || fonts['Inter'].variable) // Default to Inter
        console.log('data', data)
      }
    }

    getPage()
  }, [slug])

  useEffect(() => {
    if (!page || page.active === false) {
      router.push('/404')
      return
    }

    async function getPageSectionIds() {
      setLoading(true)

      const { data, error } = await supabase
        .from('page_sections')
        .select('section, order')
        .eq('page', page.id)
        .order('order', { ascending: true })

      if (error) {
        console.warn('Error fetching page_sections:', error)
      } else if (data) {
        const orderedSectionIds = data.map((sec) => sec.section)
        setSectionsIdArray(orderedSectionIds)
      }

      setLoading(false)
    }

    if (page.id) {
      getPageSectionIds()
    }
  }, [page])

  useEffect(() => {
    async function getSectionsData() {
      if (!page?.id || sectionsIdArray.length === 0) return
      setLoading(true)

      const { data, error } = await supabase
        .from('secs')
        .select('*, sec_type(*)') // Include sec_type join
        .in('id', sectionsIdArray)

      if (error) {
        console.warn('Error fetching sections:', error)
      } else if (data) {
        // Ensure sections are ordered correctly
        const orderedSections = sectionsIdArray.map((id) =>
          data.find((section) => section.id === id),
        )
        setSections(orderedSections)
        console.log('Ordered Sections:', orderedSections)
      }

      setLoading(false)
    }

    if (page.id && sectionsIdArray.length > 0) {
      getSectionsData()
    }
  }, [page, sectionsIdArray])

  function handleUpdateURI() {
    setAditionalQrUri((prev) => {
      return [...prev, '']
    })
  }

  function handleShareContact() {
    if (page?.share_contact) setShareDrawerOpen(true)
    else if (page?.create_account) {
      setCreateAccountDrawer(true)
    }
  }

  function doesOwnCurrentPage() {
    if (!userData || !page) return false
    return userData.id === page.user_id
  }

  if (loading || !slug) return <Loading />

  return (
    <>
      <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,container-queries"></script>
      <div
        style={{
          fontFamily: '--font-playfair',
          color: page.font_color,
          backgroundColor: page?.bg_color,
          backgroundImage: page.bg_image ? `url(${page.bg_image})` : 'none',
          backgroundSize: 'cover', // Ensures full coverage
          backgroundPosition: 'center', // Centers the image
          backgroundRepeat: 'no-repeat', // Prevents repeating
          backgroundAttachment: 'fixed', // Keeps the image static while scrolling
        }}
        className={`font-sans ${fontClass} min-h-screen`}
      >
        <div className="backface-hidden relative w-full">
          <div id="FONTS" className={fonts[page?.font_name] || ''}>
            {sections.map((section) => (
              <ReturnSection
                key={section.id}
                sec={section.component}
                section={section}
                content={section.definition}
                colors={[
                  page.primary,
                  page.secondary,
                  page.tertiary,
                  page.quaternary,
                  page.bg_color,
                  page.foreground_color,
                ]}
                theme={section.sec_type.folder_name}
                component_name={section.sec_type.component_name}
                site={page}
              />
            ))}
          </div>
        </div>

        <QRModal
          showQR={showQR}
          setShowQR={setShowQR}
          page={page}
          currentURL={currentURL}
        />

        {!showQR && page?.show_jot_branding && (
          <PoweredByJot page={page} color={page.font_color} />
        )}

        {page.show_cart && (
          <CartBtn
            link={currentURL + '/cart'}
            colors={[
              page.primary,
              page.secondary,
              page.tertiary,
              page.quaternary,
              page.bg_color,
              page.foreground_color,
            ]}
          />
        )}
      </div>

      {!shareDrawerOpen && !createAccountDrawer && page?.show_jot_branding && (
        <JoinJotNow />
      )}

      {page.show_menu && (
        <ActionMenu
          page={page}
          params={params}
          setShowQR={setShowQR}
          showQR={showQR}
          handleShare={handleShareContact}
          pageOwner={doesOwnCurrentPage()}
        />
      )}

      {/* Share Contact Drawer */}
      <MobileDrawerForm
        open={shareDrawerOpen}
        onClose={() => {
          setShareDrawerOpen(false)
          if (page?.jot_conversion) {
            setCreateAccountDrawer(true)
          }
        }}
        recipient={slug}
      />

      {/* Create Jot Account Promt */}
      <JotAccountPromptDrawer
        open={createAccountDrawer}
        onClose={() => setCreateAccountDrawer(false)}
      />
    </>
  )
}
