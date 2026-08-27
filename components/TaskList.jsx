import { ClipboardList, SearchX } from 'lucide-react'

import { EmptyState } from './EmptyState'
import { TaskCard } from './TaskCard'
import styles from '../styles/components/TaskList.module.css'

/** @param {{ tasks: object[], temFiltroAtivo: boolean, onAlterada: () => void }} props */
function TaskList({ tasks, temFiltroAtivo, onAlterada }) {
  if (tasks.length === 0) {
    return temFiltroAtivo ? (
      <EmptyState
        icon={SearchX}
        title="Nenhuma tarefa encontrada"
        description="Tente ajustar a busca ou os filtros."
      />
    ) : (
      <EmptyState
        icon={ClipboardList}
        title="Nenhuma tarefa ainda"
        description="Adicione a primeira tarefa no formulário acima."
      />
    )
  }

  return (
    <div className={styles.lista}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onAlterada={onAlterada} />
      ))}
    </div>
  )
}

export { TaskList }
