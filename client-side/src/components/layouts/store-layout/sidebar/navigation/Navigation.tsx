'use client'

import {
	Album,
	BarChart,
	FolderKanban,
	ListOrdered,
	PaintBucket,
	Settings,
	Star,
	User
} from 'lucide-react'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { UserRole } from '@/shared/types/user.interface'

import { MenuItem } from './MenuItem'
import styles from './Navigation.module.scss'
import { IMenuItem } from './menu.interface'

export function Navigation() {
	const { user, isLoading } = useProfile()
	const routes: IMenuItem[] = [
		{
			icon: BarChart,
			link: STORE_URL.statistics(),
			value: 'Статистика',
			roles: [UserRole.ADMIN, UserRole.CREATOR]
		},
		{
			icon: ListOrdered,
			link: STORE_URL.orders(),
			value: 'Заказы',
			roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR]
		},
		{
			icon: FolderKanban,
			link: STORE_URL.products(),
			value: 'Товары',
			roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR]
		},
		{
			icon: Album,
			link: STORE_URL.categories(),
			value: 'Категории',
			roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR]
		},
		{
			icon: User,
			link: STORE_URL.users(),
			value: 'Пользователи',
			roles: [UserRole.ADMIN, UserRole.CREATOR]
		},
		{
			icon: Star,
			link: STORE_URL.reviews(),
			value: 'Отзывы',
			roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR]
		},
		{
			icon: Settings,
			link: STORE_URL.settings(),
			value: 'Настройки магазина',
			roles: [UserRole.CREATOR]
		}
	]

	if (!user?.role || user.role === UserRole.USER) return null

	const filteredRoutes = routes.filter(route =>
		route.roles.includes(user?.role)
	)

	return (
		<div className={styles.wrapper}>
			<div className={styles.navigation}>
				{filteredRoutes.map(route => (
					<MenuItem key={route.value} route={route} />
				))}
			</div>
		</div>
	)
}
