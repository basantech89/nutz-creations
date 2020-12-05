import { Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import { useRouter } from 'next/router'
import React from 'react'

import DarkThemeIcon from '../../assets/icons/darkThemeIcon'
import LightThemeIcon from '../../assets/icons/lightThemeIcon'
import { isAuthenticated, setItem } from '../../utils/common'
import { useStyles } from './style'

declare interface IAppHeaderProps {
  onToggleThemeMode: () => void
}

export default function Header(props: IAppHeaderProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const [authenticated, setAuthenticated] = React.useState(false)

  React.useEffect(() => {
    setAuthenticated(isAuthenticated())
  })

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    setItem('token', '')
    setItem('user', '')
    handleClose()
    router.push('/signin')
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Nutz Creations
          </Typography>
          <Button
            className={classes.themeToggleButton}
            onClick={props.onToggleThemeMode}
          >
            <LightThemeIcon />
            <DarkThemeIcon />
          </Button>
          {authenticated && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}> Logout </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
