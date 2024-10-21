import type { Metadata } from 'next'

import { categoryService } from '@/services/category.service'

import { Category } from './Categories'

export const metadata: Metadata = {
	title: 'Категории'
}

export const revalidate = 60

async function getCategories() {
	const data = await categoryService.getAll()

	return data
}

export default async function CategoryPage() {
	const data = await getCategories()

	return <Category categories={data} />
}
