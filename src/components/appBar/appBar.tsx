import { FC, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  MenuItem,
  AppBar as MuiAppBar,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import i18next from 'i18next'

import { AppRoutes } from '../../lib/configs/routes.ts'
import { getWorkingWeekNumber } from '../../lib/utils/weekNumber'
import { RootState } from '../../store'
import { themeActions, themeSelectors } from '../../store/theme'

interface LinkItem {
  to: string
  label: string
}

export const AppBar: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useSelector((state: RootState) => themeSelectors.getTheme(state))
  const { t } = useTranslation()

  const themeInstance = useTheme()
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('sm'))

  const workingWeekNumber = getWorkingWeekNumber()

  const handleThemeToggle = () => {
    dispatch(themeActions.toggleTheme())
  }

  const handleLocaleChange = (event: SelectChangeEvent) => {
    i18next.changeLanguage(event.target.value)
  }

  const links: LinkItem[] = [
    { to: AppRoutes.issue, label: t('tasks') },
    { to: AppRoutes.designer, label: t('designers') },
  ]

  const handleTabChange = (event: SyntheticEvent<Element, Event>, newValue: string) => {
    console.log(event)
    navigate(newValue)
  }

  const handleTitleClick = () => {
    navigate(AppRoutes.home)
  }

  return (
    <MuiAppBar position="static">
      <Toolbar
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          padding: isMobile ? '8px 16px' : '8px',
        }}
      >
        <Typography
          variant="h6"
          style={{
            flexGrow: 1,
            minWidth: '150px',
            textAlign: isMobile ? 'center' : 'left',
            cursor: 'pointer',
          }}
          onClick={handleTitleClick}
        >
          {t('CRM System')}
        </Typography>

        <Tabs
          value={location.pathname}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              maxHeight: 65.5,
            },
          }}
        >
          {links.map((link, index) => (
            <Tab key={index} label={<Box>{link.label}</Box>} value={link.to} />
          ))}
        </Tabs>

        <Box
          display="flex"
          alignItems="center"
          style={{ marginTop: isMobile ? '8px' : '0', flexDirection: isMobile ? 'column' : 'row' }}
        >
          <Typography
            variant="button"
            style={{
              marginRight: isMobile ? '0' : '16px',
              minWidth: '120px',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            {t('Week Number')}: {workingWeekNumber}
          </Typography>

          <Button
            color="inherit"
            onClick={handleThemeToggle}
            style={{ marginBottom: isMobile ? '8px' : '0' }}
          >
            {theme === 'light' ? t('Dark Mode') : t('Light Mode')}
          </Button>

          <Select
            value={i18next.language}
            onChange={handleLocaleChange}
            style={{
              color: '#fff',
              marginLeft: isMobile ? '0' : '16px',
              marginTop: isMobile ? '8px' : '0',
              border: 'none',
              fontSize: '14px',
              minWidth: '80px',
            }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
