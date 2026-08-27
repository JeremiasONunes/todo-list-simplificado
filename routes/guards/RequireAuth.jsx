import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

/** Guarda de rota — sem sessão, redireciona pra `/login`. Nó sem `path` em
 * `routeConfig.jsx`, protege qualquer `<Outlet />` aninhado abaixo dele.
 * Enquanto `carregando` (hidratação da sessão ainda em andamento), não
 * decide nada — evita mandar pra `/login` alguém que na verdade tem sessão,
 * só ainda não confirmada. */
function RequireAuth() {
  const { autenticado, carregando } = useAuth()

  if (carregando) {
    return null
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export { RequireAuth }
