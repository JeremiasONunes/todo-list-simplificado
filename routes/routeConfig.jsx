import { AuthenticatedLayout } from '../components/AuthenticatedLayout'
import { PublicLayout } from '../components/PublicLayout'
import { RouteErrorBoundary } from '../components/RouteErrorBoundary'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { CadastroPage } from '../pages/CadastroPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { RecuperarSenhaPage } from '../pages/RecuperarSenhaPage'
import { Sobre } from '../pages/Sobre'
import { TasksPage } from '../pages/TasksPage'
import { RequireAuth } from './guards/RequireAuth'

/**
 * Árvore de rotas como DADO (array) — cada Fase adiciona a própria rota
 * quando a página correspondente é de fato construída, nunca antes.
 *
 * Dois RAMOS de topo, mesma estrutura do Lythra (`routes/routeConfig.jsx`
 * de lá): um público (`PublicLayout` — `Header`) e um autenticado
 * (`RequireAuth` → `AuthenticatedLayout` — `Sidebar`), cada um com o próprio
 * `errorElement` (não há ancestral comum entre os dois pra herdar de um só
 * lugar). Até esta fase existia um único `AppLayout` pra tudo — só passou a
 * valer a pena separar quando a área logada ganhou uma navegação
 * (`Sidebar`) visualmente diferente da pública (`Header`), não antes.
 *
 * `*` (pega-tudo) mora no ramo PÚBLICO, não no autenticado — igual ao
 * Lythra: uma URL inexistente cai no 404 com o `Header` público, mesmo se
 * quem visitou está logado (não há como saber, antes de casar a rota, que
 * "/alguma-coisa-errada" seria uma tentativa de rota autenticada).
 */
const routeConfig = [
  {
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/cadastro', element: <CadastroPage /> },
      { path: '/recuperar-senha', element: <RecuperarSenhaPage /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/tasks', element: <TasksPage /> },
          { path: '/analytics', element: <AnalyticsPage /> },
        ],
      },
    ],
  },
]

export { routeConfig }
