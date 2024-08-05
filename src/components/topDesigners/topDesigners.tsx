import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar, Box, Paper, Typography } from '@mui/material'

import { fetchDesigners } from '../../lib/api/axios.ts'
import { calculateMedian } from '../../lib/utils/calculateMedian.ts'
import { calculateTimeSpent } from '../../lib/utils/calculateTimeSpent.ts'
import { Designer } from '../../types/designers.ts'

export const TopDesigners: FC = () => {
  const { t } = useTranslation()
  const [designers, setDesigners] = useState<Designer[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const designersData: Designer[] = await fetchDesigners()

        const designerStats = designersData.map((designer) => {
          const completedIssues = designer.issues.filter((issue) => issue.status === 'Done')
          const times = completedIssues.map((issue) => calculateTimeSpent(issue))

          return {
            ...designer,
            medianTime: calculateMedian(times),
            completedTasks: completedIssues.length,
          }
        })

        designerStats.sort(
          (a, b) => a.medianTime! - b.medianTime! || b.completedTasks! - a.completedTasks!
        )
        setDesigners(designerStats.slice(2, 12))
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        {t('topDesigners')}
      </Typography>
      {designers.map((designer) => (
        <Paper
          key={designer.username}
          elevation={3}
          style={{
            marginBottom: '20px',
            padding: '10px',
            minHeight: '150px',
          }}
        >
          <Box display="flex" alignItems="center" style={{ marginBottom: '12px' }}>
            <Avatar src={designer.avatar} alt={designer.username} style={{ marginRight: '10px' }} />
            <Typography variant="body1">
              <strong>{t('name')}:</strong> {designer.username}
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>{t('medianTime')}:</strong> {(designer?.medianTime as number).toFixed(2)} час
          </Typography>
          <Typography variant="body2">
            <strong>{t('completedTasks')}:</strong> {designer.completedTasks} задач
          </Typography>
        </Paper>
      ))}
    </>
  )
}
