import { BarChart3, CheckSquare, Home, LogOut } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import styles from '../styles/components/Sidebar.module.css'

// Array de dados, não 3 blocos de JSX quase idênticos — mesmo raciocínio já
// usado em `LandingFeatures`. Diferente do Lythra (`useNavigationItems`, que
// varia por PAPEL — Leitor x Administrador), aqui a lista é fixa: este app
// só tem um tipo de usuário, então um hook dedicado só reimplementaria um
// `return itens` sem nenhuma decisão de verdade dentro.
//
// Ícones de linha (`lucide-react`, a mesma biblioteca do Lythra) no lugar de
// emoji — emoji como ícone de navegação é inconsistente entre sistema
// operacional/navegador e lê como "protótipo", não como produto acabado.
const ITENS = [
  { rota: '/dashboard', rotulo: 'Painel', icon: Home },
  { rota: '/tasks', rotulo: 'Tarefas', icon: CheckSquare },
  { rota: '/analytics', rotulo: 'Analytics', icon: BarChart3 },
]

/**
 * Nasce nesta fase — substitui os links "Painel/Minhas tarefas/Analytics/
 * Sair" que viviam dentro de `Header` por uma navegação própria da área
 * logada, mesmo princípio do `AppNavigation` do Lythra: barra inferior fixa
 * no mobile (ícone em cima, rótulo embaixo), sidebar em fluxo normal a
 * partir do tablet. `NavLink` (não `Link`) marca a rota ativa sozinho, sem
 * comparar `pathname` na mão.
 *
 * Sem `UserMenu` separado (Lythra tem um, com Meu Perfil/Configurações/
 * Sair) — este app não tem essas telas, só UMA ação de conta (Sair), então
 * um menu suspenso só pra ela seria abstração sem uso real; "Sair" entra
 * como mais um item da mesma lista.
 */
function Sidebar() {
  const { logout } = useAuth()

  // Só `logout()` — sem `navigate()` explícito. Cheguei a tentar navegar pra
  // `/` na mão, nas duas ordens possíveis, e as duas perdem pro `RequireAuth`
  // que já envolve a rota atual: ele reage à mudança de `autenticado` dentro
  // de um `useEffect` (do `<Navigate>` interno do React Router), que sempre
  // dispara DEPOIS de uma chamada síncrona feita aqui, então sempre vence a
  // corrida e manda pra `/login`. Em vez de lutar contra isso, aceito o
  // resultado — cair no login logo após sair é um destino tão razoável
  // quanto a Landing, e é o único que se comporta de forma confiável.
  function aoSair() {
    logout()
  }

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <Link to="/" className={styles.marca}>
        ToDo List
      </Link>

      <ul className={styles.lista}>
        {ITENS.map(({ rota, rotulo, icon }) => {
          const Icon = icon
          return (
            <li key={rota}>
              <NavLink
                to={rota}
                end
                className={({ isActive }) => `${styles.item} ${isActive ? styles.ativo : ''}`}
              >
                <Icon size={20} aria-hidden="true" />
                <span className={styles.itemRotulo}>{rotulo}</span>
              </NavLink>
            </li>
          )
        })}
        <li>
          {/* Ação, não navegação — por isso `<button>`, mesma distinção já
           * usada em toda a Landing/Header. */}
          <button type="button" onClick={aoSair} className={styles.item}>
            <LogOut size={20} aria-hidden="true" />
            <span className={styles.itemRotulo}>Sair</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export { Sidebar }
