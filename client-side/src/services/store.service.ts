import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IStore, IStoreEdit } from '@/shared/types/store.interface'

class StoreService {
	async get() {
		const { data } = await axiosWithAuth<IStore>({
			url: API_URL.stores(),
			method: 'GET'
		})

		return data
	}

	async update(data: IStoreEdit) {
		const { data: updatedStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(),
			method: 'PUT',
			data
		})

		return updatedStore
	}
}

export const storeService = new StoreService()
