'use client'

import { useEffect, useState } from 'react'
import ReturnSection from './returnSecs3.js'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Loading from './loading.jsx'
import { fonts } from '@/utils/fonts.js'
import { useRouter, useSearchParams } from 'next/navigation'
import PoweredByJot from '@/components/poweredByJot.jsx'
import { getUser } from '@/hooks/Auth'
import { v4 as uuidv4 } from 'uuid'
import { checkGeolocationPermission } from '@/helpers/checkLocationPermission.js'
import { MakeSections } from '@/scaffold/pet/template.js'
import GeoLocationConsent from '@/components/consent/geoLocationConsent.jsx'
import ContactModal from './contactModal.jsx'
import { Edit } from 'lucide-react'
import EditBoopButton from './actionMenu.jsx'

export default function Page({ params }) {
  const router = useRouter()

  // STATE
  const [pet, setPet] = useState({})
  const [page, setPage] = useState({})
  const [sections, setSections] = useState([])
  const [sectionsWSecType, setSectionsWithSecType] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentURL, setCurrentURL] = useState('')
  const [userData, setUserData] = useState(null)
  const [fontClass, setFontClass] = useState('')
  const [location, setLocation] = useState(null)
  const [locationState, setLocationState] = useState('')
  const searchParams = useSearchParams()

  // Modals
  const [showContactModal, setShowContactModal] = useState(false)
  const [showGeoConsent, setShowGeoConsent] = useState(false)

  // --- INIT EFFECTS ---
  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      setUserData(user)
    }
    _getUser()
  }, [])

  // --- INITIAL VISIT (runs once) ---
  useEffect(() => {
    if (!params.petId) return

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

    let guestId = getCookie('BoopTagProdGuestId')

    if (!guestId) {
      guestId = uuidv4()
      setCookie('BoopTagProdGuestId', guestId, 365)
    }

    saveVisit(guestId)
  }, [])

  // fetch pet data
  useEffect(() => {
    setCurrentURL(window.location.href)
    async function getPet() {
      setLoading(true)
      let { data, error } = await supabase
        .from('pets')
        .select(`*`)
        .eq('id', params.petId)
        .single()
      if (error) console.warn(error)
      else if (data) setPet(data)
    }
    getPet()
  }, [params])

  useEffect(() => {
    if (!pet) return

    async function getSections() {
      setLoading(true)
      setSections(MakeSections(pet))
      setLoading(false)
    }

    getSections()
  }, [pet])

  useEffect(() => {
    async function fetchSectionTypes() {
      const updatedSections = await Promise.all(
        sections.map(async (section) => {
          if (section.sec_type) {
            const secType = await getSecType({ secId: section.sec_type })
            return { ...section, sec_type: secType }
          }
          return section
        }),
      )
      setSectionsWithSecType(updatedSections)
    }
    if (sections?.length) fetchSectionTypes()
  }, [sections])

  // --- GEO CONSENT FLOW ---
  function handleGeoConsent(response, payload) {
    const guestId = document.cookie.match(/BoopTagProdGuestId=([^;]+)/)?.[1]
    if (!guestId) return console.error('No guestId found!')

    if (response === 'agree' && payload) {
      console.log('User agreed with location:', payload)
      setLocation({ lat: payload.lat, lng: payload.lng })
      saveVisit(guestId, { lat: payload.lat, lng: payload.lng })
    } else {
      console.log('User skipped sharing location')
    }

    setShowGeoConsent(false)
    setShowContactModal(true)
  }

  async function getSecType({ secId }) {
    let { data, error } = await supabase
      .from('sec_type')
      .select(`*`)
      .eq('id', secId)
      .single()
    if (error) console.warn(error)
    else if (data) return data
  }

  // --- SAVE VISIT FUNCTION ---
  async function saveVisit(guestId, loc = null, extra = {}) {
    const { data, error } = await supabase
      .from('pet_visits')
      .insert({
        pet_id: pet.id,
        guest_id: guestId,
        lat: loc ? loc.lat : null,
        lon: loc ? loc.lng : null,
      })
      .select()

    if (error) console.warn('Error saving visit:', error)
    else console.log('Visit recorded:', data)
  }

  function handleContactOwner() {
    setShowGeoConsent(true)
  }

  if (loading) return <Loading />

  return (
    <>
      <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,container-queries"></script>

      <div
        style={{
          color: page.font_color,
          backgroundColor: page?.bg_color,
          backgroundImage: page.bg_image ? `url(${page.bg_image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
        className={`font-sans ${fontClass} min-h-screen`}
      >
        <div className="backface-hidden relative w-full">
          <div id="FONTS" className={fonts[page?.font_name] || ''}>
            {sectionsWSecType.map((section) => (
              <ReturnSection
                key={section?.id}
                section={section}
                content={section?.definition}
                colors={[
                  page.primary,
                  page.secondary,
                  page.tertiary,
                  page.quaternary,
                  page.bg_color,
                  page.foreground_color,
                ]}
                theme={section?.sec_type.folder_name}
                component_name={section?.sec_type.component_name}
                site={page}
              />
            ))}
          </div>
        </div>
        {page?.show_jot_branding && (
          <PoweredByJot page={page} color={page.font_color} />
        )}
        {/* Button to contact owner */}
        {pet.lost && (
          <button
            onClick={handleContactOwner}
            className="fixed bottom-6 right-6 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg hover:bg-blue-700"
          >
            Contact Owner
          </button>
        )}
        {/* Controlled components */}
        <GeoLocationConsent
          open={showGeoConsent}
          setOpen={setShowGeoConsent}
          onDecision={handleGeoConsent}
        />
        {/* contact Modal */}
        <ContactModal
          open={showContactModal}
          setOpen={setShowContactModal}
          contactInfo={{
            name: pet?.owner_name,
            phone: pet?.owner_phone,
            email: pet?.owner_email,
          }}
        />
        <a
          href="https://jot.space/pets"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="py-8 text-center">BoopTag Powered by Jot.space</div>
        </a>

        <EditBoopButton petOwner={userData?.id === pet?.user_id} />
      </div>
    </>
  )
}
