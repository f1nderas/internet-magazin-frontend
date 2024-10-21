import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import { SERVER_URL } from '@/config/api.config'

import { orderService } from '@/services/order.service'

import { IOrder } from '@/shared/types/order.interface'

export const useGetOrders = () => {
	const [socketOrders, setSocketOrders] = useState<IOrder[]>([])

	// Реакт-квери для получения всех заказов
	const { data, isLoading } = useQuery({
		queryKey: ['get orders'],
		queryFn: () => orderService.getAll(),
		onSuccess: data => {
			setSocketOrders(data.data || [])
		}
	})

	// Подключаемся к сокетам
	useEffect(() => {
		const socketUrl = SERVER_URL // Используем URL из env
		const socket = io(socketUrl) // Подключаемся к серверу через сокет

		// Обработчик события обновления заказа
		socket.on('orderUpdate', (updatedOrder: IOrder) => {
			setSocketOrders(prevOrders => {
				// Находим индекс существующего заказа
				const existingOrderIndex = prevOrders.findIndex(
					order => order.id === updatedOrder.id
				)

				if (existingOrderIndex !== -1) {
					// Если заказ существует, обновляем его
					const newOrders = [...prevOrders]
					newOrders[existingOrderIndex] = updatedOrder
					return newOrders
				} else {
					// Если заказ новый, добавляем его к списку
					return [...prevOrders, updatedOrder]
				}
			})
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	// Возвращаем заказы: если есть заказы через WebSocket — их, иначе — данные из API
	return {
		orders: socketOrders.length > 0 ? socketOrders : data?.data || [],
		isLoading
	}
}
