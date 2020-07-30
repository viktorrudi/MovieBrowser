import React from 'react'
import { useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'

import * as CONST from '../../constants'

export default function MovieButton({ movieDetails, feature }) {
  const history = useHistory()
  return (
    <Card
      onClick={() =>
        history.push(`${feature.specifier}/${feature.key}/${movieDetails.id}`)
      }
    >
      <CardActionArea>
        <CardMedia
          style={{
            height: CONST.MOVIE_BUTTON.HEIGHT,
            width: CONST.MOVIE_BUTTON.WIDTH,
            imageRendering: '-webkit-optimize-contrast',
          }}
          image={`http://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          title={movieDetails.original_title}
        />
      </CardActionArea>
    </Card>
  )
}
