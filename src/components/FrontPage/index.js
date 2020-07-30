import React from 'react'

import MovieStrip from '../Shared/MovieStrip'

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

export default function FrontPage() {
  const features = [movie.popular, tv.popular, movie.family, movie.documentary]
  return features.map((feature) => (
    <div style={{ margin: 20 }} key={feature.heading}>
      <MovieStrip feature={feature} {...getFeatureProps(feature)} />
    </div>
  ))
}
