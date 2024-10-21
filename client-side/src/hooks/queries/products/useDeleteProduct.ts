import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { productService } from '@/services/product.service'

export const useDeleteProduct = () => {
	const params = useParams<{ productId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: () => productService.delete(params.productId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products']
			})
			toast.success('Товар удалён')
			router.push(STORE_URL.products())
		},
		onError() {
			toast.error('Ошибка при удалении товара')
		}
	})

	return useMemo(
		() => ({ deleteProduct, isLoadingDelete }),
		[deleteProduct, isLoadingDelete]
	)
}
