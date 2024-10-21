import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import { ICategory } from '@/shared/types/category.interface'

import styles from './CategoryCard.module.scss'

interface CategoryCardProps {
	category: ICategory
}

export function CategoryCard({ category }: CategoryCardProps) {
	return (
		<div className={styles.card}>
			<Link href={PUBLIC_URL.category(category.id)}>
				<Image
					src={category.picture}
					alt={category.title}
					width={300}
					height={300}
				/>
			</Link>
			<h3 className={styles.title}>{category.title}</h3>
		</div>
	)
}
