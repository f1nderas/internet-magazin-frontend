import type { Metadata } from 'next'

import Checkout from './Checkout'

export const metadata: Metadata = {
	title: 'Создание заказа'
}

export const revalidate = 60

export default async function CategoryPage() {
	return <Checkout />
}
