import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth | Command Manager',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900">
      {children}
    </div>
  )
}
