import { useCallback } from 'react'

import { useAuth } from '../context/AuthContext'
import { taskService } from '../services/taskService'
import { useAsync } from './useAsync'

const PESO_PRIORIDADE = { urgente: 0, alta: 1, media: 2, baixa: 3 }

function ordenar(tasks, ordenarPor) {
  const copia = [...tasks]

  if (ordenarPor === 'prazo') {
    // Sem prazo vai pro fim da lista — não faz sentido competir por posição
    // com tarefas que têm data real.
    return copia.sort((a, b) => {
      if (!a.prazo) return 1
      if (!b.prazo) return -1
      return new Date(a.prazo) - new Date(b.prazo)
    })
  }

  if (ordenarPor === 'prioridade') {
    return copia.sort((a, b) => PESO_PRIORIDADE[a.prioridade] - PESO_PRIORIDADE[b.prioridade])
  }

  // 'recente' (padrão)
  return copia.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
}

/**
 * Leitura das tarefas do usuário logado, já filtradas e ordenadas — mesmo
 * padrão do Lythra (`useFeed`): busca, filtro e ordenação client-side, sobre
 * uma lista pequena, dentro do próprio hook (não tem sentido criar um
 * parâmetro de query pro service pra isto).
 *
 * Busca com mínimo de 3 caracteres preservada da versão anterior do app —
 * era um comportamento que já funcionava bem, não uma decisão desta fase.
 * @param {{ busca?: string, status?: 'todas'|'pendente'|'concluida', prioridade?: 'todas'|'baixa'|'media'|'alta'|'urgente', ordenarPor?: 'recente'|'prazo'|'prioridade' }} filtros
 */
function useTasks(filtros = {}) {
  const { usuario } = useAuth()
  const { busca = '', status = 'todas', prioridade = 'todas', ordenarPor = 'recente' } = filtros

  const buscar = useCallback(async () => {
    const tasks = await taskService.listarPorUsuario(usuario.id)
    const termo = busca.trim().toLowerCase()

    const filtradas = tasks.filter((task) => {
      const bateBusca = termo.length < 3 || task.titulo.toLowerCase().includes(termo)
      const bateStatus = status === 'todas' || task.status === status
      const batePrioridade = prioridade === 'todas' || task.prioridade === prioridade
      return bateBusca && bateStatus && batePrioridade
    })

    return ordenar(filtradas, ordenarPor)
  }, [usuario.id, busca, status, prioridade, ordenarPor])

  return useAsync(buscar)
}

export { useTasks }
