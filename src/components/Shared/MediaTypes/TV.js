import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import MetaData from '../../Shared/MetaData'

import * as CONST from '../../../constants'

/**
 * This component is rendered when you click an item from
 * the front page or in search results
 * @param {Object} mediaDetail Details about a series from API
 */
export default function TV({ mediaDetail }) {
  const imagePath = mediaDetail.backdrop_path
  const backdropURL = `${CONST.API_BASE_IMAGE_URL}${imagePath?.substring(1)}`

  const hasImage = Boolean(imagePath)

  const metaData = {
    'First Aired': mediaDetail.first_air_date,
    'Number of seasons': mediaDetail.number_of_seasons,
    Rating: mediaDetail.vote_average,
    'Times voted': mediaDetail.vote_count,
  }

  return (
    <div className="MediaComponent">
      <Grid container>
        <Grid item sm={12}>
          <Typography variant="h3" align="center">
            {mediaDetail.name}
          </Typography>
          <MetaData metaData={metaData} />
        </Grid>

        <Grid item sm={6} className="MediaComponent-overview">
          <Typography>{mediaDetail.overview}</Typography>
        </Grid>
        <Grid item sm={6} className="MediaComponent-media">
          {hasImage ? <img src={backdropURL} /> : <div>{mediaDetail.name}</div>}
        </Grid>
      </Grid>
    </div>
  )
}
