import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { orderService } from '@/services/order.service'

import { IOrder } from '@/shared/types/order.interface'

export const useGetOrderItem = (orderId: string) => {
	const { data: order, isLoading } = useQuery({
		queryKey: ['get order item'],
		queryFn: () => orderService.getOrderItemById(orderId)
	})

	return useMemo(
		() => ({
			order,
			isLoading
		}),
		[order, isLoading]
	)
}
