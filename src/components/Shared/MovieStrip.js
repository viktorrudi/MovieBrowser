import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import MovieButton from './MovieButton'

import { Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import * as CONST from '../../constants'
import { getFeatureDataAction } from '../../actions/movieDBActions'

function MovieStrip({
  feature,
  params,
  // From redux
  features = {},
  getFeatureData,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const results = features[`${feature.specifier}_${feature.key}`]
  console.log(features, feature.key)
  const isLoading = !results

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

  useEffect(() => {
    getFeatureData(feature, params)

    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="MovieStrip">
      <Typography variant="h5" style={{ margin: '20px 0' }}>
        {feature.heading}
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
                <MovieButton
                  movieDetails={movie}
                  feature={feature}
                  key={movie.id}
                />
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

const mapStateToProps = (state) => ({
  features: state.features,
})

export default connect(mapStateToProps, {
  getFeatureData: getFeatureDataAction,
})(MovieStrip)
