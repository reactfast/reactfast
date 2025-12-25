'use client'
import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import QRCodeCanvas from '../qrv2'

const page = [
  { bg: '', foreground_color: '#ffffff', qrColor: '#000000' },
  { bg: '', foreground_color: '#ffffff', qrColor: '#000000' },
  { bg: '', foreground_color: '#ffffff', qrColor: '#000000' },
]

export default function CustomizationFeature() {
  const router = useRouter()

  return (
    <section className="px-6 py-16">
      <div className="mx-auto mt-32 flex max-w-6xl flex-col items-center gap-12 md:flex-row">
        {/* Left: Phone Image */}
        <div className="relative flex w-full justify-center md:w-1/2">
          <div className="relative h-[600px] w-[300px] overflow-hidden rounded-3xl bg-gray-900 shadow-lg">
            {/* QR Code Overlay */}
            <div className="flex h-full flex-col items-center justify-center">
              {' '}
              <div
                style={{ backgroundColor: page.foreground_color }}
                className="flex items-center justify-center rounded-lg bg-red-800 p-2 shadow-lg"
              >
                <QRCodeCanvas
                  bgColor={page.foreground_color}
                  qrColor={'#000000'}
                  url={'https://jot.space/'}
                  logoImage="/_next/static/media/Logo.cfb6d066.svg"
                  size={230}
                  dotType="rounded"
                />
              </div>
              {/* url,
                  bgColor = '#ffffff',
                  qrColor = '#000000',
                  logoImage = '',
                  dotType = 'rounded', // Additional customization
                  fileType = 'jpeg', // Options: 'jpeg', 'png', 'svg'
                  size = 300, */}
              {/* QR Code */}
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-900">
            Build Your Digital Business Card in{' '}
            <span className="text-primary">Minutes</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Our easy-to-use builder empowers you to create a{' '}
            <span className="font-bold">branded, stylish, and unique</span>{' '}
            business card landing page that{' '}
            <span className="font-bold">stands out</span>. With
            <span className="font-bold">more customization</span> than Linktree,
            you can express your personality while making professional
            connections.
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center">
              <CheckCircleIcon className="mr-2 h-6 w-6 text-secondary" />
              Live updates, no waiting – changes appear instantly.
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="mr-2 h-6 w-6 text-secondary" />
              Fully customizable design that reflects your brand.
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="mr-2 h-6 w-6 text-secondary" />
              Setup takes <span className="font-bold"> just 2 minutes</span> –
              start sharing your info fast!
            </li>
          </ul>
          <button
            onClick={() => router.push('https://jot.space/account')}
            className="mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Create Your Page Now
          </button>
        </div>
      </div>
    </section>
  )
}
