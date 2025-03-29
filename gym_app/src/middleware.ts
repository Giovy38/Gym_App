import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('connect.sid')
    const isAdminLoginPage = request.nextUrl.pathname === '/admin/login'
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin/')
    const isLogoutRequest = request.nextUrl.pathname.includes('/logout')

    // Se siamo nella pagina di login admin, permettiamo l'accesso
    if (isAdminLoginPage) {
        return NextResponse.next()
    }

    // Se è una richiesta di logout, permettiamo l'accesso
    if (isLogoutRequest) {
        return NextResponse.next()
    }

    // Se siamo in una route admin e non c'è il cookie di sessione, reindirizziamo al login
    if (isAdminRoute && !sessionCookie) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*'
} 