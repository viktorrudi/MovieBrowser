import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import movieDBReducer from './reducers/movieDBReducer'

export const initialState = {
  config: {},
  features: {},
  filters: {
    searchTerm: '',
  },
}

const store = createStore(movieDBReducer, initialState, applyMiddleware(thunk))

export default store
