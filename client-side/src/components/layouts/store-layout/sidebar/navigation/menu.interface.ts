import { LucideIcon } from 'lucide-react'

import { UserRole } from '@/shared/types/user.interface'

export interface IMenuItem {
	icon: LucideIcon
	value: string
	link: string
	roles: UserRole[]
}
