'use client'

import { ProductCatalog } from '@/components/ui/catalog/product/ProductCatalog'

import { useProfile } from '@/hooks/useProfile'

export function Favorites() {
	const { user } = useProfile()

	if (!user) return null

	return (
		<div className='my-6'>
			<ProductCatalog title='Избранное' products={user.favorites} />
		</div>
	)
}
