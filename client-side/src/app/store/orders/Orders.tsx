'use client'

import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { useGetOrderItems } from '@/hooks/queries/orderItems/useGetOrderItems'
import { useGetOrders } from '@/hooks/queries/orders/useGetOrders'

import { formatDate } from '@/utils/date/format-date'

import styles from '../Store.module.scss'

import { IOrderColumn, orderColumns } from './OrderColumns'

export function Orders() {
	const { orders, isLoading } = useGetOrders()
	console.log(orders)

	const formattedOrders: IOrderColumn[] = orders
		? orders.map(order => ({
				id: order.id,
				user: order.user ? order.user.name : 'Неизвестный пользователь',
				phone: order.phone,
				total: order.total,
				status: order.status,
				createdAt: formatDate(order.createdAt)
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
							title={`Заказы (${orders?.length})`}
							description='Все заказы в вашем магазине'
						/>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={orderColumns}
							data={formattedOrders}
							filterKey='phone'
						/>
					</div>
				</>
			)}
		</div>
	)
}
