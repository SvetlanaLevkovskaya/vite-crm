import { FC } from 'react'

import { Container } from '@mui/material'

import { TaskChart } from '../../components/taskChart/taskChart.tsx'
import { TaskPie } from '../../components/taskPie/taskPie.tsx'

export const TasksPage: FC = () => {
  return (
    <Container
      sx={{
        minHeight: 'calc(100vh - 82px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (min-width: 1028px)': {
          flexDirection: 'row',
        },
      }}
    >
      <TaskChart />

      <TaskPie />
    </Container>
  )
}
