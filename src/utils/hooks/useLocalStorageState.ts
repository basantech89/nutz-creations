import * as React from 'react'

type TDefaultValueFunction = () => string

export function useLocalStorageState(
  key: string,
  defaultValue: string | boolean | number | TDefaultValueFunction,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}
