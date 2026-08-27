const FORMATADOR_DATA = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })

/**
 * Extraído de `TaskCard` na Fase 6 — `DashboardPage` passou a ser o 2º lugar
 * que precisa da mesma lógica de data ("essa tarefa venceu?", "que dia é
 * esse prazo em pt-BR?"). Duplicar as 2 funções seria arriscado: o detalhe
 * do fuso horário abaixo é sutil, e uma cópia divergindo silenciosamente da
 * outra reintroduziria o bug que o comentário original já evitou.
 */

/** `prazo` é `YYYY-MM-DD` (sem hora) — criar a data direto com `new
 * Date('YYYY-MM-DD')` interpreta como UTC meia-noite, que pode exibir o dia
 * ANTERIOR em fusos negativos (ex.: Brasil). Somar o horário local evita
 * esse desvio de 1 dia. */
function formatarPrazo(prazo) {
  return FORMATADOR_DATA.format(new Date(`${prazo}T00:00:00`))
}

function estaAtrasada(task) {
  if (task.status === 'concluida' || !task.prazo) return false
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  return new Date(`${task.prazo}T00:00:00`) < hoje
}

export { formatarPrazo, estaAtrasada }
