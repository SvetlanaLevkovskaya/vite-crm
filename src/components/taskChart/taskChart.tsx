import { useEffect, useRef, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { Chart, TooltipItem, registerables } from 'chart.js'

import { fetchIssues } from '../../lib/api/axios.ts'
import { filterAndAggregateData } from '../../lib/utils/filterAndAggregateData.ts'

Chart.register(...registerables)

export const TaskChart = () => {
  const { t } = useTranslation()
  const [weekData, setWeekData] = useState<
    Record<number, { profit: number; expense: number; net: number }>
  >({})

  useEffect(() => {
    fetchIssues()
      .then((data) => setWeekData(filterAndAggregateData(data, 8)))
      .catch((error) => console.error(error))
  }, [])

  const chartRef = useRef<Chart<'bar'>>()

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
    <div className="w-full md:w-[85%] lg:w-[50%] h-[400px]">
      <h2>{t('closedTasks')}</h2>
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
