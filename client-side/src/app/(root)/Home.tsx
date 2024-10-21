import { CategoryCatalog } from '@/components/ui/catalog/category/CategoryCatalog'
import { ProductCatalog } from '@/components/ui/catalog/product/ProductCatalog'

import { PUBLIC_URL } from '@/config/url.config'

import { ICategory } from '@/shared/types/category.interface'
import { IProduct } from '@/shared/types/product.interface'

import { Hero } from './hero/Hero'

interface HomeProps {
	allCategories: ICategory[]
	allProducts: IProduct[]
	mostPopularProducts: IProduct[]
}

export function Home({
	allProducts,
	mostPopularProducts,
	allCategories
}: HomeProps) {
	return (
		<>
			{/* <Hero /> */}
			<CategoryCatalog
				title='Категории'
				description='Инетерсные категории'
				linkTitle='Показать все'
				link={PUBLIC_URL.category()}
				categories={allCategories}
			/>
			<ProductCatalog
				title='Товары'
				description='Инетерсные товары'
				linkTitle='Показать все'
				link={PUBLIC_URL.product()}
				products={allProducts}
			/>
			<ProductCatalog
				title='Хиты продаж'
				description='Самые популярные товары нашего магазина.'
				linkTitle='Показать все'
				link={PUBLIC_URL.product()}
				products={mostPopularProducts}
			/>
		</>
	)
}
