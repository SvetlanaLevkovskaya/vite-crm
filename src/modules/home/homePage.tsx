import { FC } from 'react'

import { Container, Grid } from '@mui/material'

import { Comments } from '../../components/comments/comments.tsx'
import { TopDesigners } from '../../components/topDesigners/topDesigners.tsx'

export const HomePage: FC = () => {
  return (
    <Container sx={{ minHeight: 'calc(100vh - 82px)', my: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Comments />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopDesigners />
        </Grid>
      </Grid>
    </Container>
  )
}
