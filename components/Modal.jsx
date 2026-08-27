import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

import styles from '../styles/components/Modal.module.css'

/**
 * Nasce na Fase 5 — 1º consumidor real: editar tarefa e confirmar exclusão
 * em `TaskCard`. Implementado na mão (sem biblioteca), mesmo padrão do
 * Lythra: fecha com `Esc`, foco entra no diálogo ao abrir e volta pro
 * elemento que abriu ao fechar, `role="dialog"` + `aria-modal` +
 * `aria-labelledby`. Sem ciclo de `Tab` preso dentro do modal (focus trap
 * completo) — de propósito, mantém o componente simples; o essencial de
 * acessibilidade (fechar, foco não se perder) já está coberto.
 *
 * `createPortal` pro `document.body`: `TaskCard` abre este `Modal` de
 * DENTRO de um `Card` (glass, `backdrop-filter` no CSS). `backdrop-filter`
 * — assim como `transform`/`filter`/`perspective`/`will-change` — cria um
 * novo *containing block* pros descendentes `position: fixed`, então sem o
 * portal o overlay `inset: 0` do modal ficaria "preso" ao retângulo do
 * card (bem menor que a tela) em vez de cobrir a viewport inteira. Renderizar
 * fora da árvore do `Card` evita esse containing block por completo — é o
 * motivo pelo qual `createPortal` existe e a solução padrão do React pra
 * modal, não uma abstração a mais.
 */
function Modal({ open, onClose, title, children }) {
  const titleId = useId()
  const dialogRef = useRef(null)
  const previouslyFocusedRef = useRef(null)

  useEffect(() => {
    if (!open) return

    previouslyFocusedRef.current = document.activeElement
    dialogRef.current?.focus()

    function aoTeclar(evento) {
      if (evento.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      previouslyFocusedRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={styles.dialog}
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className={styles.closeButton}>
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export { Modal }
