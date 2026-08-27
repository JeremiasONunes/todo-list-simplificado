import { Link} from 'react-router-dom'

import { Card } from './Card'
import buttonStyles from '../styles/components/Button.module.css'
import styles from '../styles/components/RouteErrorBoundary.module.css'

/**
 * `errorElement` do roteador — se qualquer componente de uma rota lançar um
 * erro durante a renderização, isto aparece no lugar, em vez da tela ficar
 * em branco sem nenhuma pista do que aconteceu. `useRouteError()` é o hook
 * do React Router que devolve o erro capturado.
 */
function RouteErrorBoundary() {
 

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <h1 className={styles.titulo}>Algo deu errado</h1>
        <p className={styles.descricao}>
          Não foi possível carregar esta página. Tente voltar para o início.
        </p>
        {/* `Link` de verdade (não um `<button onClick={navigate}>`) — é navegação, não uma
         * ação com efeito colateral; mesma decisão já documentada no Lythra. Reaproveita as
         * classes do `Button` (aparência), sem envolver um `<button>` de verdade. */}
        <Link
          to="/"
          className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.md}`}
        >
          Voltar para o início
        </Link>
      </Card>
    </div>
  )
}

export { RouteErrorBoundary }
