import type { Metadata } from 'next'

import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'

import { Home } from './Home'

export const metadata: Metadata = {
	title: 'Главная'
}

export const revalidate = 60

async function getAllCategories() {
	const data = (await categoryService.getAll()).slice(0, 6)

	return data
}
async function getAllProducts() {
	const data = (await productService.getAllForUser()).slice(0, 6)

	return data
}

async function getMostPopular() {
	const data = (await productService.getMostPopular()).slice(0, 6)

	return data
}

export default async function HomePage() {
	const allProducts = await getAllProducts()
	const allCategories = await getAllCategories()
	const mostPopularProducts = await getMostPopular()

	return (
		<Home
			allCategories={allCategories}
			allProducts={allProducts}
			mostPopularProducts={mostPopularProducts}
		/>
	)
}
