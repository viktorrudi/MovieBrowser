import React, { useState, useRef, useEffect } from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import MovieButton from './MovieButton'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import * as CONST from '../../constants'
import { Typography } from '@material-ui/core'

function getParameters(params = {}) {
  const API_KEY = process.env.REACT_APP_THE_MOVIE_DB_API_KEY
  const parameters = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `?api_key=${API_KEY}&language=en-US&page=1${parameters}`
}

export default function MovieStrip({ feature, heading, params }) {
  const [results, setResults] = useState([])
  const [errors, setErrors] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  // TODO: Fix horrible way of making layout responsive
  const slideCount = Math.floor(screenWidth / 100) * 100
  const breakPoints = {
    100: 2,
    200: 2,
    300: 2,
    400: 2,
    500: 3,
    600: 4,
    700: 5,
    800: 6,
    900: 7,
    1000: 8,
    1100: 8,
    1200: 8,
    1300: 9,
    1400: 9,
    1500: 9,
    1600: 9,
    1700: 10,
  }

  async function getFeatureData() {
    try {
      const res = await fetch(
        `${CONST.API_BASE_URL}${feature}${getParameters(params)}`
      )
      const data = await res.json()

      setIsLoading(false)
      if (data.success === false) {
        throw Error(data.status_message)
      }
      setResults(data.results)
    } catch (error) {
      console.log(error.message)
      setErrors(error.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getFeatureData()

    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="MovieStrip">
      <Typography variant="h5" style={{ margin: '20px 0' }}>
        {heading}
      </Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CarouselProvider
          isIntrinsicHeight
          visibleSlides={breakPoints[slideCount]}
          step={breakPoints[slideCount]}
          naturalSlideWidth={CONST.MOVIE_BUTTON.WIDTH}
          naturalSlideHeight={CONST.MOVIE_BUTTON.HEIGHT}
          totalSlides={results.length}
          dragEnabled={false}
        >
          <Slider>
            {results.map((movie, i) => (
              <Slide index={i} key={movie.id}>
                <MovieButton movieDetails={movie} key={movie.id} />
              </Slide>
            ))}
          </Slider>
          <ButtonBack className="MovieStrip__direction-button back">
            <ArrowBackIosIcon />
          </ButtonBack>
          <ButtonNext className="MovieStrip__direction-button next">
            <ArrowForwardIosIcon />
          </ButtonNext>
        </CarouselProvider>
      )}
    </div>
  )
}
