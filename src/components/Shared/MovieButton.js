import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import * as CONST from '../../constants'

/**
 * This component is what's inside of the MovieStrip. Each button will
 * attempt to display an image if it exists, if not, it will fall back
 * to using a gray background with some text instead
 *
 * @param {Object} movieDetails Details about media from the API
 * @param {Object} feature Reference to the type of feature constant
 */
export default function MovieButton({ movieDetails, feature }) {
  const history = useHistory()
  const [isHovering, setIsHovering] = useState(false)

  const title = movieDetails.title || movieDetails.name
  const imagePath = movieDetails.poster_path || movieDetails.profile_path
  const hasImage = Boolean(imagePath)

  const buttonSizeStyle = {
    height: CONST.MOVIE_BUTTON.HEIGHT,
    width: CONST.MOVIE_BUTTON.WIDTH,
  }

  return (
    <Card
      onClick={() =>
        history.push(`${feature.mediaType}/${feature.group}/${movieDetails.id}`)
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardActionArea style={{ maxWidth: buttonSizeStyle.WIDTH }}>
        <div
          className={`card-details ${hasImage && isHovering ? 'hovering' : ''}`}
        >
          <p className="card-details-title">{title}</p>
          <div className="card-details-backdrop" />
        </div>
        {hasImage ? (
          <img
            style={{
              ...buttonSizeStyle,
              imageRendering: '-webkit-optimize-contrast',
            }}
            src={`${CONST.API_BASE_IMAGE_URL}${imagePath}`}
          />
        ) : (
          <div className="empty-state" style={buttonSizeStyle}>
            {title}
          </div>
        )}
      </CardActionArea>
    </Card>
  )
}
