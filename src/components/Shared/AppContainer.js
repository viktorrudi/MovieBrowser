import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import HomeIcon from '@material-ui/icons/Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'

import { MOVIE_BROWSER_TITLE } from '../../constants'

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
    <div className="AppContainer">
      <AppBar>
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
            data-testid="app-name"
            className="AppContainer-button-home"
          >
            {MOVIE_BROWSER_TITLE}
          </Typography>
          <div className="AppContainer-container-search">
            <TextField
              autoFocus
              placeholder="Multi Search..."
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
      <div className="AppContainer-children">{children}</div>
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
