import styles from '../styles/components/Badge.module.css'

/**
 * Rótulo pequeno de status/categoria — nasce agora, sem nenhum consumidor
 * ainda, porque é a peça que `PriorityBadge`/`StatusBadge` (Fase 5, Tasks) vão
 * compor por cima; ainda assim é só isto, um `<span>` + tom de cor, não uma
 * antecipação de complexidade que a Fase 5 não vai usar.
 * @param {{ tone?: 'neutral'|'primary'|'secondary'|'danger'|'success' }} props
 */
function Badge({ children, tone = 'neutral', className = '' }) {
  return <span className={`${styles.badge} ${styles[tone]} ${className}`}>{children}</span>
}

export { Badge }
