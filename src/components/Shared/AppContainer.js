import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import HomeIcon from '@material-ui/icons/Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import {
  setFilterAction,
  clearFilterAction,
} from '../../actions/movieDBActions'
import * as UTIL from '../../utils'

function AppContainer({
  children,
  // from Redux
  filters = {},
  setFilter,
  clearFilter,
}) {
  const { searchTerm } = filters

  const history = useHistory()
  const clearSearchAndGoHome = () => {
    clearFilter()
    history.push('/')
  }

  return (
    <div style={{ marginTop: 100 }}>
      <AppBar style={{ position: 'fixed', display: 'flex' }}>
        <Toolbar>
          <IconButton
            onClick={clearSearchAndGoHome}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <Typography
            onClick={clearSearchAndGoHome}
            variant="h6"
            style={{ cursor: 'pointer' }}
          >
            Movie Browser
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <TextField
              value={searchTerm}
              onChange={(e) => setFilter('searchTerm', e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ margin: 10 }}>{children}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  filters: state.filters,
})

export default connect(mapStateToProps, {
  setFilter: setFilterAction,
  clearFilter: clearFilterAction,
})(AppContainer)
