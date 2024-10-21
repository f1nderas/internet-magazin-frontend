import { IProduct } from '@/shared/types/product.interface'

import { ICatalog } from '../catalog.interface'

export interface IProductCatalog extends ICatalog {
	products: IProduct[]
}
