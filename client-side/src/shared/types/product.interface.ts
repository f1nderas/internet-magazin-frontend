import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IQuantity {
	id: string
	amount: number
	price: number
}
export interface IProduct {
	id: string
	title: string
	description: string
	price: number
	images: string[]
	category: ICategory
	reviews: IReview[]
	isVisible: boolean
}

export interface IProductInput
	extends Omit<IProduct, 'id' | 'reviews' | 'category'> {
	categoryId: string
}
