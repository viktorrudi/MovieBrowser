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
      group: 'popular',
      uri: 'movie/popular',
      heading: 'Popular Movies',
      specifier: 'movie',
    },
    family: {
      key: 'family',
      group: 'genre-family',
      isGenre: true,
      heading: 'Family',
      uri: 'discover/movie',
      specifier: 'movie',
      apiID: 10751,
    },
    documentary: {
      key: 'documentary',
      group: 'genre-documentary',
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
      group: 'popular',
      uri: 'tv/popular',
      heading: 'Popular TV Series',
      specifier: 'tv',
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
          specifier: 'person',
        },
        movie: {
          key: 'movie',
          group: 'search-result',
          heading: 'Movies',
          specifier: 'movie',
        },
        tv: {
          key: 'tv',
          group: 'search-result',
          heading: 'TV Series',
          specifier: 'tv',
        },
      },
    },
  },
}
