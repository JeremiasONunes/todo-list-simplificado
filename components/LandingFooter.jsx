import { Link } from 'react-router-dom'
import styles from '../styles/components/LandingFooter.module.css'

function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <span className={styles.marca}>ToDo List</span>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Início
        </Link>
        <Link to="/sobre" className={styles.link}>
          Sobre
        </Link>
        <Link to="/tasks" className={styles.link}>
          Minhas tarefas
        </Link>
      </nav>
      <p className={styles.copyright}>
        Desenvolvido por Jeremias O Nunes — projeto de estudo em React.
      </p>
    </footer>
  )
}

export { LandingFooter }
