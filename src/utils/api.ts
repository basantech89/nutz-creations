import store from '../store'
import {
  statusPending,
  statusRejected,
  statusResolved
} from '../store/state/common'

const constructUrl = (url: string) => {
  if (process.env.NEXT_PUBLIC_API_BASE) {
    return `${process.env.NEXT_PUBLIC_API_BASE}${url}`
  }
  return url
}

export const get = async <K>(url: string, headers?: object) => {
  try {
    store.dispatch(statusPending())
    const response = await fetch(constructUrl(url), {
      method: 'get',
      headers: { 'Content-Type': 'application/json', ...headers }
    })
    store.dispatch(statusResolved())
    const data = await response.json()
    return data as K
  } catch (e) {
    store.dispatch(statusRejected(e))
  }
}

export const post = async <K>(url: string, data: Object, headers?: any) => {
  try {
    store.dispatch(statusPending())
    const response = await fetch(constructUrl(url), {
      method: 'post',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(data)
    })
    store.dispatch(statusResolved())
    return (await response.json()) as K
  } catch (e) {
    store.dispatch(statusRejected(e))
  }
}
