import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import movieDBReducer from './reducers/movieDBReducer'

const initialState = {}

const store = createStore(movieDBReducer, initialState, applyMiddleware(thunk))

export default store
