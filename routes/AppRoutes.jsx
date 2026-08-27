import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routeConfig } from './routeConfig'

// Criado uma única vez, fora do componente — recriar a cada render perderia
// estado do roteador (mesmo cuidado de qualquer valor "caro" em React).
const router = createBrowserRouter(routeConfig)

function AppRoutes() {
  return <RouterProvider router={router} />
}

export { AppRoutes }
