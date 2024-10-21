import { ICategory } from '@/shared/types/category.interface'

import { ICatalog } from '../catalog.interface'

export interface ICategoryCatalog extends ICatalog {
	categories: ICategory[]
}
