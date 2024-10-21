import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { ICartItem } from '@/shared/types/cart.interface'

import { cartSlice } from '@/store/cart/cart.slice'

import { formatPrice } from '@/utils/string/format-price'

import styles from '../HeaderCart.module.scss'

import { CartActions } from './CartActions'

interface CartItemProps {
	item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
	const dispatch = useDispatch()

	const handleRemove = () => {
		dispatch(cartSlice.actions.removeFromCart({ id: item.id }))
	}
	return (
		<div className={styles.item}>
			<Link
				href={PUBLIC_URL.product(item.product.id)}
				className={styles.image}
			>
				<Image
					src={item.product.images[0]}
					alt={item.product.title}
					fill
				/>
			</Link>
			<div className={styles.right}>
				<h2>{item.product.title}</h2>
				<p>{formatPrice(item.product.price)}</p>
				<CartActions item={item} />
				<Button onClick={handleRemove}>Удалить</Button>
			</div>
		</div>
	)
}
