import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from './hooks/get-auth'

export function middleware(request: NextRequest) {
  const { token } = getAuth()

  if (request.nextUrl.pathname === '/auth/login') {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
