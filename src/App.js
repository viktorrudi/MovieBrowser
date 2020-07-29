import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import FrontPage from './components/FrontPage'
import MovieDetails from './components/MovieDetails'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/movie/:id" children={MovieDetails} />
      </Switch>
    </Router>
  )
}

export default App
