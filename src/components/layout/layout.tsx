import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Container } from '@mui/material'

import { AppBar } from '../appBar/appBar.tsx'

export const Layout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <main className="flex-1">
        <Container maxWidth="xl" sx={{ marginTop: '16px' }}>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}
