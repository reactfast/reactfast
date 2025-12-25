export default function VCardPreview({ contact }) {
  const {
    firstName = '',
    lastName = '',
    title,
    organization,
    photo,
    birthday,
    email,
    workPhone,
    homeAddress,
    website,
  } = contact || {}

  const initials =
    firstName?.[0]?.toUpperCase() + (lastName?.[0]?.toUpperCase() || '')

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl">
      <div className="flex items-center space-x-4">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-2xl font-semibold text-gray-600">
          {photo ? (
            <img
              src={photo}
              alt="Contact"
              className="h-full w-full object-cover"
            />
          ) : (
            initials || 'N/A'
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {firstName || 'First'} {lastName || 'Last'}
          </h2>
          {title && <p className="text-sm text-gray-500">{title}</p>}
          {organization && (
            <p className="text-sm text-gray-500">{organization}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {email && (
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-gray-800">{email}</p>
          </div>
        )}
        {workPhone && (
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-gray-800">{workPhone}</p>
          </div>
        )}
        {birthday && (
          <div>
            <p className="text-sm font-medium text-gray-500">Birthday</p>
            <p className="text-gray-800">{birthday}</p>
          </div>
        )}
        {homeAddress && (
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-gray-800">{homeAddress}</p>
          </div>
        )}
        {website && (
          <div>
            <p className="text-sm font-medium text-gray-500">Website</p>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {website}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
