export default function AccountPageHeader({ kicker, title, description }) {
  return (
    <>
      <div className="w-full bg-white px-8 py-8 text-black">
        <div id="kicker ">{kicker}</div>
        <h1 className="text-3xl font-thin tracking-wide lg:text-5xl xl:tracking-widest">
          {title}
        </h1>
        <p className="mt-2 text-lg font-light text-gray-500">{description}</p>
      </div>
    </>
  )
}
