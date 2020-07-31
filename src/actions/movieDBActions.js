import * as CONST from '../constants'
import * as ACTION from '../constants/actionTypes'
import * as UTIL from '../utils'

export const setFilterAction = (type, filter) => (dispatch) => {
  dispatch({
    type: ACTION.SET_FILTER,
    payload: { type, filter },
  })
}

export const clearFilterAction = () => (dispatch) => {
  dispatch({
    type: ACTION.CLEAR_SEARCH_FILTER,
  })
}

export const sendErrorAction = (errorMessage) => (dispatch) => {
  dispatch({
    type: ACTION.FEATURE_ERROR,
    payload: errorMessage,
  })
}

/**
 * This method does network calls based on the requested feature and stores it in
 * the store
 * @param {Object} feature Feature to request from themoviedb API (movie, tv, person)
 * @param {Object} params Necessary URL params needed for API
 */
export const getFeatureDataAction = (feature, params) => (dispatch) => {
  // key in the features dictionary that is stored in redux
  const featureKey = `${feature.mediaType}_${feature.group}`

  fetch(`${CONST.API_BASE_URL}${feature.uri}${UTIL.getParameters(params)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success === false) {
        throw Error(data.status_message)
      }

      const isSearch = feature.uri.includes('search')
      let results = data.results

      if (isSearch) {
        // When searching, the data is stored in a dictionary which are
        // split based on the media_type (person, tv, movie), so we can
        // target related constants and components
        results = results.reduce((features, ft) => {
          const addedFeatures = features[ft.media_type]
          return {
            ...features,
            [ft.media_type]: !addedFeatures?.length
              ? [ft]
              : addedFeatures.concat(ft),
          }
        }, {})
      }

      const dispatchType = isSearch
        ? ACTION.STORE_SEARCH_RESULTS
        : ACTION.STORE_FEATURE

      dispatch({
        type: dispatchType,
        payload: {
          data: results,
          featureKey,
        },
      })
    })
    .catch((error) => sendErrorAction(error.message))
}
