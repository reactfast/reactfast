import Footer1 from '@/components/footer_1'
import { Header } from '@/components/Header'

export default function HelpLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">{children}</div>
      <Footer1 />
    </div>
  )
}
