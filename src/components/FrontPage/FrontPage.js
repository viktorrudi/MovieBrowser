import React from 'react'
import { connect } from 'react-redux'

import MovieStrip from '../Shared/MovieStrip'
import MovieSearch from './MovieSearch'

import { FEATURE } from '../../constants'
import { getFeatureProps } from '../../utils'

/**
 * This component will first render out a list of default features
 * and search results if you have an active search term
 * @param {Object} filters contains searchTerm from redux
 */
function FrontPage({ filters }) {
  const features = [
    FEATURE.movie.popular,
    FEATURE.tv.popular,
    FEATURE.movie.family,
    FEATURE.movie.documentary,
  ]
  const hasSearchTerm = filters.searchTerm !== ''

  if (hasSearchTerm) return <MovieSearch />
  return features.map((feature) => (
    <div className="FrontPage" style={{ margin: 20 }} key={feature.heading}>
      <MovieStrip feature={feature} {...getFeatureProps(feature)} />
    </div>
  ))
}

const mapStateToProps = (state) => ({
  filters: state.filters,
})

export default connect(mapStateToProps)(FrontPage)
