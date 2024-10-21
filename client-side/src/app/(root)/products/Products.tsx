'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { ProductCatalog } from '@/components/ui/catalog/product/ProductCatalog'

import { productService } from '@/services/product.service'

import { IProduct } from '@/shared/types/product.interface'

interface ProductsProps {
	products: IProduct[]
}

export function Products({ products }: ProductsProps) {
	const searchParams = useSearchParams()
	const searchTerm = searchParams.get('searchTerm')

	const { data } = useQuery({
		queryKey: ['products', searchTerm],
		queryFn: () => productService.getAllForUser(searchTerm),
		initialData: products
	})

	return (
		<div className='my-6'>
			<ProductCatalog
				title={
					searchTerm ? `Поиск по запросу "${searchTerm}"` : 'Цветы'
				}
				products={data}
			/>
		</div>
	)
}
