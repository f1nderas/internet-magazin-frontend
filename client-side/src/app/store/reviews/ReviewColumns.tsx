'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
	ArrowUpDown,
	ExternalLink,
	MoreHorizontal,
	Pencil,
	Trash
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'

import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReview'

export interface IReviewColumn {
	id: string
	createdAt: string
	rating: string
	username: string
	productId?: string
}

export const reviewColumns: ColumnDef<IReviewColumn>[] = [
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Дата создания
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'rating',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Рейтинг
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'username',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Пользователь
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: 'Действия',
		cell: ({ row }) => {
			const { deleteReview } = useDeleteReview()
			const productId = row.original.productId

			const handleDelete = () => {
				deleteReview(row.original.id)
			}

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='size-8 p-0'>
							<MoreHorizontal className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Действия</DropdownMenuLabel>
						{productId && (
							<Link href={PUBLIC_URL.product(productId)}>
								<DropdownMenuItem>
									<ExternalLink className='size-4 mr-2' />
									Страница с продуктом
								</DropdownMenuItem>
							</Link>
						)}
						<DropdownMenuItem onClick={handleDelete}>
							<Trash className='size-4 mr-2' />
							Удалить
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
