export function setItem(
	key: string,
	value: any,
	serialize = JSON.stringify
) {
	if (!key || value === null || value === undefined) {
		return
	} else {
		window.localStorage.setItem(key, serialize(value))
	}
}


export function getItem (key, deserialize = JSON.parse) {
	if (!key) {
		return
	} else {
		return deserialize(window.localStorage.getItem(key))
	}
}

export const isAuthenticated = () => {
	const token = getItem('token')
	return Boolean(token)
}
