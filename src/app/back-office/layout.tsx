import { Sidebar } from '@/components/sidebar/sidebar'
import { MobileHeader } from '@/components/header/mobile-header'

export default async function BackOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-zinc-900">
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <div className="h-full px-4 pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-4 lg:pt-6">
          {children}
        </div>
      </div>
    </div>
  )
}
