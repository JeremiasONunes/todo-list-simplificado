import { delay, generateId, readCollection, writeCollection } from './mockStorage'

const COLECAO = 'tasks'

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} usuarioId - dono da tarefa; cada usuário só vê as próprias
 * @property {string} titulo
 * @property {'pendente' | 'concluida'} status
 * @property {'baixa' | 'media' | 'alta' | 'urgente'} prioridade
 * @property {string | null} prazo - data ISO (só a data, sem hora) ou null (sem prazo)
 * @property {string} criadoEm - data ISO 8601
 * @property {string} atualizadoEm - data ISO 8601
 * @property {string | null} concluidoEm - data ISO 8601 de quando concluiu, ou null —
 *   é o campo que a Fase 7 (Analytics) vai usar pra "concluídas por período";
 *   nunca editado direto, só `atualizar()` decide quando setar/limpar
 */

/** Fixture com tarefas variadas pro usuário de demonstração (prioridades e
 * prazos diferentes, incluindo uma já atrasada) — pra Busca/Filtros terem
 * algo real pra filtrar assim que alguém entra com a conta demo.
 * @type {Task[]} */
const tasksFixture = [
  {
    id: 'task-1',
    usuarioId: 'usuario-1',
    titulo: 'Revisar proposta do cliente',
    status: 'pendente',
    prioridade: 'urgente',
    prazo: '2026-01-05',
    criadoEm: '2026-01-01T10:00:00.000Z',
    atualizadoEm: '2026-01-01T10:00:00.000Z',
    concluidoEm: null,
  },
  {
    id: 'task-2',
    usuarioId: 'usuario-1',
    titulo: 'Organizar planilha de gastos',
    status: 'pendente',
    prioridade: 'media',
    prazo: '2026-01-20',
    criadoEm: '2026-01-02T09:00:00.000Z',
    atualizadoEm: '2026-01-02T09:00:00.000Z',
    concluidoEm: null,
  },
  {
    id: 'task-3',
    usuarioId: 'usuario-1',
    titulo: 'Comprar presente de aniversário',
    status: 'pendente',
    prioridade: 'baixa',
    prazo: null,
    criadoEm: '2026-01-03T14:00:00.000Z',
    atualizadoEm: '2026-01-03T14:00:00.000Z',
    concluidoEm: null,
  },
  {
    id: 'task-4',
    usuarioId: 'usuario-1',
    titulo: 'Enviar relatório mensal',
    status: 'concluida',
    prioridade: 'alta',
    prazo: '2026-01-04',
    criadoEm: '2025-12-28T08:00:00.000Z',
    atualizadoEm: '2026-01-03T11:00:00.000Z',
    concluidoEm: '2026-01-03T11:00:00.000Z',
  },
]

function getAll() {
  return readCollection(COLECAO, tasksFixture)
}

async function listarPorUsuario(usuarioId) {
  await delay(300)
  return getAll().filter((task) => task.usuarioId === usuarioId)
}

async function criar(dados) {
  await delay(400)
  const agora = new Date().toISOString()
  const novaTask = {
    ...dados,
    id: generateId('task'),
    status: 'pendente',
    criadoEm: agora,
    atualizadoEm: agora,
    concluidoEm: null,
  }

  writeCollection(COLECAO, [novaTask, ...getAll()])
  return novaTask
}

/** Patch parcial — serve tanto pra editar (título/prioridade/prazo) quanto
 * pra concluir/reabrir (`{ status: 'concluida' | 'pendente' }`), sem um
 * método por operação: é sempre "atualiza estes campos", só o que muda é
 * QUAIS campos vêm no patch. `concluidoEm` é a única coisa calculada aqui
 * dentro em vez de aceita como veio — nunca fica dessincronizado de `status`. */
async function atualizar(id, dadosParciais) {
  await delay(300)
  const tasks = getAll()
  const index = tasks.findIndex((task) => task.id === id)

  if (index === -1) {
    throw new Error('Tarefa não encontrada.')
  }

  const atual = tasks[index]
  const vaiConcluir = dadosParciais.status === 'concluida' && atual.status !== 'concluida'
  const vaiReabrir = dadosParciais.status === 'pendente' && atual.status === 'concluida'

  const atualizada = {
    ...atual,
    ...dadosParciais,
    atualizadoEm: new Date().toISOString(),
    concluidoEm: vaiConcluir
      ? new Date().toISOString()
      : vaiReabrir
        ? null
        : atual.concluidoEm,
  }

  const proximas = [...tasks]
  proximas[index] = atualizada
  writeCollection(COLECAO, proximas)
  return atualizada
}

async function remover(id) {
  await delay(300)
  const tasks = getAll()
  writeCollection(
    COLECAO,
    tasks.filter((task) => task.id !== id),
  )
}

const taskService = {
  listarPorUsuario,
  criar,
  atualizar,
  remover,
}

export { taskService }
