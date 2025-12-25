import {
  QrCodeIcon,
  UserPlusIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
} from '@heroicons/react/20/solid'
import Slideshow from '@/components/slideshow' // Adjust path as needed

export const metadata = {
  title: 'Set Up Your Jot Device in Minutes',
  description:
    'Activate your Jot device quickly and easily. Just scan the QR code, log in, and connect your custom URL. Get started now!',
  openGraph: {
    title: 'Set Up Your Jot Device in Minutes',
    description:
      'Activate your Jot device quickly and easily. Just scan the QR code, log in, and connect your custom URL. Get started now!',
    url: 'https://yourdomain.com/setup',
    siteName: 'Jot',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/quickstart/QuickStartMetaImage.png',
        width: 1200,
        height: 630,
        alt: 'Set up your Jot device preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Set Up Your Jot Device in Minutes',
    description:
      'Activate your Jot device quickly and easily. Just scan the QR code, log in, and connect your custom URL. Get started now!',
    images: [
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/quickstart/QuickStartMetaImage.png',
    ],
  },
}

const features = [
  {
    name: 'Scan QR code',
    description:
      'A QR code can be found on all jot devices. Scan the QR code to begin the setup process.',
    icon: QrCodeIcon,
  },
  {
    name: 'Login or create an account',
    description:
      'If you already have an account, log in. If not, create a new account to continue.',
    icon: UserPlusIcon,
  },
  {
    name: 'Point your device to a URL',
    description:
      'Once logged in, you will be prompted to point your device to a URL. This URL will be used to connect your device to the internet.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Start using your device',
    description:
      'Once your device is connected, the next time you scan the QR code, it will redirect to the URL you assigned.',
    icon: CheckBadgeIcon,
  },
]

export default function DeviceSetupGuide() {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Device Setup</h1>
      <p className="text-gray-700">
        You're almost there! Follow these steps to activate your device and make
        it fully functional.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Getting Started</h2>

      <dl className="mt-6 space-y-6">
        {features.map((feature) => (
          <div key={feature.name} className="relative pl-10">
            <dt className="flex items-center font-semibold text-gray-900">
              <feature.icon
                aria-hidden="true"
                className="absolute left-0 top-1 h-6 w-6 text-indigo-600"
              />
              {feature.name}
            </dt>
            <dd className="mt-1 text-gray-700">{feature.description}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-10 text-2xl font-semibold">Device Preview</h2>
      <p className="mb-4 text-gray-600">
        Here's a preview of what your Jot device might look like during setup or
        activation.
      </p>

      <Slideshow />
    </div>
  )
}
