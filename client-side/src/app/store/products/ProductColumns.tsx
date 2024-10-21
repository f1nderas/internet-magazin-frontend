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
import { Checkbox } from '@/components/ui/Сheckbox'

import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { useToggleProductVisibility } from '@/hooks/queries/products/useToggleProductVisibility'

export interface IProductColumn {
	id: string
	title: string
	price: string
	category: string
	picture: string
	isVisible: boolean
}

export const productColumns: ColumnDef<IProductColumn>[] = [
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
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Цена
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Категория
					<ArrowUpDown className='ml-2 size-4' />
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
			<div className='flex items-center  '>
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
		accessorKey: 'isVisible',
		header: 'Видимость',
		cell: ({ row }) => {
			const { toggleVisibility, isLoadingToggle } =
				useToggleProductVisibility()

			const handleToggle = () => {
				toggleVisibility({
					productId: row.original.id, // Передаём ID продукта
					isVisible: !row.original.isVisible // Новое значение видимости
				})
			}
			return (
				<Checkbox
					onClick={handleToggle}
					checked={row.original.isVisible}
					disabled={isLoadingToggle}
				/>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: 'Действия',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Действия</DropdownMenuLabel>
					<Link
						href={PUBLIC_URL.product(row.original.id)}
						target='_blank'
					>
						<DropdownMenuItem>
							<ExternalLink className='size-4 mr-2' />
							Страница с продуктом
						</DropdownMenuItem>
					</Link>
					<Link href={STORE_URL.productEdit(row.original.id)}>
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
