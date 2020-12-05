import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

import colors from './colors'
import { IThemeOptions } from './types'

const extended = {
  Header: {
    background: `linear-gradient(to top, ${colors.white.medium} 0%, ${colors.white.light} 100%)`,
    border: `1px solid ${colors.blue.light}`
  }
}

const light = createMuiTheme({
  name: 'light',
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  cfg: extended
} as IThemeOptions)

export default light
