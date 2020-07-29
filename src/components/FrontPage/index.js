import React from 'react'

import MovieStrip from '../Shared/MovieStrip'

import { FEATURE } from '../../constants'
const { MOVIE, SERIES } = FEATURE

function getFeatureProps(feature) {
  if (!feature.IS_GENRE) return {}
  return {
    params: {
      sort_by: 'popularity.desc',
      with_genres: feature.ID,
    },
  }
}

export default function FrontPage() {
  const features = [
    MOVIE.POPULAR,
    SERIES.POPULAR,
    MOVIE.FAMILY,
    MOVIE.DOCUMENTARY,
  ]
  return features.map((feature) => (
    <div style={{ margin: 20 }} key={feature.HEADING}>
      <MovieStrip
        feature={feature.URI}
        heading={feature.HEADING}
        {...getFeatureProps(feature)}
      />
    </div>
  ))
}
