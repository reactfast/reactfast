import { LinkIcon } from '@heroicons/react/24/outline'

export default function LittleLink({ icon, title, link }) {
  return (
    <>
      <a href={link} target="_blank">
        <div className="hover: relative m-4 items-center justify-center rounded rounded-lg bg-blue-400 px-4 px-6 py-2 py-4 text-center font-bold text-white shadow-md transition-shadow duration-700 before:absolute before:inset-0 before:rounded before:bg-blue-500 before:opacity-0 before:shadow-inner before:blur before:transition-opacity before:duration-700 hover:bg-blue-600 hover:shadow-lg before:hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {!icon ? (
            <LinkIcon className="inline-block h-6 w-6" />
          ) : (
            <img
              src="your_icon_image_url"
              alt="Icon"
              className="mx-auto mb-2 h-8 w-auto sm:mb-0 sm:mr-4"
            />
          )}
          <span className="pl-8">{title}</span>
        </div>
      </a>
    </>
  )
}
