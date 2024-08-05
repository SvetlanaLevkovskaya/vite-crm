import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar, Box, Paper, Typography } from '@mui/material'

import { fetchComments } from '../../lib/api/axios.ts'
import { getRelativeTime } from '../../lib/utils/getRelativeTime.ts'
import { Comment } from '../../types/comments.ts'

export const Comments: FC = () => {
  const [comments, setComments] = useState<Comment[]>([])

  const { t } = useTranslation()

  useEffect(() => {
    fetchComments()
      .then((data) => setComments(data.slice(0, 10)))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        {t('latestComments')}
      </Typography>
      {comments.map((comment) => (
        <Paper
          key={comment.id}
          elevation={3}
          style={{
            marginBottom: '20px',
            padding: '10px',
            minHeight: '150px',
          }}
        >
          <Box display="flex" alignItems="center" style={{ marginBottom: '12px' }}>
            <Avatar
              src={comment.designer.avatar}
              alt={comment.designer.username}
              style={{ marginRight: '10px' }}
            />
            <Typography variant="body1">
              <strong>{t('name')}:</strong> {comment.designer.username}
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>{t('relativeTime')}:</strong> {getRelativeTime(comment.date_created)}
          </Typography>
          <Typography variant="body2">
            <strong>{t('task')}:</strong> {comment.issue}
          </Typography>
          <Typography variant="body2">
            <strong>{t('message')}:</strong> {comment.message}
          </Typography>
        </Paper>
      ))}
    </>
  )
}
