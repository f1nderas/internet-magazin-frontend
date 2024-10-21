import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import Head from 'next/head'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<Head>
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<body className={GeistSans.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
