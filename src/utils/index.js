/**
 * Parses URL Parameters and attaches it, along with some
 * default parameters
 * @param {Object} params URL Parameters
 * @returns {String} parameters to be attached to rest of URL
 */
export function getParameters(params = {}) {
  const defaultParams = {
    api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
    language: 'en-US',
    page: 1,
  }
  const parameters = Object.entries({ ...defaultParams, ...params })
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `?${parameters}`
}

/**
 * @param {Object} feature Feature which contains details for the API
 */
export function getFeatureProps(feature) {
  if (!feature.isGenre) return {}
  return {
    params: {
      sort_by: 'popularity.desc',
      with_genres: feature.apiID,
    },
  }
}
