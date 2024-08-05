import { ThemeState, themeStateName } from './store'

const getState = (store: { [key: string]: ThemeState }): ThemeState => store[themeStateName]

export const getTheme = (store: { [key: string]: ThemeState }): 'light' | 'dark' =>
  getState(store).theme
