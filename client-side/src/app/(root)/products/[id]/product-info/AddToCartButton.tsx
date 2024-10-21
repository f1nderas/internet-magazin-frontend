import toast from 'react-hot-toast'

import { Button } from '@/components/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/shared/types/product.interface'

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	const handleAddToCart = () => {
		if (currentElement) {
			removeFromCart({ id: currentElement.id })
			toast.success(`${product.title} удален из корзины`)
		} else {
			addToCart({
				product,
				quantity: 1,
				price: product.price
			})
			toast.success(`${product.title} добавлен в корзину`)
		}
	}

	return (
		<Button
			variant='primary'
			size='lg'
			className='w-full'
			onClick={handleAddToCart}
			disabled={!product.isVisible}
		>
			{currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
		</Button>
	)
}
