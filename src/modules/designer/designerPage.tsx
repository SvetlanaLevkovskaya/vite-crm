import { ChangeEvent, FC, useEffect, useState } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'

import { fetchDesigners } from '../../lib/api/axios.ts'
import { Designer } from '../../types/designers.ts'

export const DesignerPage: FC = () => {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [status] = useState<string | undefined>(undefined)
  const [key] = useState<string | undefined>(undefined)
  const [ordering] = useState<string | undefined>('username')
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(16)
  const [totalCount] = useState<number>(0)

  useEffect(() => {
    fetchDesigners(status, key, ordering, page, limit).then(setDesigners).catch(console.error)
  }, [status, key, ordering, page, limit])

  const handlePageChange = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage + 1)
  }

  const handleLimitChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLimit(event.target.value as number)
    setPage(1)
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Designers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Closed Tasks</TableCell>
              <TableCell>In Progress Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designers.map((designer) => (
              <TableRow key={designer.username}>
                <TableCell>
                  <img src={designer.avatar} alt={`${designer.username}'s avatar`} width="50" />
                </TableCell>
                <TableCell>{designer.username}</TableCell>
                <TableCell>{designer.email}</TableCell>
                <TableCell>{designer.closedTasksCount}</TableCell>
                <TableCell>{designer.inProgressTasksCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        onPageChange={handlePageChange}
        rowsPerPage={limit}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPageOptions={[16, 32, 64, 128]}
      />
    </div>
  )
}
