import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import MetaData from '../../Shared/MetaData'

import * as CONST from '../../../constants'

/**
 * This component is rendered when you click an item from
 * the front page or in search results
 * @param {Object} mediaDetail Details about person from API
 */
export default function Person({ mediaDetail }) {
  const hasImage = Boolean(mediaDetail.profile_path)
  const backdropURL = `${
    CONST.API_BASE_IMAGE_URL
  }${mediaDetail.profile_path?.substring(1)}`

  const metaData = {
    'Known for': mediaDetail.known_for_department,
    Birthday: mediaDetail.birthday,
    RIP: mediaDetail.deathday,
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
          <Typography>
            {mediaDetail.biography || 'No info about this actor'}
          </Typography>
        </Grid>
        <Grid item sm={6} className="MediaComponent-media">
          {hasImage ? (
            <img src={backdropURL} />
          ) : (
            <div className="empty-state">{mediaDetail.name}</div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
