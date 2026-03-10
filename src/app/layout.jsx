import { Inter, Roboto } from 'next/font/google'
import ClientWrapper from '@/components/clientWrapper'
import LayoutWrapper from './layoutWrapper'

import './global.css'
import '../styles/tailwind.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    template: 'Jot.Space - %s',
    default: 'Superior Networking Micro Website with Massive Potential',
  },
  description: 'jsljshljsh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth bg-white antialiased">
      <body
        className={`flex h-full flex-col ${roboto.variable} ${inter.variable}`}
      >
        <ClientWrapper>
          <LayoutWrapper />
          <main>{children}</main>
        </ClientWrapper>
      </body>
    </html>
  )
}
