export const toCamelCase = (value) => {
	if (!value) {
		return ''
	}
	return value[0].toUpperCase() + value.substring(1)
}