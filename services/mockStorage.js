/**
 * Utilitário compartilhado por trás de todo `entidadeService.js` — é a ÚNICA
 * peça do projeto que toca `localStorage` diretamente. Existe porque a Fase 4
 * (Autenticação) e a Fase 5 (Tasks) precisam da mesma coisa (ler/escrever uma
 * "coleção" persistida, semeada de uma fixture na primeira leitura); menor do
 * que o equivalente do Lythra de propósito — sem `resetMockData()`/
 * `maybeFail()`, que não têm nenhum consumidor real ainda neste projeto.
 *
 * Preparado pra Fase 9 (integração com API Python): quando existir uma API
 * de verdade, só o INTERIOR de cada `entidadeService.js` muda (as funções
 * viram `fetch()` em vez de `readCollection`/`writeCollection`) — a
 * ASSINATURA que hooks/páginas consomem continua igual, então nada fora de
 * `services/` precisa ser tocado.
 */
const PREFIXO = 'todolist:mock:'

function chaveDe(colecao) {
  return `${PREFIXO}${colecao}`
}

/** Lê uma coleção; se ainda não existir (primeiro acesso), semeia com
 * `fixture` e persiste antes de devolver. */
function readCollection(colecao, fixture) {
  const chave = chaveDe(colecao)
  const bruto = localStorage.getItem(chave)

  if (bruto === null) {
    const semeada = [...fixture]
    localStorage.setItem(chave, JSON.stringify(semeada))
    return semeada
  }

  return JSON.parse(bruto)
}

function writeCollection(colecao, dados) {
  localStorage.setItem(chaveDe(colecao), JSON.stringify(dados))
}

/** Atraso simulado — o mesmo tanto de "espera de rede" que uma chamada real
 * teria, pra estado de loading não ser instantâneo demais pra ser visto. */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export { readCollection, writeCollection, delay, generateId }
