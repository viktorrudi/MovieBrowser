import React from 'react'
import { useHistory } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

export default function AppContainer({ children }) {
  const history = useHistory()
  const rerouteToHome = () => history.push('/')
  return (
    <div>
      <AppBar position="static">
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
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  )
}
