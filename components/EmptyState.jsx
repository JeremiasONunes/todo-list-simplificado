import { Button } from './Button'
import styles from '../styles/components/EmptyState.module.css'

/**
 * Nasce na Fase 5 — antes disso não existia nenhuma lista que pudesse vir
 * vazia de um jeito que precisasse de explicação (Landing é estática).
 *
 * `actionLabel`/`onAction` chegam na Fase 6: `PageStateBoundary` reusa este
 * mesmo componente pro estado de ERRO (precisa de um "Tentar novamente"), não
 * só pra "lista vazia" (que na maioria das vezes não tem ação nenhuma) — por
 * isso os dois continuam opcionais, os 2 usos existentes em `TaskList` nem
 * passam essas props.
 *
 * `titleAs` chega na Fase 8 (auditoria de hierarquia de heading): a maioria
 * dos usos (`TaskList`, `PageStateBoundary`) é o único conteúdo depois do
 * `<h1>` da página, então precisa ser `h2`; o único caso aninhado (dentro do
 * card "Próximas tarefas" de `DashboardPage`, que já É um `h2`) passa
 * `titleAs="h3"` explicitamente. Sem isso, um dos dois contextos sempre
 * pularia um nível — problema real que um leitor de tela sente, não só
 * estético.
 *
 * `icon` (componente `lucide-react`) troca de lugar com `emoji` (string)
 * nesta fase — mesma decisão já tomada em `Sidebar`/`LandingFeatures`, agora
 * estendida a TODA a superfície de emoji-como-ícone do app: um conjunto de
 * ícones de linha consistente lê como produto acabado, emoji variado lê
 * como rascunho. É também exatamente a forma que o `EmptyState`/
 * `PageStateBoundary` do Lythra já usam (`icon={AlertTriangle}`).
 * @param {{ icon: import('react').ComponentType, title: string, description?: string, actionLabel?: string, onAction?: () => void, titleAs?: 'h2'|'h3' }} props
 */
function EmptyState({ icon, title, description, actionLabel, onAction, titleAs = 'h2' }) {
  const Icon = icon
  const Titulo = titleAs
  return (
    <div className={styles.wrapper}>
      <span className={styles.iconWrapper} aria-hidden="true">
        <Icon size={28} />
      </span>
      <Titulo className={styles.title}>{title}</Titulo>
      {description ? <p className={styles.description}>{description}</p> : null}
      {actionLabel && onAction ? (
        <Button type="button" variant="secondary" size="sm" onClick={onAction} className={styles.acao}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

export { EmptyState }
