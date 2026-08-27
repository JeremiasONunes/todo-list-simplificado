import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import buttonStyles from '../styles/components/Button.module.css'
import styles from '../styles/pages/NotFoundPage.module.css'
function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <span className={styles.codigo}>404</span>
        <h1 className={styles.titulo}>Página não encontrada</h1>
        <p className={styles.descricao}>A página que você procura não existe ou foi movida.</p>
        <Link to="/" className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.md}`}>
          Voltar para o início
        </Link>
      </Card>
    </div>
  )
}
export { NotFoundPage }
