import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { userService } from '@/services/user.service'

export const useCurrentUserRole = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['current user'],
		queryFn: () => userService.getProfile()
	})

	return {
		role: data?.role || null,
		isLoading,
		error
	}
}
