export const setItem = (item, value) => localStorage.setItem(item, value)
export const getItem = (item) => localStorage.getItem(item)

export const isAuthenticated = () => {
	const token = localStorage.getItem('token')
	return Boolean(token)
}
