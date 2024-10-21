import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import {
	EnumOrderStatus,
	IOrder,
	IPaymentResponse
} from '@/shared/types/order.interface'

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
	}[]
	phone: string
	address: string
	comment?: string
}

class OrderService {
	async getById(id: string) {
		return axiosWithAuth<IOrder[]>({
			url: API_URL.orders(`/${id}`),
			method: 'GET'
		})
	}

	async place(data: TypeData) {
		return axiosWithAuth<IPaymentResponse>({
			url: API_URL.orders('/place'),
			method: 'POST',
			data
		})
	}

	async getAll() {
		return axiosWithAuth<IOrder[]>({
			url: API_URL.orders(),
			method: 'GET'
		})
	}

	async acceptOrder(orderId: string, managerId: string) {
		return axiosWithAuth({
			url: API_URL.orders(`/${orderId}/accept`),
			method: 'POST',
			data: { managerId }
		})
	}

	async closeOrder(orderId: string, managerId: string) {
		return axiosWithAuth({
			url: API_URL.orders(`/${orderId}/close`),
			method: 'POST',
			data: { managerId }
		})
	}
}

export const orderService = new OrderService()
