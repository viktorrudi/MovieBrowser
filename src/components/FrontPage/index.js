import React from 'react'
import { connect } from 'react-redux'

import MovieStrip from '../Shared/MovieStrip'
import MovieSearch from './MovieSearch'

import { FEATURE } from '../../constants'
const { movie, tv } = FEATURE

function getFeatureProps(feature) {
  if (!feature.isGenre) return {}
  return {
    params: {
      sort_by: 'popularity.desc',
      with_genres: feature.apiID,
    },
  }
}

function FrontPage({ filters }) {
  const features = [movie.popular, tv.popular, movie.family, movie.documentary]
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
