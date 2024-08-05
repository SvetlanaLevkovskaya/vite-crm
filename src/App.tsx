import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { appRoutersConfig } from './lib/configs/routerConfig.tsx'
import { getMuiTheme } from './lib/theme/config.ts'
import { getTheme } from './store/theme/selectors.ts'

const App: FC = () => {
  const theme = useSelector(getTheme)

  const muiTheme = getMuiTheme(theme)

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <RouterProvider router={appRoutersConfig}></RouterProvider>
    </ThemeProvider>
  )
}

export default App
