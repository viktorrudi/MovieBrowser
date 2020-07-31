import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import debounce from 'debounce'

import CircularProgress from '@material-ui/core/CircularProgress'

import MovieStrip from '../Shared/MovieStrip'

import { FEATURE } from '../../constants'
import { getFeatureDataAction } from '../../actions/movieDBActions'

/**
 * This component is returned if you have a search query active
 * It will debounce based on the input of the searchterm to not spam the API
 * @param {Object} searchResults Response from search query
 * @param {Object} filters For now only includes searchTerm
 * @param {Function} getFeatureData Action for fetching media to store in redux
 */
function MovieSearch({
  // from Redux
  searchResults,
  filters,
  getFeatureData,
}) {
  const { searchTerm } = filters
  const [isSearching, setIsSearching] = useState(false)

  const searchParams = { query: searchTerm }
  const debouncedGetFeatureData = useCallback(debounce(getFeatureData, 500), [])

  useEffect(() => {
    if (searchTerm === '') return
    debouncedGetFeatureData(FEATURE.search.multi, searchParams)

    setIsSearching(false)
  }, [searchTerm])

  function renderSearchResults() {
    return Object.entries(searchResults).map(([mediaType, results]) => {
      const feature = FEATURE.search.multi.mediaTypes[mediaType]
      return (
        <MovieStrip key={mediaType} feature={feature} searchResults={results} />
      )
    })
  }

  if (searchTerm === '') return null

  return (
    <div className="MovieSearch">
      {isSearching ? (
        <CircularProgress color="inherit" />
      ) : (
        renderSearchResults()
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  features: state.features,
  filters: state.filters,
  searchResults: state.searchResults,
})

export default connect(mapStateToProps, {
  getFeatureData: getFeatureDataAction,
})(MovieSearch)
