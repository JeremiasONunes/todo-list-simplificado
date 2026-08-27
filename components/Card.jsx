import styles from '../styles/components/Card.module.css'

/**
 * Superfície "glass" reutilizável — hoje toda montada na mão em cada tela via
 * classe Tailwind `glass-effect` colada em várias `<div>`s diferentes (mesmo
 * efeito, escrito 5+ vezes). Vira este componente único.
 */
function Card({ children, onClick, className = '', ...props }) {
  return (
    <div
      className={`${styles.card} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card }
