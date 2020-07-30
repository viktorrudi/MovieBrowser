import * as CONST from '../constants'

function getParameters(params = {}) {
  const API_KEY = process.env.REACT_APP_THE_MOVIE_DB_API_KEY
  const parameters = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `?api_key=${API_KEY}&language=en-US&page=1${parameters}`
}

export const getFeatureDataAction = (feature, params) => (dispatch) => {
  const { specifier, key } = feature
  const featureKey = `${specifier}_${key}`
  fetch(`${CONST.API_BASE_URL}${feature.uri}${getParameters(params)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success === false) {
        throw Error(data.status_message)
      }
      dispatch({
        type: 'STORE_FEATURE',
        payload: {
          data: data.results,
          featureKey,
        },
      })
    })
    .catch((error) => {
      dispatch({
        type: 'FEATURE_ERROR',
        payload: {
          errorMessage: error.message,
          featureKey,
        },
      })
    })
}
