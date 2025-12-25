import {
  UserIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'

const steps = [
  {
    id: 1,
    title: 'Set up Your Profile',
    description:
      'Personalize the look of your digital business card. Add all of your contact information.',
    icon: <UserIcon className="h-9 w-9 text-blue-500" />,
  },
  {
    id: 2,
    title: 'Activate Your Device',
    description:
      'Setting up your dot.device is made simple so you can get to connecting faster than ever before.',
    icon: <DevicePhoneMobileIcon className="h-9 w-9 text-green-500" />,
  },
  {
    id: 3,
    title: 'Ready to Network',
    description:
      "With a single tap you'll be able to transfer your dot.Profile and begin connecting with style.",
    icon: <CheckCircleIcon className="h-9 w-9 text-purple-500" />,
  },
]

export function DigitalCardSteps() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 px-4 md:grid-cols-3 md:px-0">
        {steps.map((step) => (
          <div
            key={step.id}
            className="rounded-xl bg-white p-6 text-center shadow-lg"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {step.title}
            </h3>
            <p className="mt-2 text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
