'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { CartItem } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/CartItem'
import { Card } from '@/components/ui/Card'

import { orderService } from '@/services/order.service'

import { ICartItem } from '@/shared/types/cart.interface'

import { formatPrice } from '@/utils/string/format-price'

export function OrderInfo() {
	const router = useRouter()
	const params = useParams<{ orderId: string }>()
	const { data } = useQuery({
		queryKey: ['get order'],
		queryFn: () => orderService.getById(params.orderId)
	})

	const order = data?.data

	return order ? (
		<div className='container mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>
				Детали заказа {order.id}
			</h1>
			<div className='bg-white shadow-md rounded-lg p-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<p className='font-semibold'>Адрес:</p>
						<p>{order.address}</p>
					</div>
					{order.comment && (
						<div>
							<p className='font-semibold'>Комментарий:</p>
							<p>{order.comment}</p>
						</div>
					)}
					<div>
						<p className='font-semibold'>Дата создания:</p>
						<p>{new Date(order.createdAt).toLocaleString()}</p>
					</div>
					<div>
						<p className='font-semibold'>Телефон:</p>
						<p>{order.phone}</p>
					</div>
					<div>
						<p className='font-semibold'>Статус:</p>
						<p>{order.status}</p>
					</div>
					<div>
						<p className='font-semibold'>Сумма заказа:</p>
						<p>{order.total} руб.</p>
					</div>
				</div>

				<div className='mt-6'>
					<h2 className='text-2xl font-semibold mb-4'>
						Пользователь
					</h2>
					<div className='bg-gray-50 p-4 rounded-lg shadow-inner'>
						<p>
							<span className='font-semibold'>Имя:</span>{' '}
							{order.user.name}
						</p>
						<p>
							<span className='font-semibold'>Email:</span>{' '}
							{order.user.email}
						</p>
					</div>
				</div>

				<div className='mt-6'>
					<h2 className='text-2xl font-semibold mb-4'>Товары</h2>
					<div className='space-y-4'>
						{order.items.map((item: ICartItem) => (
							<Card className='flex flex-col items-start space-y-4 p-4'>
								<div className='flex-grow'>
									<h3 className='text-lg font-medium'>
										{item.product?.title || 'Загрузка...'}
									</h3>
									<p className='text-muted-foreground'>
										{formatPrice(item.product.price)} *{' '}
										{item.quantity} шт
									</p>
								</div>

								{/* Описание товара */}
								{item.product?.description && (
									<div>
										<p className='font-semibold'>
											Описание:
										</p>
										<p>{item.product.description}</p>
									</div>
								)}

								{/* Категория товара */}
								{item.product?.categoryId && (
									<div>
										<p className='font-semibold'>
											ID категории:
										</p>
										<p>{item.product.categoryId}</p>
									</div>
								)}

								{/* Изображения товара */}
								{item.product?.images && (
									<div className='flex space-x-2'>
										{item.product.images.map(
											(imgSrc: string, idx: number) => (
												<Image
													key={idx}
													src={imgSrc}
													alt={`Изображение товара ${item.product?.title}`}
													width={100}
													height={100}
													className='rounded-lg'
												/>
											)
										)}
									</div>
								)}

								{/* Видимость товара */}
								<div>
									<p className='font-semibold'>
										Видимость товара:
									</p>
									<p>
										{item.product?.isVisible
											? 'Видимый'
											: 'Скрыт'}
									</p>
								</div>

								{/* Дата создания и обновления */}
								<div>
									<p className='font-semibold'>
										Дата создания:
									</p>
									<p>
										{new Date(
											item.product?.createdAt
										).toLocaleString()}
									</p>
								</div>
								<div>
									<p className='font-semibold'>
										Дата обновления:
									</p>
									<p>
										{new Date(
											item.product?.updatedAt
										).toLocaleString()}
									</p>
								</div>
							</Card>
						))}
					</div>
				</div>

				<button
					onClick={() => router.back()}
					className='mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition'
				>
					Вернуться назад
				</button>
			</div>
		</div>
	) : null
}
