'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useSocket } from '@/app/websocket.context'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'

import { STORE_URL } from '@/config/url.config'

import { orderService } from '@/services/order.service'
import { userService } from '@/services/user.service'

export interface IOrderColumn {
	id: string
	user: string
	phone: string
	total: string
	status: string
	createdAt: string
}

export const orderColumns: ColumnDef<IOrderColumn>[] = [
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Дата создания
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'user',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Имя
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Телефон
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Сумма
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: info => `${info.getValue()} руб.`
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Статус
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'processingStatus',
		header: 'Статус обработки',
		cell: ({ row }) => {
			const order = row.original
			const [processingStatus, setProcessingStatus] = useState(
				order.processingStatus
			)
			const [managerId, setManagerId] = useState(order.managerId)
			const [currentManagerId, setCurrentManagerId] = useState<
				string | null
			>(null)
			const socket = useSocket()

			// Логирование инициализации
			console.log('Order:', order)
			console.log('Initial Processing Status:', order.processingStatus)
			console.log('Initial Manager ID:', order.managerId)

			// Загружаем профиль текущего менеджера
			useEffect(() => {
				const fetchCurrentManager = async () => {
					try {
						const profile = await userService.getProfile()
						setCurrentManagerId(profile.id)
						console.log('Current Manager ID:', profile.id)
					} catch (error) {
						console.error(
							'Ошибка при получении профиля пользователя:',
							error
						)
					}
				}

				fetchCurrentManager()
			}, [])

			// Логирование сокетов
			useEffect(() => {
				if (socket) {
					console.log('Socket подключен')
					socket.on('orderUpdate', updatedOrder => {
						console.log('Обновленный заказ:', updatedOrder)
						if (updatedOrder.id === order.id) {
							setProcessingStatus(updatedOrder.processingStatus)
							setManagerId(updatedOrder.managerId)
							console.log(
								'Обновленный статус:',
								updatedOrder.processingStatus
							)
							console.log(
								'Обновленный менеджер:',
								updatedOrder.managerId
							)
						}
					})
				} else {
					console.log('Socket не подключен')
				}
			}, [socket, order.id])

			const handleAcceptOrder = async () => {
				try {
					console.log(
						'Принятие заказа. ID заказа:',
						order.id,
						'ID менеджера:',
						currentManagerId
					)
					await orderService.acceptOrder(order.id, currentManagerId)
					toast.success('Вы приняли заказ')
					console.log('Заказ принят')
				} catch (error) {
					console.error('Ошибка при принятии заказа:', error)
					toast.error('Ошибка при принятии заказа')
				}
			}

			const handleCloseOrder = async () => {
				try {
					console.log(
						'Закрытие заказа. ID заказа:',
						order.id,
						'ID менеджера:',
						currentManagerId
					)
					await orderService.closeOrder(order.id, currentManagerId)
					toast.success('Вы закрыли заказ')
					console.log('Заказ закрыт')
				} catch (error) {
					console.error('Ошибка при закрытии заказа:', error)
					toast.error('Ошибка при закрытии заказа')
				}
			}

			// Проверяем, кто принял заказ и отображаем статус
			if (!currentManagerId) {
				console.log('Загрузка профиля менеджера...')
				return <p>Загрузка...</p>
			}

			console.log('Processing Status:', processingStatus)
			console.log('Manager ID:', managerId)
			console.log('Current Manager ID:', currentManagerId)

			if (processingStatus === 'NOT_ACCEPTED') {
				return (
					<Button onClick={handleAcceptOrder} variant='outline'>
						Принять заказ
					</Button>
				)
			}

			if (
				processingStatus === 'ACCEPTED' &&
				managerId === currentManagerId
			) {
				return (
					<div>
						<p>Вы взяли заказ</p>
						<Button onClick={handleCloseOrder} variant='outline'>
							Закрыть заказ
						</Button>
					</div>
				)
			}

			if (
				processingStatus === 'ACCEPTED' &&
				managerId !== currentManagerId
			) {
				return <p>Заказ принят менеджером {managerId}</p>
			}

			if (processingStatus === 'CLOSED') {
				return <p>Заказ закрыт</p>
			}

			return null
		}
	},

	{
		accessorKey: 'actions',
		header: 'Действия',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Действия</DropdownMenuLabel>
					<Link href={STORE_URL.orderInfo(row.original.id)}>
						<DropdownMenuItem>
							<Pencil className='size-4 mr-2' />
							Подробнее
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
