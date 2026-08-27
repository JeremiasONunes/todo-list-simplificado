import { useState } from 'react'

import { taskService } from '../services/taskService'

/** @param {() => void} [aoConcluir] */
function useExcluirTask(aoConcluir) {
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(null)

  async function excluir(id) {
    setEnviando(true)
    setErro(null)
    try {
      await taskService.remover(id)
      aoConcluir?.()
    } catch (e) {
      setErro(e)
      throw e
    } finally {
      setEnviando(false)
    }
  }

  return { excluir, enviando, erro }
}

export { useExcluirTask }
