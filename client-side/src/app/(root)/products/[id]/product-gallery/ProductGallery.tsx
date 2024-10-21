import Image from 'next/image'
import { useState } from 'react'

import { IProduct } from '@/shared/types/product.interface'

import { cn } from '@/utils/clsx'

import styles from './ProductGallery.module.scss'

interface ProductGalleryProps {
	product: IProduct
}

export function ProductGallery({ product }: ProductGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	return (
		<div>
			<div className={styles.imageContainer}>
				<Image
					src={product.images[currentIndex]}
					alt={product.title}
					width={500}
					height={500}
					className={styles.image}
				/>
				{!product.isVisible && (
					<div className={styles.overlay}>
						<span className={styles.overlayText}>
							Нет в наличии
						</span>
					</div>
				)}
			</div>
			<div className={styles.gallery}>
				{product.images.map((image, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={cn(
							styles.item,
							index === currentIndex
								? 'border-black'
								: 'border-transparent'
						)}
					>
						<Image
							src={image}
							alt={product.title}
							width={100}
							height={100}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
