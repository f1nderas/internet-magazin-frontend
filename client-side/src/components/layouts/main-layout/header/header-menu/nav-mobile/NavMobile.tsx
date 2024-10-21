'use client'

import { Flower, Grid, Heart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/Button'

import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config'

import { HeaderCart } from '../header-cart/HeaderCart'

import styles from './NavMobile.module.scss'

const NavMobile = () => {
	const pathname = usePathname()
	const isActive = (path: string) => {
		return pathname.startsWith(path)
	}
	const getButtonVariant = (path: string) => {
		return isActive(path) ? 'outline' : 'ghost'
	}
	return (
		<div className={styles.wrapper}>
			<HeaderCart />
			<Link href={PUBLIC_URL.products()}>
				<Button variant={getButtonVariant(PUBLIC_URL.products())}>
					<Flower size={30} />
				</Button>
			</Link>
			<Link href={PUBLIC_URL.categories()}>
				<Button variant={getButtonVariant(PUBLIC_URL.categories())}>
					<Grid size={30} />
				</Button>
			</Link>
			<Link href={DASHBOARD_URL.favorites()}>
				<Button variant={getButtonVariant(DASHBOARD_URL.favorites())}>
					<Heart size={30} />
				</Button>
			</Link>
		</div>
	)
}

export default NavMobile
