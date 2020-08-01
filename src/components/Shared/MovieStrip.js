import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import MovieButton from './MovieButton'

import * as CONST from '../../constants'
import { getFeatureDataAction } from '../../actions/movieDBActions'

/**
 * Each individual strip, containing buttons to media.
 * MovieStrips does automatically do API calls for the requested feature
 * that comes from props
 *
 * @param {Object} feature Feature to request from themoviedb API (movie, tv)
 * @param {Object} params Necessary URL params needed for API
 * @param {Object} searchResults A special prop from MovieSearch that will override
 *        the automatic fetching by this component
 * @param {Object} features Dictionary of fetched media in redux
 * @param {Function} getFeatureData Action for fetching media to store in redux
 */
function MovieStrip({
  feature,
  params,
  searchResults,
  // From redux
  features = {},
  getFeatureData,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const results =
    searchResults || features[`${feature.mediaType}_${feature.group}`]
  const isLoading = !results

  // Calculates how many slides (buttons) should be visible on the screen
  // Based on the current screen width
  const visibleButtons = useMemo(() => {
    const breakpoints = Object.entries(CONST.BREAKPOINTS)
    const screenWidthFloor = Math.floor(screenWidth / 100) * 100

    for (const [pixelRange, buttonAmount] of breakpoints) {
      const [min, max] = pixelRange.split('-')
      if (screenWidthFloor >= min && screenWidthFloor <= max) {
        return buttonAmount
      }
    }
  }, [screenWidth])

  useEffect(() => {
    // Fetches media data if none exist in the store
    const hasNotYetLoaded = Object.keys(features).length === 0
    if (hasNotYetLoaded) getFeatureData(feature, params)

    // Screen width listener used for finding how many items to show
    // in the slideshows
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="MovieStrip">
      <Typography variant="h5" className="MovieStrip-heading">
        {feature.heading}
      </Typography>
      {isLoading ? (
        <div className="MovieStrip-loader">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <CarouselProvider
          isIntrinsicHeight
          visibleSlides={visibleButtons}
          step={visibleButtons}
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
          <ButtonBack className="MovieStrip-direction-button back">
            <ArrowBackIosIcon />
          </ButtonBack>
          <ButtonNext className="MovieStrip-direction-button next">
            <ArrowForwardIosIcon />
          </ButtonNext>
        </CarouselProvider>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  features: state.features,
  filters: state.filters,
})

export default connect(mapStateToProps, {
  getFeatureData: getFeatureDataAction,
})(MovieStrip)
