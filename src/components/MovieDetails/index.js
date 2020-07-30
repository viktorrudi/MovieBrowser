import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { withRouter } from 'react-router'

import * as CONST from '../../constants'
import { getFeatureDataAction } from '../../actions/movieDBActions'
import { Typography, Grid } from '@material-ui/core'

function getFeatureProps(feature) {
  if (!feature.isGenre) return {}
  return {
    params: {
      sort_by: 'popularity.desc',
      with_genres: feature.apiID,
    },
  }
}

function MovieDetails({ features = {}, getFeatureData }) {
  const { specifier, id, key } = useParams()
  const hasNotYetLoaded = Object.keys(features).length === 0

  if (hasNotYetLoaded) {
    const feature = CONST.FEATURE[specifier][key]
    const params = getFeatureProps(feature)
    getFeatureData(feature, params)
  }

  const featureID = parseInt(id)
  const thisFeature = features[`${specifier}_${key}`]?.find((item) => {
    return item?.id === featureID
  })

  function renderMetaData() {
    const { release_date, vote_average, vote_count } = thisFeature
    const metaData = {
      'Release Date': release_date,
      Rating: vote_average,
      'Times voted': vote_count,
    }
    return Object.entries(metaData).map(([heading, value]) => (
      <li key={heading}>
        {heading}: {value}
      </li>
    ))
  }

  if (!thisFeature) return 'Loading...'
  return (
    <Grid container>
      <Grid item sm={12} style={{ padding: 20 }}>
        <Typography variant="h5">{thisFeature.title}</Typography>
      </Grid>
      <Grid item sm={6} style={{ padding: 20 }}>
        <Typography>{thisFeature.overview}</Typography>
        <ul>{renderMetaData()}</ul>
      </Grid>
      <Grid item sm={6}>
        <img
          src={`${
            CONST.API_BASE_IMAGE_URL
          }${thisFeature.backdrop_path.substring(1)}`}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  features: state.features,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { getFeatureData: getFeatureDataAction })
)(MovieDetails)
