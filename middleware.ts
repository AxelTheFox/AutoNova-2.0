import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register' || path === '/';
    const token = request.cookies.get('next-auth.session-token')?.value; 
    if (!isPublicPath && !token) return NextResponse.redirect(new URL('/login', request.url));
    if (isPublicPath && token && path === '/login') return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
}

export const config = {
    matcher: ['/venta/:path*', '/login', '/profile/:path*']
};