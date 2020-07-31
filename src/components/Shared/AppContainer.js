import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import HomeIcon from '@material-ui/icons/Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'

import {
  setFilterAction,
  clearFilterAction,
  sendErrorAction,
} from '../../actions/movieDBActions'

function AppContainer({
  children,
  // from Redux
  filters = {},
  errorMessage,
  setFilter,
  clearFilter,
  sendError,
}) {
  const { searchTerm } = filters
  const history = useHistory()

  function clearSearchAndGoHome() {
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
              autoFocus
              placeholder="Multi Search..."
              style={{
                background: '#fff',
                opacity: 1,
                padding: '5px 15px',
                borderRadius: 5,
              }}
              value={searchTerm}
              onChange={(e) => {
                const term = e.target.value

                history.push('/')
                setFilter('searchTerm', term)
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={errorMessage !== ''}
        message={errorMessage}
        autoHideDuration={5000}
        // This will clear the redux state of the active error message
        onClose={() => sendError('')}
      />
      <div style={{ margin: 10 }}>{children}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  filters: state.filters,
  errorMessage: state.errorMessage,
})

export default connect(mapStateToProps, {
  setFilter: setFilterAction,
  clearFilter: clearFilterAction,
  sendError: sendErrorAction,
})(AppContainer)
