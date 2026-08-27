import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAtualizarTask } from '../hooks/useAtualizarTask'
import { useCriarTask } from '../hooks/useCriarTask'
import { Button } from './Button'
import { Input } from './Input'
import { Select } from './Select'
import styles from '../styles/components/TaskForm.module.css'

const esquema = z.object({
  titulo: z.string().min(1, 'Informe o título da tarefa.'),
  prioridade: z.enum(['baixa', 'media', 'alta', 'urgente']),
  prazo: z.string().optional(),
})

/**
 * Um formulário só, dois modos — `tarefaEmEdicao` presente = editar (`TaskCard`
 * abre isto dentro de um `Modal`); ausente = criar (fica inline no topo de
 * `TasksPage`, mesmo lugar onde a versão anterior do app já vivia). Evita
 * ter `TaskForm` E `EditTaskForm` quase idênticos — a única diferença real
 * entre criar e editar é qual mutation dispara no fim.
 * @param {{ tarefaEmEdicao?: object, aoSalvar: () => void, aoCancelar?: () => void }} props
 */
function TaskForm({ tarefaEmEdicao, aoSalvar, aoCancelar }) {
  const [erroGeral, setErroGeral] = useState(null)
  const editando = !!tarefaEmEdicao
  // `useId()` — o mesmo `TaskForm` pode existir DUAS vezes na página ao
  // mesmo tempo (o inline de criar + este reaberto dentro do Modal pra
  // editar); ids fixos ("titulo", "prioridade"...) colidiriam, invalidando
  // o HTML e quebrando a associação label↔campo assim que o modal abrisse.
  const idBase = useId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquema),
    defaultValues: {
      titulo: tarefaEmEdicao?.titulo ?? '',
      prioridade: tarefaEmEdicao?.prioridade ?? 'media',
      prazo: tarefaEmEdicao?.prazo ?? '',
    },
  })

  const { criar } = useCriarTask()
  const { atualizar } = useAtualizarTask()

  async function aoSubmeter(dados) {
    setErroGeral(null)
    // Campo de data vazio (`''`) significa "sem prazo" — vira `null`, não
    // uma string vazia salva sem sentido.
    const payload = { ...dados, prazo: dados.prazo || null }

    try {
      if (editando) {
        await atualizar(tarefaEmEdicao.id, payload)
      } else {
        await criar(payload)
        reset()
      }
      aoSalvar()
    } catch (erro) {
      setErroGeral(erro.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(aoSubmeter)} className={styles.formulario} noValidate>
      <Input
        label="Título"
        id={`${idBase}-titulo`}
        placeholder="O que você precisa fazer?"
        error={errors.titulo?.message}
        {...register('titulo')}
      />
      <div className={styles.linha}>
        <Select label="Prioridade" id={`${idBase}-prioridade`} {...register('prioridade')}>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
          <option value="urgente">Urgente</option>
        </Select>
        <Input
          label="Prazo (opcional)"
          id={`${idBase}-prazo`}
          type="date"
          {...register('prazo')}
        />
      </div>
      {erroGeral ? (
        <p role="alert" className={styles.erroGeral}>
          {erroGeral}
        </p>
      ) : null}
      <div className={styles.acoes}>
        {aoCancelar ? (
          <Button type="button" variant="ghost" onClick={aoCancelar}>
            Cancelar
          </Button>
        ) : null}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : editando ? 'Salvar alterações' : '+ Adicionar tarefa'}
        </Button>
      </div>
    </form>
  )
}

export { TaskForm }
