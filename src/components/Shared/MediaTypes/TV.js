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
    <Grid container>
      <Grid item sm={12} style={{ padding: 20 }}>
        <Typography variant="h3" align="center" style={{ margin: 0 }}>
          {mediaDetail.name}
        </Typography>
        <MetaData metaData={metaData} />
      </Grid>

      <Grid
        item
        sm={6}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          padding: '0 20px',
          textAlign: 'right',
        }}
      >
        <Typography>{mediaDetail.overview}</Typography>
      </Grid>
      <Grid item sm={6} style={{ width: '100%' }}>
        {hasImage ? (
          <img src={backdropURL} style={{ width: '100%' }} />
        ) : (
          <div className="empty-state" style={{ height: 300 }}>
            {mediaDetail.name}
          </div>
        )}
      </Grid>
    </Grid>
  )
}
