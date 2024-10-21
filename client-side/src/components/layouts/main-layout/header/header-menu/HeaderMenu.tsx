'use client'

import { Flower, Grid, Heart, LogOut, Store } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { UserRole } from '@/shared/types/user.interface'

import styles from './HeaderMenu.module.scss'
import ContactInfoModal from './contact-info-modal/ContactInfoModal'
import { HeaderCart } from './header-cart/HeaderCart'

export function HeaderMenu() {
	const { user, isLoading } = useProfile()
	const pathname = usePathname()

	const isActive = (path: string) => {
		return pathname.startsWith(path)
	}

	const getButtonVariant = (path: string) => {
		return isActive(path) ? 'outline' : 'ghost'
	}

	const hasAccessToStore = (role: UserRole) => {
		return (
			role === UserRole.MANAGER ||
			role === UserRole.ADMIN ||
			role === UserRole.CREATOR
		)
	}

	return (
		<div className={styles.header_menu}>
			<ContactInfoModal />
			<div className='hidden lg:flex '>
				<HeaderCart />
				<Link href={PUBLIC_URL.products()}>
					<Button variant={getButtonVariant(PUBLIC_URL.products())}>
						<span>Цветы</span>
					</Button>
				</Link>
				<Link href={PUBLIC_URL.categories()}>
					<Button variant={getButtonVariant(PUBLIC_URL.categories())}>
						<span>Категории</span>
					</Button>
				</Link>
			</div>

			{isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<>
					<Link
						href={DASHBOARD_URL.favorites()}
						className='hidden lg:block'
					>
						<Button
							variant={getButtonVariant(
								DASHBOARD_URL.favorites()
							)}
						>
							<span>Избранное</span>
						</Button>
					</Link>
					{hasAccessToStore(user.role) && (
						<Link href={STORE_URL.orders()}>
							<Button variant='ghost'>
								<span className='hidden lg:block'>Магазин</span>

								<Store className='block lg:hidden' />
							</Button>
						</Link>
					)}
					<Link href={DASHBOARD_URL.home()}>
						<Image
							src={user.picture}
							alt={user.name}
							width={42}
							height={42}
							className={styles.avatar}
						/>
					</Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant='primary'>
						<LogOut className={styles.icon} size={30} />
						Войти
					</Button>
				</Link>
			)}
		</div>
	)
}
