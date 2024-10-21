import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { categoryService } from '@/services/category.service'
import { userService } from '@/services/user.service'

export const useGetUsers = () => {
	const { data: users, isLoading } = useQuery({
		queryKey: ['get users'],
		queryFn: () => userService.getAll()
	})

	return useMemo(
		() => ({
			users,
			isLoading
		}),
		[users, isLoading]
	)
}
