import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import { appRoutersConfig } from './lib/configs/routerConfig.tsx'
import { RootState } from './store'
import { themeSelectors } from './store/theme'

const App: FC = () => {
  const theme = useSelector((state: RootState) => themeSelectors.getTheme(state))

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      background: {
        default: theme === 'light' ? '#fff' : '#121212',
      },
      text: {
        primary: theme === 'light' ? '#000' : '#fff',
      },
    },
    spacing: 4,
  })
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <RouterProvider router={appRoutersConfig}></RouterProvider>
    </ThemeProvider>
  )
}

export default App
