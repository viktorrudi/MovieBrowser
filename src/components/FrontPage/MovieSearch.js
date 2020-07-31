import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import debounce from 'debounce'

import * as CONST from '../../constants'
import * as UTIL from '../../utils'

import { getFeatureDataAction } from '../../actions/movieDBActions'

import MovieStrip from '../Shared/MovieStrip'

const { search } = CONST.FEATURE

function MovieSearch({
  // from Redux
  features = {},
  filters,
  getFeatureData,
}) {
  const { searchTerm } = filters
  const [isSearching, setIsSearching] = useState(false)

  const searchParams = {
    query: searchTerm,
  }
  const debouncedGetFeatureData = useCallback(debounce(getFeatureData, 500), [])

  // TODO
  const errorMessage = ''

  useEffect(() => {
    if (searchTerm === '') return
    debouncedGetFeatureData(search.multi, searchParams)

    setIsSearching(false)
  }, [searchTerm])

  function renderSearchResults() {
    const { searchResults = {} } = features
    return Object.entries(searchResults).map(([mediaType, results]) => {
      const feature = search.multi.mediaTypes[mediaType]
      return (
        <MovieStrip key={mediaType} feature={feature} searchResults={results} />
      )
    })
  }

  if (searchTerm === '') return null
  if (errorMessage) return <div>{errorMessage}</div>

  return (
    <div className="MovieSearch">
      {isSearching ? <div>Searching...</div> : renderSearchResults()}
    </div>
  )
}

const mapStateToProps = (state) => ({
  features: state.features,
  filters: state.filters,
})

export default connect(mapStateToProps, {
  getFeatureData: getFeatureDataAction,
})(MovieSearch)
