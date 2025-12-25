import Image from 'next/image'

export default function BannerWithProfile({ obj, color, id }) {
  return (
    <div id={id} className="relative w-full px-2">
      <div className="relative h-40 w-full overflow-hidden rounded-lg">
        <Image
          src={
            obj?.img ||
            'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/black_and_white_Valley_minimalistic_44c494ca-7d55-49a2-9424-d15e43ba6f47.webp'
          }
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
      </div>

      {/* Profile Image and User Name */}
      <div className="absolute bottom-[-30px] left-6 flex items-center">
        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <Image
            src={
              obj?.profileImage || 'https://via.placeholder.com/150' // fallback profile image
            }
            alt="Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {obj?.name && (
          <div className="ml-4 text-lg font-semibold text-white drop-shadow-md">
            {obj.name}
          </div>
        )}
      </div>
    </div>
  )
}
