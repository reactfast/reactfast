import Link from 'next/link'

export function NavLink({ href, children }) {
  return (
    <div className="rounded-lg shadow-sm shadow-black/0 transition-all duration-1000 ease-in hover:shadow-lg hover:shadow-black/10 last:hover:shadow-secondary/50">
      <Link
        href={href}
        className="inline-block rounded-lg px-2 py-1 text-sm uppercase tracking-wide text-slate-700 transition-colors duration-150 ease-out hover:bg-white hover:text-slate-900"
      >
        {children}
      </Link>
    </div>
  )
}
