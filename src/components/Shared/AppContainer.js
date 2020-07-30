import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import MovieSearch from '../FrontPage/MovieSearch'

import * as UTIL from '../../utils'

export default function AppContainer({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const history = useHistory()
  const rerouteToHome = () => history.push('/')
  const debouncedSearchTerm = UTIL.useDebounce(searchTerm, 500)

  return (
    <div style={{ marginTop: 100 }}>
      <AppBar style={{ position: 'fixed', display: 'flex' }}>
        <Toolbar>
          <IconButton
            onClick={rerouteToHome}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <Typography
            onClick={rerouteToHome}
            variant="h6"
            style={{ cursor: 'pointer' }}
          >
            Movie Browser
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <MovieSearch searchTerm={debouncedSearchTerm} />
      <div style={{ margin: 10 }}>{children}</div>
    </div>
  )
}
