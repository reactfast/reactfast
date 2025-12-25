import Image from 'next/image'

export default function Banner({ obj, color, id }) {
  return (
    <div id={id} className="relative w-full px-2">
      <div className="relative h-40 w-full overflow-hidden rounded-lg">
        <Image
          src={
            obj.img ||
            'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/black_and_white_Valley_minimalistic_44c494ca-7d55-49a2-9424-d15e43ba6f47.webp'
          }
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
      </div>
      <div className="absolute bottom-[-40px] left-4">
        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white">
          <Image
            src={
              obj.profileImg ||
              'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/black_and_white_Valley_minimalistic_44c494ca-7d55-49a2-9424-d15e43ba6f47.webp'
            }
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

const form = [
  {
    name: 'img',
    type: 'string',
    title: 'Rounded Banner Image', // the title of the input field
    description: 'requires full URL path including https://', // description will be visible on the dynamic form field
  },
  {
    name: 'profileImg',
    type: 'string',
    title: 'Profile Image', // the title of the input field
    description: 'requires full URL path including https://', // description will be visible on the dynamic form field
  },
]
