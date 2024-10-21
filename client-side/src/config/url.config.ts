export const APP_URL = process.env.APP_URL as string

const createURL = (base: string, path: string = '') => `${base}${path}`

export const PUBLIC_URL = {
	root: () => createURL(''),
	home: () => createURL('/', ''),
	auth: () => createURL('/auth'),
	explorer: (query = '') => createURL(`/explorer`, query),

	usShops: () => createURL('/us-shops'),
	aboutUs: () => createURL('/about-us'),
	products: () => createURL(`/products`),
	product: (id = '') => createURL(`/products/`, id),
	categories: () => createURL(`/categories`),
	category: (id = '') => createURL(`/categories/`, id)
}

export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard${url ? url : ''}`,
	home: () => DASHBOARD_URL.root('/'),
	favorites: () => DASHBOARD_URL.root('/favorites'),
	checkout: () => DASHBOARD_URL.root('/checkout')
}

export const STORE_URL = {
	root: (url = '') => `/store${url ? url : ''}`,

	home: () => STORE_URL.root(``),

	statistics: () => STORE_URL.root(`/statistics`),

	orders: () => STORE_URL.root(`/orders`),
	orderInfo: (id = '') => STORE_URL.root(`/orders/${id}`),

	products: () => STORE_URL.root(`/products`),
	productCreate: () => STORE_URL.root(`/products/create`),
	productEdit: (id = '') => STORE_URL.root(`/products/${id}`),

	categories: () => STORE_URL.root(`/categories`),
	categoryCreate: () => STORE_URL.root(`/categories/create`),
	categoryEdit: (id = '') => STORE_URL.root(`/categories/${id}`),

	users: () => STORE_URL.root(`/users`),
	userEdit: (id = '') => STORE_URL.root(`/users/${id}`),

	reviews: () => STORE_URL.root(`/reviews`),

	settings: () => STORE_URL.root(`/settings`)
}
