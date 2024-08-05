import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '../../components/layout/layout.tsx'
import { DesignerPage } from '../../modules/designer/designerPage.tsx'
import { HomePage } from '../../modules/home/homePage'
import { TasksPage } from '../../modules/tasks/tasksPage.tsx'

import { AppRoutes } from './routes'

export const appRoutersConfig = createBrowserRouter([
  {
    path: AppRoutes.home,
    element: <Layout />,
    children: [
      {
        path: AppRoutes.home,
        element: <HomePage />,
      },
      {
        path: AppRoutes.tasks,
        element: <TasksPage />,
      },
      {
        path: AppRoutes.designer,
        element: <DesignerPage />,
      },
    ],
  },
])
