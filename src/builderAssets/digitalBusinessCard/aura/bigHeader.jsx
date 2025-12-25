export default function BigHeader({ obj, colors }) {
  return (
    <>
      <div>
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl bg-black/70 p-6 text-center shadow-lg backdrop-blur-md">
            <img
              src={obj.profile_picture}
              alt="Profile Picture"
              className="mx-auto h-32 w-32 rounded-full border-4 border-white shadow-md"
            />

            <h1 className="mt-4 text-2xl font-bold">{obj.name}</h1>

            <p className="mt-2 text-sm text-gray-300">{obj.bio}</p>

            <div
              style={{ color: colors[0] }}
              className="mt-4 flex justify-center space-x-4"
            >
              <a
                href="#"
                className="text-sm transition-colors hover:text-blue-400"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm transition-colors hover:text-blue-400"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-sm transition-colors hover:text-blue-400"
              >
                GitHub
              </a>
            </div>

            <div className="mt-4 text-sm font-thin text-gray-300">
              <p>
                Phone: <span className="font-bold">{obj.primary_phone}</span>
              </p>
              <p>
                Email: <span className="font-bold">{obj.primary_email}</span>
              </p>
              <p>
                Address:{' '}
                <span className="font-bold">{obj.primary_address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const def = [
  {
    name: 'name',
    type: 'string',
    title: 'Name',
  },
  {
    name: 'bio',
    type: 'string',
    title: 'Bio',
  },
  {
    name: 'profile_picture',
    type: 'string',
    title: 'Profile Picture',
  },
  {
    name: 'primary_phone',
    type: 'string',
    title: 'Primary Phone',
  },
  {
    name: 'primary_email',
    type: 'string',
    title: 'Primary Email',
  },
  {
    name: 'primary_address',
    type: 'string',
    title: 'Primary Address',
  },
]
