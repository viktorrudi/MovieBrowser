import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { withRouter } from 'react-router'

import * as CONST from '../../constants'
import * as UTIL from '../../utils'
import { getFeatureDataAction } from '../../actions/movieDBActions'
import { Typography, Grid } from '@material-ui/core'

function MovieDetails({ features = {}, getFeatureData }) {
  const [mediaDetail, setMediaDetail] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { specifier, id, group } = useParams()

  useEffect(() => {
    const targetID = `${specifier}_id`
    console.log(
      `${CONST.API_BASE_URL}${specifier}/${id}${UTIL.getParameters()}`
    )
    fetch(`${CONST.API_BASE_URL}${specifier}/${id}${UTIL.getParameters()}`)
      .then((res) => res.json())
      .then((mediaInfo) => {
        setMediaDetail(mediaInfo)
        setIsLoading(false)
      })
  }, [])

  function renderMetaData() {
    const { release_date, vote_average, vote_count } = mediaDetail
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
  if (isLoading) return 'Loading...'
  return (
    <Grid container>
      <Grid item sm={12} style={{ padding: 20 }}>
        <Typography variant="h5">
          {mediaDetail.title || mediaDetail.name}
        </Typography>
      </Grid>
      <Grid item sm={6} style={{ padding: 20 }}>
        <Typography>{mediaDetail.overview}</Typography>
        <ul>{renderMetaData()}</ul>
      </Grid>
      <Grid item sm={6}>
        <img
          src={`${
            CONST.API_BASE_IMAGE_URL
          }${mediaDetail.backdrop_path?.substring(1)}`}
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
