export interface ICategory {
	id: string
	createdAt: string
	title: string
	description: string
	picture: string
}

export interface ICategoryInput
	extends Pick<ICategory, 'title' | 'description' | 'picture'> {}
