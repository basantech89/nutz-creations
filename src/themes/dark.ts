import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

import colors from './colors'
import { IThemeOptions } from './types'

const extended = {
  Header: {
    background: `linear-gradient(${colors.blue.dark}, ${colors.blue.medium})`,
    border: `1px solid ${colors.white.main}`
  }
}

const theme = createMuiTheme({
  name: 'dark',
  palette: {
    primary: {
      main: '#43425D'
    },
    secondary: {
      main: '#2E2C5B'
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

export default theme
