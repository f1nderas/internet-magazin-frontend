import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Statistics } from './Statistics'

export const metadata: Metadata = {
	title: 'Статистика магазина',
	...NO_INDEX_PAGE
}

export default function StorePage() {
	return <Statistics />
}
