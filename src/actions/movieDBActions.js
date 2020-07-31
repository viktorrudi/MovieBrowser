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

export const getFeatureDataAction = (feature, params) => (dispatch) => {
  const { specifier, group } = feature
  const featureKey = `${specifier}_${group}`
  fetch(`${CONST.API_BASE_URL}${feature.uri}${UTIL.getParameters(params)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success === false) {
        throw Error(data.status_message)
      }

      const isSearch = feature.uri.includes('search')
      let results = data.results

      if (isSearch) {
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
    .catch((error) => {
      console.log('error town', error)
      dispatch({
        type: ACTION.FEATURE_ERROR,
        payload: {
          errorMessage: error.message,
          featureKey,
        },
      })
    })
}
