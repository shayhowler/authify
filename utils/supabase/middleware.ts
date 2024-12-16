import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Get the user from Supabase
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // If there's no user and the request is not for the home page, /auth/confirm, or any of the allowed paths, redirect to home
    if (
        !user &&
        request.nextUrl.pathname !== '/' &&
        request.nextUrl.pathname !== '/auth/confirm'
    ) {
        const url = request.nextUrl.clone()
        url.pathname = '/' // Redirect to the homepage if the user is not authenticated
        return NextResponse.redirect(url)
    }

    // Return the original response if the user is authenticated
    return supabaseResponse
}