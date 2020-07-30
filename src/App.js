import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppContainer from './components/Shared/AppContainer'
import FrontPage from './components/FrontPage'
import MovieDetails from './components/MovieDetails'

import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/:specifier/:key/:id" component={MovieDetails} />
          </Switch>
        </AppContainer>
      </Router>
    </Provider>
  )
}

export default App
