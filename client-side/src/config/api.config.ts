export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	auth: (url = '') => API_URL.root(`/auth${url}`),
	users: (url = '') => API_URL.root(`/users${url}`),
	stores: (url = '') => API_URL.root(`/stores${url}`),
	productsUser: () => API_URL.root(`/products/user`),
	productsAdmin: () => API_URL.root(`/products/admin`),
	products: (url = '') => API_URL.root(`/products${url}`),
	categories: (url = '') => API_URL.root(`/categories${url}`),
	reviews: (url = '') => API_URL.root(`/reviews${url}`),
	ordersItem: (url = '') => API_URL.root(`/orders-item${url}`),
	orders: (url = '') => API_URL.root(`/orders${url}`),
	statistics: (url = '') => API_URL.root(`/statistics${url}`),
	files: (url = '') => API_URL.root(`/files${url}`)
}
