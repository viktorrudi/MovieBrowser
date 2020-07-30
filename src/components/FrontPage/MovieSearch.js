import React, { useEffect, useState } from 'react'

import * as CONST from '../../constants'
import * as UTIL from '../../utils'

export default function MovieSearch({ searchTerm = '' }) {
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    if (searchTerm === '') return
    const searchParams = {
      include_adult: true,
      query: searchTerm,
    }
    console.log(
      `${CONST.API_BASE_URL}search/movie${UTIL.getParameters(searchParams)}`
    )
    fetch(
      `${CONST.API_BASE_URL}search/movie${UTIL.getParameters(searchParams)}`
    )
      .then((res) => res.json())
      .then((data) => console.log('@@@', data))
  }, [searchTerm])
  return <div>{searchTerm}</div>
}
