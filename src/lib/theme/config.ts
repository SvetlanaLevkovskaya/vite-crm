import { Theme, createTheme } from '@mui/material/styles'

export const getMuiTheme = (themeMode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === 'light' ? '#fff' : '#121212',
      },
      text: {
        primary: themeMode === 'light' ? '#000' : '#fff',
      },
    },
    spacing: 4,
  })
}
