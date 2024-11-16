import { Sidebar } from '@/components/sidebar/sidebar'
import { MobileHeader } from '@/components/header/mobile-header'

export default async function BackOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen">
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <div className="h-full px-4 py-[50px] lg:py-0 lg:pl-[256px]">
        <div className="mx-auto h-full max-w-[1056px] py-4 lg:py-6">
          {children}
        </div>
      </div>
    </div>
  )
}
