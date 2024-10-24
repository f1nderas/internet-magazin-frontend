import { useQuery } from '@tanstack/react-query'

import { orderService } from '@/services/order.service'

export const useGetOrders = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get orders'],
		queryFn: () => orderService.getAll()
	})

	return { orders: data?.data || [], isLoading }
}
