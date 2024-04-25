import { NextResponse, NextRequest } from 'next/server'

import { cookies } from 'next/headers'


export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Specify your routes
    const publicRoutes = ['/auth/login', '/auth/signup']
    const isPublicRoute = publicRoutes.includes(pathname)

    // Check the token only for protected route
    const token = cookies().get('jwt')?.value

    console.log("[GET INTO IT YUHHHH]")
    if (!token) {
        // If there's no token and it's not a public route, redirect to login
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

   
    try {
        // Here, you'd check the validity of the token
        // Let's assume a function `validateToken` that does this for you

        const isVerifiedUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`, {
            method: 'POST', // or 'GET', depending on your API
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        console.log("YOU JUST WANNA PARTY")
        

        if (!isVerifiedUser.ok) {
            // If the token is not valid, redirect to login
            return NextResponse.redirect(new URL('/auth/login', req.url))

        }
        // If the token is valid, and the user is on a public route, redirect to root
        if (isPublicRoute) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    } catch (error) {
        // Handle any other errors, perhaps by logging them
        console.error('Error validating token', error)
        return new Response('Error', { status: 500 })
    }

    console.log("[GET INTO IT YUHHHH] 1234")


    // If none of the above conditions are met, just continue processing the request
    return NextResponse.next()
}


// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
