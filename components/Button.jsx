import styles from '../styles/components/Button.module.css'

/**
 * Botão-base do Design System — variantes viram classe CSS (`.primary`/
 * `.secondary`/`.ghost`/`.danger`), nunca uma função geradora de string tipo
 * `cva`. Mesmo padrão de componente do Lythra: função simples, props espalhadas
 * pro elemento nativo (`{...props}`), sem biblioteca por baixo.
 * @param {{ variant?: 'primary'|'secondary'|'ghost'|'danger', size?: 'sm'|'md'|'lg', className?: string }} props
 */
function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
