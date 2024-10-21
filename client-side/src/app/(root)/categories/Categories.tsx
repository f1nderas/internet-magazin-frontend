'use client'

import { useQuery } from '@tanstack/react-query'

import { CategoryCatalog } from '@/components/ui/catalog/category/CategoryCatalog'

import { categoryService } from '@/services/category.service'

import { ICategory } from '@/shared/types/category.interface'

interface CategoryProps {
	categories: ICategory[]
}

export function Category({ categories }: CategoryProps) {
	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAll(),
		initialData: categories
	})

	return (
		<div className='my-6'>
			<CategoryCatalog title='Категории' categories={data} />
		</div>
	)
}
