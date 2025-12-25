import { NextResponse } from 'next/server'

const CUSTOM_DOMAINS = {
  'lesismoredesigns.com': '/les-is-more/les-is-more',
}

export function middleware(request) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  const search = request.nextUrl.search || ''

  const customSlug = CUSTOM_DOMAINS[hostname]

  if (hostname.includes('jot.cards')) {
    return NextResponse.redirect(`https://jot.space${pathname}${search}`, 308)
  }

  if (customSlug) {
    const targetPath =
      pathname === '/' || pathname === ''
        ? `/sites/${customSlug}${search}`
        : `/sites/${customSlug}${pathname}${search}`

    // return NextResponse.rewrite(new URL(targetPath, request.url))
    return NextResponse.redirect(`https://jot.space/${targetPath}`, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
