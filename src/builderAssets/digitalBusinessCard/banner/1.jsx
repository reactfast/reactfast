import Image from 'next/image'

export default function Banner({ obj, color, id }) {
  return (
    <div id={id} className="relative mx-auto w-full max-w-7xl px-2">
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
    </div>
  )
}

export const def = [
  {
    name: 'img',
    type: 'string',
    title: 'Rounded Banner Image', // the title of the input field
    description: 'requires full URL path including https://', // description will be visible on the dynamic form field
  },
]
