export interface IStore {
	id: string
	title: string
	description: string
	deliveryPrice: number
	minOrderPrice: number
}

export interface IStoreEdit extends Omit<IStore, 'id'> {}
