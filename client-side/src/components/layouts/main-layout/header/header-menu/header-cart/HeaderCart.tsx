import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'

import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config'

import { useStore } from '@/hooks/queries/stores/useStore'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { formatPrice } from '@/utils/string/format-price'

import styles from './HeaderCart.module.scss'
import { CartItem } from './cart-item/CartItem'

export function HeaderCart() {
	const router = useRouter()

	const { user } = useProfile()

	const { items, total } = useCart()

	const [open, setOpen] = useState(false)

	const { store } = useStore()

	const handleClick = () => {
		if (user) {
			router.push(DASHBOARD_URL.checkout())
		} else {
			router.push(PUBLIC_URL.auth())
		}
		setOpen(false)
	}

	const deliveryPrice = store?.deliveryPrice || 300
	const minOrderPrice = store?.minOrderPrice || 1000

	const totalWithDelivery = total + deliveryPrice

	const isBelowMinOrder = total <= minOrderPrice

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant='ghost'>
					<span className='hidden lg:block'>Корзина</span>
					<ShoppingCart className='block lg:hidden' size={30} />
				</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<Heading title='Корзина товаров' className='text-xl' />
				<div className={styles.items}>
					{items.length ? (
						items.map(item => (
							<CartItem item={item} key={item.id} />
						))
					) : (
						<div className={styles.not_found}>Корзина пустая!</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.info}>
							<div className={styles.total}>
								<span>Цена за товары</span>
								<span className='flex-grow border-b border-dotted mx-2'></span>
								{formatPrice(total)}
							</div>
							{isBelowMinOrder && (
								<div className={styles.warning}>
									<span>Минимальная сумма заказа:</span>
									{formatPrice(minOrderPrice)}
								</div>
							)}

							<div className={styles.total}>
								<span>Цена за доставку</span>
								<span className='flex-grow border-b border-dotted mx-2'></span>
								<span>{formatPrice(deliveryPrice)}</span>
							</div>

							<div className={styles.total}>
								<span>Итого</span>
								<span className='flex-grow border-b border-dotted mx-2'></span>
								{formatPrice(totalWithDelivery)}
							</div>

							<Button
								onClick={handleClick}
								variant='primary'
								disabled={isBelowMinOrder}
							>
								Продолжить
							</Button>
						</div>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}
