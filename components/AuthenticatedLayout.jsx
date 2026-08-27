import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import styles from '../styles/components/AuthenticatedLayout.module.css'

/**
 * "Casca" da área logada — substitui `AppLayout` (agora `PublicLayout`) só
 * pras rotas atrás de `RequireAuth`, mesmo papel do `ReaderLayout` do
 * Lythra. Renderiza `Sidebar` uma vez, `<Outlet />` recebe a página ativa
 * (`DashboardPage`/`TasksPage`/`AnalyticsPage`).
 *
 * Link "Pular para o conteúdo" duplicado de `PublicLayout` (não
 * compartilhado — são duas árvores de DOM diferentes) — mesmo motivo lá:
 * primeiro elemento focável da página, deixa quem navega só por teclado
 * pular a navegação sem precisar Tab por ela toda vez.
 */
function AuthenticatedLayout() {
  return (
    <div className={styles.wrapper}>
      <a href="#conteudo-principal" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <Sidebar />
      <main id="conteudo-principal" className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export { AuthenticatedLayout }
