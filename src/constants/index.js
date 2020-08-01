export const API_BASE_URL = 'https://api.themoviedb.org/3/'
export const API_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

export const MOVIE_BROWSER_TITLE = 'Movie Browser'

export const MOVIE_BUTTON = {
  HEIGHT: 230,
  WIDTH: 150,
}

export const BREAKPOINTS = {
  '100-400': 2,
  '400-600': 3,
  '600-700': 4,
  '700-900': 5,
  '900-1100': 6,
  '1100-1400': 7,
  '1400-999999': 8,
}

export const FEATURE = {
  movie: {
    popular: {
      key: 'popular',
      group: 'popular',
      uri: 'movie/popular',
      heading: 'Popular Movies',
      mediaType: 'movie',
    },
    family: {
      key: 'family',
      group: 'genre-family',
      isGenre: true,
      heading: 'Family',
      uri: 'discover/movie',
      mediaType: 'movie',
      apiID: 10751,
    },
    documentary: {
      key: 'documentary',
      group: 'genre-documentary',
      isGenre: true,
      heading: 'Documentary',
      uri: 'discover/movie',
      mediaType: 'movie',
      apiID: 99,
    },
  },
  tv: {
    popular: {
      key: 'popular',
      group: 'popular',
      uri: 'tv/popular',
      heading: 'Popular TV Series',
      mediaType: 'tv',
    },
  },
  search: {
    multi: {
      key: 'multi',
      uri: 'search/multi',
      mediaTypes: {
        person: {
          key: 'person',
          group: 'search-result',
          heading: 'Actors',
          mediaType: 'person',
        },
        movie: {
          key: 'movie',
          group: 'search-result',
          heading: 'Movies',
          mediaType: 'movie',
        },
        tv: {
          key: 'tv',
          group: 'search-result',
          heading: 'TV Series',
          mediaType: 'tv',
        },
      },
    },
  },
}
