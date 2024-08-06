import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { ArcElement, Chart, ChartOptions, Legend, Tooltip } from 'chart.js'

import { fetchDesigners } from '../../lib/api/axios.ts'
import { Designer } from '../../types/designers.ts'

Chart.register(ArcElement, Tooltip, Legend)

export const TaskPie: React.FC = () => {
  const { t } = useTranslation()
  const [statusCounts, setStatusCounts] = useState<{
    Done: number
    'In Progress': number
    New: number
  }>({ Done: 0, 'In Progress': 0, New: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const designersData: Designer[] = await fetchDesigners()
        const counts = { Done: 0, 'In Progress': 0, New: 0 }

        designersData.forEach((designer) => {
          designer.issues.forEach((issue) => {
            if (counts[issue.status] !== undefined) {
              counts[issue.status]++
            }
          })
        })

        setStatusCounts(counts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const data = {
    labels: ['Done', 'In Progress', 'New'],
    datasets: [
      {
        data: [statusCounts.Done, statusCounts['In Progress'], statusCounts.New],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || ''
            const value = (context.raw as number) || 0
            return `${label}: ${value}`
          },
        },
      },
    },
  }

  return (
    <div className="w-full md:w-[85%] lg:w-[50%] h-[400px]">
      <h2>{t('allTasksStatusPie')}</h2>

      <Pie data={data} options={options} />
    </div>
  )
}
