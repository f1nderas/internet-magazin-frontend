import { useQuery } from '@tanstack/react-query'

import { storeService } from '@/services/store.service'

export function useStore() {
	const { data: store, isLoading } = useQuery({
		queryKey: ['store'],
		queryFn: () => storeService.get()
	})

	return { store, isLoading }
}
