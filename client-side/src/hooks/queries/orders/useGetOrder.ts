import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { orderService } from '@/services/order.service'

export const useGetOrder = (orderId: string) => {
	const { data: order, isLoading } = useQuery({
		queryKey: ['get order'],
		queryFn: () => orderService.getById(orderId)
	})

	return useMemo(
		() => ({
			order,
			isLoading
		}),
		[order, isLoading]
	)
}
