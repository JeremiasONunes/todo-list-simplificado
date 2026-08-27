import { forwardRef } from 'react'
import styles from '../styles/components/Input.module.css'
const Input = forwardRef(function Input({ label, id, error, className = '', ...props }, ref) {
  return (
    <div className={styles.field}>
      {label ? (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
        {...props}
      />
      {error ? (
        <span role="alert" className={styles.errorText}>
          {error}
        </span>
      ) : null}
    </div>
  )
})
export { Input }
