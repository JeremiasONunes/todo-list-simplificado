import { Link, useLocation } from 'react-router-dom'

import styles from '../styles/components/Header.module.css'

/**
 * Cabeçalho das rotas PÚBLICAS — desde que a área logada ganhou `Sidebar`
 * própria, este componente só existe dentro de `PublicLayout`, então volta
 * a ser simples: marca + Início/Sobre + Entrar, sem menu hambúrguer (3 itens
 * cabem numa linha em qualquer largura, diferente dos 6 que o nav
 * autenticado tinha) e sem checar sessão (mesma escolha do `AuthHeader` do
 * Lythra — só esconde "Entrar" na própria página de login, não baseado em
 * `autenticado`; alguém logado visitando uma rota pública é uma exceção
 * rara demais pra justificar mais uma ramificação aqui).
 */
function Header() {
  const { pathname } = useLocation()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.marca}>
        ToDo List
      </Link>
      <nav className={styles.nav} aria-label="Navegação principal">
        <Link to="/" className={styles.link}>
          Início
        </Link>
        <Link to="/sobre" className={styles.link}>
          Sobre
        </Link>
        {pathname !== '/login' ? (
          <Link to="/login" className={styles.entrar}>
            Entrar
          </Link>
        ) : null}
      </nav>
    </header>
  )
}

export { Header }
