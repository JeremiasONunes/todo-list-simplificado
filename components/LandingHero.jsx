import { Link } from 'react-router-dom'

import buttonStyles from '../styles/components/Button.module.css'
import styles from '../styles/components/LandingHero.module.css'

/**
 * Abertura da Landing — `Link` estilizada com as classes do `Button` (não um
 * `<button onClick={navigate}>`), mesma razão já documentada no Lythra: é
 * navegação de verdade, o elemento certo preserva Ctrl+clique/nova guia.
 *
 * CTA aponta pra `/cadastro` desde a Fase 4 (antes apontava pra `/tasks`,
 * único destino que existia até a Autenticação nascer).
 */
function LandingHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.badge}>Grátis, sem instalar nada</span>
      <h1 className={styles.titulo}>Organize suas tarefas. Entenda sua produtividade.</h1>
      <p className={styles.subtitulo}>
        Crie, priorize e acompanhe suas tarefas num só lugar — e enxergue, com dados de verdade,
        como sua rotina está evoluindo.
      </p>
      <div className={styles.acoes}>
        <Link
          to="/cadastro"
          className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.lg}`}
        >
          Começar agora
        </Link>
        <a href="#funcionalidades" className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.lg}`}>
          Ver como funciona
        </a>
      </div>
    </section>
  )
}

export { LandingHero }
