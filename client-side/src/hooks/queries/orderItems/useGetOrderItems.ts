import { useQuery } from '@tanstack/react-query'

import { orderItemService } from '@/services/order-item.service'

export const useGetOrderItems = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get order items'],
		queryFn: () => orderItemService.getAllOrderItems()
	})

	return { orders: data?.data || [], isLoading }
}
