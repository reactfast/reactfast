import Image from 'next/image'

export default function UpcomingRelease({ release, user, id }) {
  const gradient = `linear-gradient(to bottom, #333333, ${user.color})`

  return (
    <>
      <div
        id={id}
        className="mt-8 p-4 text-center"
        style={{
          backgroundImage: gradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <h2 className="text-2xl font-extrabold">{release.sectionTitle}</h2>
        <div className="mt-2">
          <Image
            src={release.path}
            alt="Upcoming Release"
            width={200}
            height={200}
            className="mx-auto rounded-md shadow-lg"
          />
        </div>
        <p className="mt-2 text-xl font-semibold">{release.title}</p>
        <p className="text-lg font-medium">{release.date}</p>
        <p className="mt-2 text-base font-normal">{release.description}</p>
      </div>
    </>
  )
}
