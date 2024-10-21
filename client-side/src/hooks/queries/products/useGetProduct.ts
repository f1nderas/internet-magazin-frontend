import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { productService } from '@/services/product.service'

import { IProduct } from '@/shared/types/product.interface'

export const useProduct = (productId: string) => {
	const { data: products, isLoading } = useQuery({
		queryKey: ['get product'],
		queryFn: () => productService.getById(productId)
	})

	return useMemo(
		() => ({
			products,
			isLoading
		}),
		[products, isLoading]
	)
}
