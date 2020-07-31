import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { withRouter } from 'react-router'

import CircularProgress from '@material-ui/core/CircularProgress'

import TV from './../Shared/MediaTypes/TV'
import Person from './../Shared/MediaTypes/Person'
import Movie from './../Shared/MediaTypes/Movie'

import * as CONST from '../../constants'
import * as UTIL from '../../utils'
import { sendErrorAction } from '../../actions/movieDBActions'

const mediaTypeComponents = {
  tv: TV,
  person: Person,
  movie: Movie,
}

/**
 * Initial component when opening a media link. This will render the correct
 * media component based on whats in the URL (mediaType)
 * /:mediaType/:group/:id
 *
 * @param {Function} sendError Method for sending error message to redux
 *        Errors are displayed as a snackbar message
 */
function MovieDetails({ sendError }) {
  const [mediaDetail, setMediaDetail] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { mediaType, id } = useParams()
  const MediaTypeComponent = mediaTypeComponents[mediaType]

  useEffect(() => {
    fetch(`${CONST.API_BASE_URL}${mediaType}/${id}${UTIL.getParameters()}`)
      .then((res) => res.json())
      .then((mediaInfo) => {
        if (mediaInfo.success === false) {
          throw Error(data.status_message)
        }
        setMediaDetail(mediaInfo)
        setIsLoading(false)
      })
      .catch((error) => sendError(error.message))
  }, [])

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return <MediaTypeComponent mediaDetail={mediaDetail} />
}

export default compose(
  withRouter,
  connect(null, { sendError: sendErrorAction })
)(MovieDetails)
