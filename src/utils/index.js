import { useState, useEffect } from 'react'

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export function getParameters(params = {}) {
  const defaultParams = {
    api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
    language: 'en-US',
    page: 1,
  }
  const parameters = Object.entries({ ...defaultParams, ...params })
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `?${parameters}`
}

export function normalize(dataAsArray) {
  return dataAsArray.reduce((dataAsDictionary, data) => {
    return {
      ...dataAsDictionary,
      [data.id]: data,
    }
  }, {})
}
