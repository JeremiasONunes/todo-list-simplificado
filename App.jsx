import { AuthProvider } from './context/AuthContext'
import { AppRoutes } from './routes/AppRoutes'

// Componente raiz — `AuthProvider` precisa envolver `AppRoutes` (não o
// contrário), porque `RequireAuth` e o próprio `Header` (dentro de
// `AppLayout`, que é renderizado pelas rotas) consomem `useAuth()`.
export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
