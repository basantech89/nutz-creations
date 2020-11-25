const constructUrl = (url: string) => {
	if (process.env.NEXT_PUBLIC_API_BASE) {
		return `${process.env.NEXT_PUBLIC_API_BASE}${url}`
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
		const response = await fetch(constructUrl(url), {
			method: 'post',
			headers: { "Content-Type": "application/json", ...headers },
			body: JSON.stringify(data)
		})

		return await response.json() as K
	} catch (e) {
		throw new Error(e)
	}
}
