import Link from 'next/link'

import { CategoryCard } from '../../card/category-card/CategoryCard'
import styles from '../Catalog.module.scss'

import { ICategoryCatalog } from './categoryCatalog.interface'

export function CategoryCatalog({
	title,
	description,
	linkTitle,
	link,
	categories
}: ICategoryCatalog) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.info}>
					<h1>{title}</h1>
					{description && <p>{description}</p>}
				</div>
				{link && linkTitle && <Link href={link}>{linkTitle}</Link>}
			</div>

			<div className={styles.catalog}>
				<div className={styles.products}>
					{categories.length ? (
						categories.map(category => (
							<CategoryCard
								key={category.id}
								category={category}
							/>
						))
					) : (
						<div>Нечего не найдено</div>
					)}
				</div>
			</div>
		</div>
	)
}
