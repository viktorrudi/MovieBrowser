export const API_BASE_URL = 'https://api.themoviedb.org/3/'
export const API_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

export const MOVIE_BUTTON = {
  HEIGHT: 230,
  WIDTH: 150,
}

export const FEATURE = {
  movie: {
    popular: {
      key: 'popular',
      uri: 'movie/popular',
      heading: 'Popular Movies',
      specifier: 'movie',
    },
    family: {
      key: 'family',
      isGenre: true,
      heading: 'Family',
      uri: 'discover/movie',
      specifier: 'movie',
      apiID: 10751,
    },
    documentary: {
      key: 'documentary',
      isGenre: true,
      heading: 'Documentary',
      uri: 'discover/movie',
      specifier: 'movie',
      apiID: 99,
    },
  },
  tv: {
    popular: {
      key: 'popular',
      uri: 'tv/popular',
      heading: 'Popular Series',
      specifier: 'tv',
    },
  },
}
