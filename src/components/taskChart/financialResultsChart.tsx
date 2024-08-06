import { useEffect, useRef, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Chart, TooltipItem, registerables } from 'chart.js'

import { fetchIssues } from '../../lib/api/axios.ts'
import { filterAndAggregateData } from '../../lib/utils/filterAndAggregateData.ts'

Chart.register(...registerables)

export const FinancialResultsChart = () => {
  const { t } = useTranslation()
  const [weekData, setWeekData] = useState<
    Record<number, { profit: number; expense: number; net: number }>
  >({})
  const [weeksCount, setWeeksCount] = useState(8)

  useEffect(() => {
    fetchIssues()
      .then((data) => {
        setWeekData(filterAndAggregateData(data, weeksCount))
      })
      .catch((error) => console.error(error))
  }, [weeksCount])

  const chartRef = useRef<Chart<'bar'>>()

  const handleWeeksChange = (event: SelectChangeEvent<number>) => {
    setWeeksCount(Number(event.target.value))
  }

  const chartData = {
    labels: Object.keys(weekData),
    datasets: [
      {
        label: 'Profit',
        data: Object.values(weekData).map((d) => d.profit),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: Object.values(weekData).map((d) => d.expense),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Net',
        data: Object.values(weekData).map((d) => d.net),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="w-full md:w-[85%] lg:w-[50%] h-[400px] flex flex-col gap-4">
      <h2>{t('closedTasks')}</h2>
      <FormControl fullWidth>
        <InputLabel id="weeksSelectLabel">{t('selectNumberOfWeeks')}</InputLabel>
        <Select
          labelId="weeksSelectLabel"
          id="weeksSelect"
          value={weeksCount}
          label={t('selectNumberOfWeeks')}
          onChange={handleWeeksChange}
        >
          <MenuItem value={1}>{t('oneWeek')}</MenuItem>
          <MenuItem value={2}>{t('twoWeeks')}</MenuItem>
          <MenuItem value={4}>{t('fourWeeks')}</MenuItem>
          <MenuItem value={8}>{t('eightWeeks')}</MenuItem>
          <MenuItem value={12}>{t('twelveWeeks')}</MenuItem>
        </Select>
      </FormControl>
      <Bar
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context: TooltipItem<'bar'>) => {
                  const value = context.raw as number
                  return `${context.dataset.label}: ${value / 1000}K`
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Week Number',
              },
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Amount (in thousands)',
              },
              ticks: {
                callback: (value) => `${(value as number) / 1000}K`,
              },
            },
          },
        }}
      />
    </div>
  )
}
