import { FC } from 'react'

import { Container } from '@mui/material'

import { FinancialResultsChart } from '../../components/taskChart/financialResultsChart.tsx'
import { TaskPie } from '../../components/taskPie/taskPie.tsx'

export const TasksPage: FC = () => {
  return (
    <Container
      sx={{
        minHeight: 'calc(100vh - 82px)',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: '128px',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (min-width: 1028px)': {
          flexDirection: 'row',
        },
      }}
    >
      <FinancialResultsChart />

      <TaskPie />
    </Container>
  )
}
