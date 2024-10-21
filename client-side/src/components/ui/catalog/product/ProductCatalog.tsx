import Link from 'next/link'

import { ProductCard } from '../../card/product-card/ProductCard'
import styles from '../Catalog.module.scss'

import { IProductCatalog } from './productCatalog.interface'

export function ProductCatalog({
	title,
	description,
	linkTitle,
	link,
	products
}: IProductCatalog) {
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
					{products.length ? (
						products.map(product => (
							<ProductCard key={product.id} product={product} />
						))
					) : (
						<div>Нечего не найдено</div>
					)}
				</div>
			</div>
		</div>
	)
}
