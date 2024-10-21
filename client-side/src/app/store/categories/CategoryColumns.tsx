'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import Image from 'next/image'
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

export interface ICategoryColumn {
	id: string
	createdAt: string
	title: string
	picture: string
}

export const categoryColumns: ColumnDef<ICategoryColumn>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Название
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
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
		accessorKey: 'picture',
		header: () => {
			return <Button variant='ghost'>Картинка</Button>
		},
		cell: ({ row }) => (
			<div className='flex items-center '>
				{row.original.picture ? (
					<Image
						src={row.original.picture}
						alt={row.original.title}
						width={50}
						height={50}
						className='rounded-md'
					/>
				) : (
					<span>Нет изображения</span>
				)}
			</div>
		)
	},
	{
		accessorKey: 'actions',
		header: 'Действия',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Действия</DropdownMenuLabel>
					<Link
						href={PUBLIC_URL.category(row.original.id)}
						target='_blank'
					>
						<DropdownMenuItem>
							<ExternalLink className='size-4 mr-2' />
							Страница с категорией
						</DropdownMenuItem>
					</Link>
					<Link href={STORE_URL.categoryEdit(row.original.id)}>
						<DropdownMenuItem>
							<Pencil className='size-4 mr-2' />
							Изменить
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
