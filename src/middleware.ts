import { NextResponse } from 'next/server'
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { AUTH_ROUTES, DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth((req)=>{
  const url = req.nextUrl

  const isAuthRoute = AUTH_ROUTES.includes(url.pathname)
  const isAuthorized = !!req.auth;
  if(isAuthRoute && isAuthorized){
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.url))
  }
  
  const isPublicRoute = PUBLIC_ROUTES.includes(url.pathname)
  
  if(isPublicRoute){
    return NextResponse.next()
  }
  const searchParams = url.searchParams.toString()
  let hostname = req.headers
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`
  //if subdomain exists
  const customSubDomain = hostname
  .get('host')
  ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
  .filter(Boolean)[0]
  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    )
  }
  if (url.pathname === 'auth/sign-in' || url.pathname === 'auth/sign-up') {
    return NextResponse.next()
  }
  if (
    url.pathname === '/' ||
    (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL('/site', req.url))
  }

  if (
    url.pathname.startsWith('/agency') ||
    url.pathname.startsWith('/subaccount')
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
  }
})

// export default authMiddleware({
//   publicRoutes: ['/site', '/api/uploadthing'],
//   async beforeAuth(auth, req) {},
//   async afterAuth(auth, req) {
//     //rewrite for domains
    
//   },
// })

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
