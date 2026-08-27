import { delay, generateId, readCollection, writeCollection } from './mockStorage'

const COLECAO = 'usuarios'

/**
 * @typedef {Object} Usuario
 * @property {string} id
 * @property {string} nome
 * @property {string} email
 * @property {string} senha - mock apenas, texto puro; uma API real nunca guardaria assim
 * @property {string} criadoEm - data ISO 8601
 */

/** Fixture com 1 conta de demonstração, pra Login já ter algo testável sem
 * precisar cadastrar antes.
 * @type {Usuario[]} */
const usuariosFixture = [
  {
    id: 'usuario-1',
    nome: 'Usuário Demo',
    email: 'demo@todolist.com',
    senha: 'demo123',
    criadoEm: '2026-01-01T00:00:00.000Z',
  },
]

function getAll() {
  return readCollection(COLECAO, usuariosFixture)
}

async function buscarPorId(id) {
  await delay(200)
  return getAll().find((usuario) => usuario.id === id)
}

/** Login mockado: devolve o usuário se e-mail/senha conferem, `null` caso
 * contrário — nunca lança erro pra credencial inválida, isso é um fluxo
 * esperado (quem chama decide como mostrar a mensagem), diferente de
 * `criar`, onde e-mail duplicado é uma falha real. */
async function verificarCredenciais(email, senha) {
  await delay(400)
  const usuario = getAll().find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.senha === senha,
  )
  return usuario ?? null
}

async function criar(dados) {
  await delay(400)
  const usuarios = getAll()

  if (usuarios.some((usuario) => usuario.email.toLowerCase() === dados.email.toLowerCase())) {
    throw new Error('Já existe uma conta com este e-mail.')
  }

  const novoUsuario = {
    ...dados,
    id: generateId('usuario'),
    criadoEm: new Date().toISOString(),
  }

  writeCollection(COLECAO, [...usuarios, novoUsuario])
  return novoUsuario
}

const usuarioService = {
  buscarPorId,
  verificarCredenciais,
  criar,
}

export { usuarioService }
