import { type NextRequest, NextResponse } from 'next/server'

import { PUBLIC_URL } from './config/url.config'
import { EnumTokens } from './services/auth/auth-token.serice'
import { userService } from './services/user.service'
import { UserRole } from './shared/types/user.interface'

const allowedRoles = [UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR]

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = url.includes(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (refreshToken) {
			return NextResponse.redirect(
				new URL(PUBLIC_URL.home(), request.url)
			)
		}

		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/store/:path*', '/auth']
}
