export const API_BASE_URL = 'https://api.themoviedb.org/3/'
export const API_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

export const MOVIE_BUTTON = {
  HEIGHT: 230,
  WIDTH: 150,
}

export const FEATURE = {
  MOVIE: {
    POPULAR: {
      URI: 'movie/popular',
      HEADING: 'Popular Movies',
    },
    FAMILY: {
      IS_GENRE: true,
      HEADING: 'Family',
      URI: 'discover/movie',
      ID: 10751,
    },
    DOCUMENTARY: {
      IS_GENRE: true,
      HEADING: 'Documentary',
      URI: 'discover/movie',
      ID: 99,
    },
  },
  SERIES: {
    POPULAR: {
      URI: 'tv/popular',
      HEADING: 'Popular Series',
    },
  },
}
