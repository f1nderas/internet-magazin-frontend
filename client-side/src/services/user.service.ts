import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IUser, UserRole } from '@/shared/types/user.interface'

class UserService {
	async getAll() {
		const { data } = await axiosWithAuth<IUser[]>({
			url: API_URL.users(),
			method: 'GET'
		})

		return data
	}
	async getProfile() {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'GET'
		})

		return data
	}

	async toggleFavorite(productId: string) {
		return axiosWithAuth<IUser>({
			url: API_URL.users(`/profile/favorites/${productId}`),
			method: 'PATCH'
		})
	}

	async assignRole(userId: string, role: UserRole) {
		const currentUser = await this.getProfile()

		if (currentUser.id === userId) {
			throw new Error('Вы не можете изменить свою роль')
		}

		const roleHierarchy: Record<UserRole, number> = {
			[UserRole.USER]: 1,
			[UserRole.MANAGER]: 2,
			[UserRole.ADMIN]: 3,
			[UserRole.CREATOR]: 4
		}

		if (roleHierarchy[currentUser.role] <= roleHierarchy[role]) {
			throw new Error('Вы не можете изменять роль этого пользователя')
		}
		return axiosWithAuth({
			url: API_URL.users(`/${userId}/role`),
			method: 'PATCH',
			data: { role }
		})
	}
}

export const userService = new UserService()
