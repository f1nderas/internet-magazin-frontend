import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { userService } from '@/services/user.service'

import { UserRole } from '@/shared/types/user.interface'

export const useAssignRole = () => {
	const queryClient = useQueryClient()

	const { mutate: assignRole, isPending: isLoading } = useMutation({
		mutationKey: ['assign role'],
		mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
			userService.assignRole(userId, role),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get users'] })
			toast.success('Роль успешно назначена')
		},
		onError() {
			toast.error('Ошибка при назначении роли')
		}
	})

	return { assignRole, isLoading }
}
