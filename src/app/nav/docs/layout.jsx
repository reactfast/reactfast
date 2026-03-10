import Navigation from './Navigation.jsx'

export default function layout({ children }) {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto grid max-w-7xl grid-cols-12">
        <div className="col-span-3 px-16 pt-16">
          <Navigation />
        </div>
        <div className="col-span-8 px-8 pt-10">{children}</div>
      </div>
    </div>
  )
}
