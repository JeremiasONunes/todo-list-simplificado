import { forwardRef } from 'react'

import styles from '../styles/components/Select.module.css'

/**
 * Nasce na Fase 5 (não na Fase 1) — só agora existe um consumidor real:
 * prioridade em `TaskForm` + status/prioridade/ordenação em `TaskFilters`,
 * 4 usos de uma vez. Mesmo motivo de `forwardRef` do `Input`: React Hook Form
 * precisa do `ref` chegando no `<select>` nativo.
 * @param {{ label?: string, id?: string, error?: string, className?: string, children: import('react').ReactNode }} props
 */
const Select = forwardRef(function Select(
  { label, id, error, className = '', children, ...props },
  ref,
) {
  return (
    <div className={styles.field}>
      {label ? (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={`${styles.select} ${error ? styles.selectError : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <span role="alert" className={styles.errorText}>
          {error}
        </span>
      ) : null}
    </div>
  )
})

export { Select }
