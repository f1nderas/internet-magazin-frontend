import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { productService } from '@/services/product.service'

export const useToggleProductVisibility = () => {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()

	const { mutate: toggleVisibility, isPending: isLoadingToggle } =
		useMutation({
			mutationKey: ['toggle product visibility'],
			mutationFn: ({
				productId,
				isVisible
			}: {
				productId: string
				isVisible: boolean
			}) => productService.toggleVisibility(productId, isVisible),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['get products']
				})
				toast.success('Видимость товара изменена')
			},
			onError() {
				toast.error('Ошибка при изменении видимости товара')
			}
		})

	return useMemo(
		() => ({ toggleVisibility, isLoadingToggle }),
		[toggleVisibility, isLoadingToggle]
	)
}
