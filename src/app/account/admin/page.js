'use client'

import {
  WrenchIcon,
  QrCodeIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline'
import AppCard from './appCard'

const tools = [
  {
    title: 'CRMini',
    route: '/account/admin/crmini',
    tag: 'admin Tool',
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    description: 'Miniature bespoke jot owned CRM',
  },
  {
    title: 'Contact Submissions',
    route: '/account/admin/contact-submissions',
    tag: 'admin tool',
    icon: <DocumentTextIcon className="h-6 w-6" />,
    description: 'View contact form entries from your users.',
  },
  {
    title: 'Product Management',
    route: '#',
    tag: 'admin tool not working',
    icon: <RectangleStackIcon className="h-6 w-6" />,
    description: 'Manage and update product listings.',
  },
  {
    title: 'Sections Types',
    route: '/account/admin/section-types',
    tag: 'admin tool',
    icon: <WrenchIcon className="h-6 w-6" />,
    description: 'Define reusable content section types.',
  },
  {
    title: 'Sections Type Categories',
    route: '/account/admin/section-categories',
    tag: 'admin tool',
    icon: <WrenchIcon className="h-6 w-6" />,
    description: 'Manage groups of section types for layout logic.',
  },
  {
    title: 'Jot Devices',
    route: '/account/admin/qr',
    tag: 'admin tool',
    icon: <QrCodeIcon className="h-6 w-6" />,
    description: 'Generate generic QR codes for various data.',
  },
]

const testTools = [
  {
    title: 'QR Code Reader',
    route: '/account/admin/qrcode-reader',
    tag: 'Feature Test',
    icon: <QrCodeIcon className="h-6 w-6" />,
    description: 'Scan QR codes via camera input.',
  },
  {
    title: 'Create Message QR',
    route: '/account/admin/create-message-qr',
    tag: 'Feature Test',
    icon: <QrCodeIcon className="h-6 w-6" />,
    description: 'Generate a QR that embeds a text message.',
  },
  {
    title: 'Create vCard QR',
    route: '/account/admin/create-vcard-qr',
    tag: 'Feature Test',
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    description: 'Create a QR code for contact info (vCard).',
  },
  {
    title: 'Create Wifi QR',
    route: '/account/admin/create-wifi-qr',
    tag: 'Feature Test',
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    description: 'Generate a QR code to auto-join a Wi-Fi network.',
  },
  {
    title: 'html to pdf',
    route: '/account/admin/html-to-pdf',
    tag: 'Feature Test',
    icon: <DocumentTextIcon className="h-6 w-6" />,
    description: 'Test converting HTML pages into downloadable PDFs.',
  },
  {
    title: 'Geo Location',
    route: '/account/admin/geolocation',
    tag: 'Feature Test',
    icon: <GlobeAltIcon className="h-6 w-6" />,
    description: 'Fetch and display real-time geo-location data.',
  },
  {
    title: 'Test Print',
    route: '/account/admin/test-print',
    tag: 'Feature Test',
    icon: <DocumentTextIcon className="h-6 w-6" />,
    description: 'Try printing test formats with layout markers.',
  },
  {
    title: 'Business Card V2',
    route: '/account/admin/business-card-v2',
    tag: 'Testing',
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    description: 'Prototype version of updated business card layout.',
  },
  {
    title: 'Business Card V2',
    route: '/account/admin/test-modifiers',
    tag: 'Testing',
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    description: 'testing dynamic forms modifiers. triggers and targets',
  },
]

export default function AdminComponentSitemap() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Admin Tools</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <AppCard key={index} {...tool} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-600">
          Experimental / Testing
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testTools.map((tool, index) => (
            <AppCard key={index} {...tool} variant="testing" />
          ))}
        </div>
      </section>
    </div>
  )
}
