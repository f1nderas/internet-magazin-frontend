import Image from 'next/image'

import { Card } from '@/components/ui/Card'

import { useGetOrderItems } from '@/hooks/queries/orderItems/useGetOrderItems'

import { ICartItem } from '@/shared/types/cart.interface'

import { formatPrice } from '@/utils/string/format-price'

export const OrderProductCard = ({ item }: { item: ICartItem }) => {
	const { orders, isLoading } = useGetOrderItems()

	return (
		<Card className='flex items-center space-x-4 p-4'>
			<Image
				src={orders.images[0]}
				alt={orders.title}
				width={100}
				height={100}
				className='rounded-md'
			/>
			<div className='flex-grow'>
				<h3 className='text-lg font-medium'>{orders.title}</h3>
				<p className='text-muted-foreground'>
					{formatPrice(orders.price)} x {item.quantity}
				</p>
			</div>
		</Card>
	)
}
