import React, { useState } from 'react'
import ShakaPlayer from 'shaka-player-react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'

import MetaData from '../../Shared/MetaData'

import * as CONST from '../../../constants'

/**
 * This component is rendered when you click an item from
 * the front page or in search results
 * @param {Object} mediaDetail Details about movie from API
 */
export default function Movie({ mediaDetail }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const hasImage = Boolean(mediaDetail.backdrop_path)
  const backdropURL = `${
    CONST.API_BASE_IMAGE_URL
  }${mediaDetail.backdrop_path?.substring(1)}`

  const metaData = {
    'Release Date': mediaDetail.release_date,
    Rating: mediaDetail.vote_average,
    'Times voted': mediaDetail.vote_count,
  }

  function handleWatchMovieClick() {
    setIsDialogOpen(true)
  }

  return (
    <div className="MediaComponent">
      <Grid container>
        <Grid item sm={12}>
          <Typography variant="h3" align="center">
            {mediaDetail.title}
          </Typography>
          <MetaData metaData={metaData} />
        </Grid>

        <Grid item sm={6} className="MediaComponent-overview">
          <Typography>{mediaDetail.overview}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWatchMovieClick}
            size="large"
          >
            Watch Movie
          </Button>
        </Grid>
        <Grid item sm={6} className="MediaComponent-media">
          {hasImage ? (
            <img src={backdropURL} />
          ) : (
            <div>{mediaDetail.title}</div>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullScreen
        className="ShakaDialog"
      >
        <DialogTitle className="ShakaDialog-title">
          {mediaDetail.title}
          <IconButton
            onClick={() => setIsDialogOpen(false)}
            className="ShakaDialog-title-button-close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="ShakaDialog-content">
          <ShakaPlayer
            autoPlay
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
