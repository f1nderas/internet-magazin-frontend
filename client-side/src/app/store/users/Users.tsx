'use client'

import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { useGetUsers } from '@/hooks/queries/users/useGetUsers'

import styles from '../Store.module.scss'

import { IUserColumn, userColumns } from './UserColumns'

export function Users() {
	const { users, isLoading } = useGetUsers()

	const formattedReviews: IUserColumn[] = users
		? users.map(user => ({
				id: user.id,
				picture: user.picture,
				name: user.name,
				email: user.email,
				role: user.role
			}))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Пользователи (${users?.length})`}
							description='Все пользователи в вашем магазине'
						/>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={userColumns}
							data={formattedReviews}
							filterKey='email'
						/>
					</div>
				</>
			)}
		</div>
	)
}
