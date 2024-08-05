import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'

import { fetchComments } from '../../lib/api/axios.ts'
import { getRelativeTime } from '../../lib/utils/getRelativeTime.ts'
import { truncatedMessage } from '../../lib/utils/truncatedMessage.ts'
import { Comment } from '../../types/comments.ts'

export const Comments: FC = () => {
  const [comments, setComments] = useState<Comment[]>([])

  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language

  useEffect(() => {
    fetchComments()
      .then((data) => setComments(data.slice(0, 10)))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Box mb={3}>
        <Typography variant="h6">{t('latestComments')}</Typography>
      </Box>
      <Stack gap={5}>
        {comments.map((comment) => (
          <Paper key={comment.id} elevation={3} sx={{ padding: 3, minHeight: '160px' }}>
            <Box display="flex" alignItems="center" gap={3} marginBottom={3}>
              <Avatar src={comment.designer.avatar} alt={comment.designer.username} />
              <Typography variant="body1">
                <strong>{t('name')}:</strong> {comment.designer.username}
              </Typography>
            </Box>
            <Typography variant="body2">
              <strong>{t('relativeTime')}:</strong>{' '}
              {getRelativeTime(comment.date_created, currentLocale)}
            </Typography>
            <Typography variant="body2">
              <strong>{t('task')}:</strong> {comment.issue}
            </Typography>
            <Typography variant="body2">
              <strong>{t('message')}:</strong> {truncatedMessage(comment.message)}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </>
  )
}
