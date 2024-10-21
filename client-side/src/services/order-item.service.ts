import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IOrder } from '@/shared/types/order.interface'

class OrderItemService {
	async getOrderItemById(id: string) {
		return axiosWithAuth<IOrder[]>({
			url: API_URL.ordersItem(`/${id}`),
			method: 'GET'
		})
	}

	async getAllOrderItems() {
		return axiosWithAuth<IOrder[]>({
			url: API_URL.ordersItem(),
			method: 'GET'
		})
	}
}

export const orderItemService = new OrderItemService()
