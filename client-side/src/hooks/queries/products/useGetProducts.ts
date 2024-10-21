import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { productService } from '@/services/product.service'

export const useGetProducts = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: ['get products'],
		queryFn: () => productService.getAll()
	})

	return useMemo(
		() => ({
			products,
			isLoading
		}),
		[products, isLoading]
	)
}
