const constructUrl = (url: string) => {
	if (process.env.REACT_APP_API_BASE) {
		return `${process.env.REACT_APP_API_BASE}${url}`
	}
	return url
}

export const get = async <K> (url: string, headers?: object) => {
	try {
		const response = await fetch(constructUrl(url), {
			method: 'get',
			headers: { "Content-Type": "application/json", ...headers }
		})
		return await response.json() as K
	} catch (e) {
		throw new Error(e)
	}
}

export const post = async <K> (url: string, data: Object, headers?: any) => {
	try {
		console.log(constructUrl(url))
		const response = await fetch('http://localhost:3000/api/login', {
			method: 'post',
			headers: { "Content-Type": "application/json", ...headers },
			body: JSON.stringify(data)
		})

		return await response.json() as K
	} catch (e) {
		throw new Error(e)
	}
}
