import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { OrderInfo } from './OrderInfo'

export const metadata: Metadata = {
	title: 'Информация о заказе',
	...NO_INDEX_PAGE
}

export default function OrderInfoPage() {
	return <OrderInfo />
}
