import { AlertTriangle } from 'lucide-react'

import { EmptyState } from './EmptyState'
import styles from '../styles/components/PageStateBoundary.module.css'

/**
 * Nasce na Fase 6, quando `DashboardPage` se torna o 2º lugar (depois de
 * `TasksPage`) que precisa do mesmo `if`/`else` de carregando/erro — mesmo
 * gatilho que o comentário original em `TasksPage` já previa. Mesma FORMA de
 * API do `PageStateBoundary` do Lythra (`carregando`/`erro`/`vazio`/
 * `recarregar`/`estadoVazio`), simplificada: sem `LoadingList` (skeleton) —
 * este projeto não tem esse componente e um texto "Carregando..." já
 * resolve. O ícone do estado de erro (`AlertTriangle`) é o MESMO que o
 * Lythra usa pro mesmo caso — não por coincidência, é o ícone certo pra essa
 * mensagem em qualquer um dos dois projetos.
 *
 * Convenção (igual ao Lythra): `carregando` sempre que a leitura ainda não
 * resolveu; `erro` é falha da leitura em si (nunca confundir com "vazio",
 * que é sucesso sem registros); `vazio`+`estadoVazio` é opcional — nem toda
 * página passa (ex.: `TasksPage`, onde `TaskList` já decide sozinho entre
 * dois textos de vazio diferentes, "sem tarefas" x "filtro sem resultado").
 * @param {{
 *   carregando: boolean,
 *   erro?: unknown,
 *   vazio?: boolean,
 *   recarregar?: () => void,
 *   mensagemCarregando?: string,
 *   estadoVazio?: { icon: import('react').ComponentType, title: string, description?: string, actionLabel?: string, onAction?: () => void },
 *   children: import('react').ReactNode,
 * }} props
 */
function PageStateBoundary({
  carregando,
  erro,
  vazio = false,
  recarregar,
  mensagemCarregando = 'Carregando...',
  estadoVazio,
  children,
}) {
  if (carregando) {
    return <p className={styles.status}>{mensagemCarregando}</p>
  }

  if (erro) {
    return (
      <div className={styles.status} role="alert">
        <EmptyState
          icon={AlertTriangle}
          title="Algo deu errado"
          description="Não foi possível carregar os dados."
          actionLabel={recarregar ? 'Tentar novamente' : undefined}
          onAction={recarregar}
        />
      </div>
    )
  }

  if (vazio && estadoVazio) {
    return (
      <div className={styles.status}>
        <EmptyState {...estadoVazio} />
      </div>
    )
  }

  return children
}

export { PageStateBoundary }
