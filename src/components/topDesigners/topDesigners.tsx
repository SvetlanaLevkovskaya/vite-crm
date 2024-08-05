import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'

import { fetchDesigners } from '../../lib/api/axios.ts'
import { calculateMedian } from '../../lib/utils/calculateMedian.ts'
import { calculateTimeSpent } from '../../lib/utils/calculateTimeSpent.ts'
import { getDurationText, getTasksText } from '../../lib/utils/pluralize.ts'
import { Designer } from '../../types/designers.ts'

export const TopDesigners: FC = () => {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language
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
      <Box mb={3}>
        <Typography variant="h6">{t('topDesigners')}</Typography>
      </Box>
      <Stack gap={5}>
        {designers.map((designer) => (
          <Paper key={designer.username} elevation={3} sx={{ padding: 3, minHeight: '160px' }}>
            <Box display="flex" alignItems="center" gap={3} marginBottom={3}>
              <Avatar src={designer.avatar} alt={designer.username} />
              <Typography variant="body1">
                <strong>{t('name')}:</strong> {designer.username}
              </Typography>
            </Box>
            <Typography variant="body2">
              <strong>{t('medianTime')}:</strong>{' '}
              {getDurationText((designer?.medianTime as number).toFixed(2), currentLocale)}
            </Typography>
            <Typography variant="body2">
              <strong>{t('completedTasks')}:</strong>{' '}
              {getTasksText(designer.completedTasks, currentLocale)}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </>
  )
}
