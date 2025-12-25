import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

const announcement = {
  id: 'announcement-genericon-2023',
  title: 'GeneriCon 2023',
  content: 'Join us in Denver from June 7 – 9 to see what’s coming next',
  link: '#',
  linkText: 'Learn more',
}

export default function NewsBanner() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const dismissedAnnouncement = localStorage.getItem(announcement.id)

    if (!dismissedAnnouncement) {
      setDismissed(false)
    } else {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem(announcement.id, 'true')
  }

  if (dismissed) {
    return null
  }

  return (
    <div className="flex items-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm/6 text-white">
        <a href={announcement.link}>
          <strong className="font-semibold">{announcement.title}</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline size-0.5 fill-current"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          {announcement.content}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </p>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={handleDismiss}
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  )
}
