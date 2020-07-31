import * as ACTION from '../constants/actionTypes'
import { initialState } from '../store'

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SET_FILTER: {
      const { type, filter } = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [type]: filter,
        },
      }
    }
    case ACTION.STORE_CONFIG: {
      return {
        ...state,
        config: action.payload,
      }
    }
    case ACTION.STORE_FEATURE: {
      const { payload } = action
      return {
        ...state,
        features: {
          ...state.features,
          [payload.featureKey]: payload.data,
        },
      }
    }
    case ACTION.STORE_SEARCH_RESULTS: {
      const { payload } = action
      return {
        ...state,
        searchResults: payload.data,
      }
    }
    case ACTION.CLEAR_SEARCH_FILTER: {
      return {
        ...state,
        searchResults: {},
        filters: {
          ...state.filters,
          searchTerm: '',
        },
      }
    }
    case ACTION.FEATURE_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      }
    }
    default:
      return state
  }
}
