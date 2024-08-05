import { createSlice } from '@reduxjs/toolkit'

export type ThemeState = {
  theme: 'light' | 'dark'
}

export const themeStateName = 'theme'

const getInitialTheme = (): ThemeState => {
  const savedTheme = localStorage.getItem('theme')
  return {
    theme: savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'light',
  }
}

const initialState: ThemeState = getInitialTheme()

const themeSlice = createSlice({
  name: themeStateName,
  initialState,
  reducers: {
    toggleTheme(state: ThemeState) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { actions, reducer, name } = themeSlice
