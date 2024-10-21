'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
	ArrowUpDown,
	ExternalLink,
	MoreHorizontal,
	Pencil,
	Trash
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'

import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { userService } from '@/services/user.service'

import { UserRole } from '@/shared/types/user.interface'

export interface IUserColumn {
	id: string
	picture: string
	name: string
	email: string
	role: string
}

export const userColumns: ColumnDef<IUserColumn>[] = [
	{
		accessorKey: 'picture',
		header: 'Фотография',
		cell: ({ row }) => (
			<div className='flex items-center  '>
				{row.original.picture ? (
					<Image
						src={row.original.picture}
						alt={row.original.name}
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
		accessorKey: 'name',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === 'asc')
				}
			>
				Имя
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		)
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === 'asc')
				}
			>
				Email
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		)
	},
	{
		accessorKey: 'role',
		header: 'Роль',
		cell: ({ row }) => {
			const [role, setRole] = useState(row.original.role)
			const [currentUserRole, setCurrentUserRole] =
				useState<UserRole | null>(null)

			useEffect(() => {
				const fetchProfile = async () => {
					try {
						const profile = await userService.getProfile()
						setCurrentUserRole(profile.role)
					} catch (error: any) {
						toast.error(
							`Ошибка получения профиля: ${error.message}`
						)
					}
				}

				fetchProfile()
			}, [])

			const handleChangeRole = async (newRole: UserRole) => {
				try {
					await userService.assignRole(row.original.id, newRole)
					setRole(newRole)
					toast.success(`Роль пользователя изменена на ${newRole}`)
				} catch (error: any) {
					toast.error(`Ошибка изменения роли: ${error.message}`)
				}
			}
			const roleHierarchy: Record<UserRole, number> = {
				[UserRole.USER]: 1,
				[UserRole.MANAGER]: 2,
				[UserRole.ADMIN]: 3,
				[UserRole.CREATOR]: 4
			}

			const isChangeable = () => {
				if (!currentUserRole) return false
				const targetRole = row.original.role as UserRole
				return (
					currentUserRole !== targetRole &&
					roleHierarchy[currentUserRole] > roleHierarchy[targetRole]
				)
			}

			const getAvailableRoles = () => {
				if (!currentUserRole) return []
				return Object.values(UserRole).filter(
					roleOption =>
						roleHierarchy[currentUserRole] >
						roleHierarchy[roleOption]
				)
			}

			return (
				<div>
					{role}
					{isChangeable() && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost'>Изменить роль</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									Выберите новую роль
								</DropdownMenuLabel>
								{getAvailableRoles().map(roleOption => (
									<DropdownMenuItem
										key={roleOption}
										onClick={() =>
											handleChangeRole(roleOption)
										}
									>
										{roleOption}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			)
		}
	}
]
