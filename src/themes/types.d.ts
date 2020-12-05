import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

export interface ThemeCfgOption {
  [k: string]: string | number
}

export interface ThemeCfg {
  [k: string]: ThemeCfgOption
}

export declare interface ITheme extends Theme {
  cfg: ThemeCfg
  name: string
}

export declare interface IThemeOptions extends ThemeOptions {
  cfg: ThemeCfg
  name: string
}
