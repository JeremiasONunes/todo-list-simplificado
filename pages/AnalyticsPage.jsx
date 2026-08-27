import { Flame, Percent } from 'lucide-react'

import { Card } from '../components/Card'
import { PageStateBoundary } from '../components/PageStateBoundary'
import { PriorityBadge } from '../components/PriorityBadge'
import { StatCard } from '../components/StatCard'
import { useTasks } from '../hooks/useTasks'
import styles from '../styles/pages/AnalyticsPage.module.css'

const DIAS_JANELA = 7
const FORMATADOR_DIA_SEMANA = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
// Mais urgente primeiro — mesma ordem de prioridade já usada no sort de `useTasks`
// (`PESO_PRIORIDADE`, arquivo interno de lá); pequeno demais pra valer exportar.
const ORDEM_PRIORIDADE = ['urgente', 'alta', 'media', 'baixa']

/** Chave `AAAA-MM-DD` em horário LOCAL (nunca `toISOString()`, que converte
 * pra UTC e pode jogar a data pro dia errado perto da virada) — mesma
 * preocupação de fuso horário já registrada em `utils/tasks.js`. */
function chaveDiaLocal(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`
}

/** Os últimos `n` dias (incluindo hoje), do mais antigo pro mais recente —
 * são as colunas do gráfico, existam ou não tarefas concluídas nelas. */
function ultimosDias(n) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  return Array.from({ length: n }, (_, i) => {
    const dia = new Date(hoje)
    dia.setDate(dia.getDate() - (n - 1 - i))
    return dia
  })
}

/** Quantas tarefas foram concluídas em cada um dos últimos `n` dias —
 * `concluidoEm` é o campo que a Fase 5 já deixou reservado pra isto. */
function concluidasPorDia(tasks, dias) {
  const contagem = new Map(dias.map((dia) => [chaveDiaLocal(dia), 0]))

  tasks.forEach((task) => {
    if (!task.concluidoEm) return
    const chave = chaveDiaLocal(new Date(task.concluidoEm))
    if (contagem.has(chave)) {
      contagem.set(chave, contagem.get(chave) + 1)
    }
  })

  return dias.map((dia) => ({
    chave: chaveDiaLocal(dia),
    label: FORMATADOR_DIA_SEMANA.format(dia),
    quantidade: contagem.get(chaveDiaLocal(dia)),
  }))
}

/** Só as pendentes — "vou ter que fazer o quê" é a pergunta que essa
 * distribuição responde; tarefa concluída não compete mais por atenção. */
function pendentesPorPrioridade(tasks) {
  const pendentes = tasks.filter((task) => task.status === 'pendente')
  return ORDEM_PRIORIDADE.map((prioridade) => ({
    prioridade,
    quantidade: pendentes.filter((task) => task.prioridade === prioridade).length,
  }))
}

/**
 * Nasce na Fase 7 — a "evolução" que a Landing (`LandingFeatures`) já
 * descrevia desde a Fase 3. Dois gráficos desenhados na mão em CSS (barra
 * vertical proporcional à maior contagem do conjunto; barra horizontal pro
 * mesmo princípio aplicado a 4 categorias), mesma técnica do
 * `ReadingStatsCharts` do Lythra — sem biblioteca de gráfico, porque isto é
 * um painel de produtividade simples, não uma plataforma de BI.
 *
 * Reusa `useTasks()` sem filtros, como `DashboardPage` — 3º consumidor da
 * mesma leitura "todas as tarefas do usuário", reforçando que não vale a
 * pena um hook dedicado só pra isto.
 */
function AnalyticsPage() {
  const { dado: tasks, carregando, erro, recarregar } = useTasks()

  const todas = tasks ?? []
  const total = todas.length
  const concluidas = todas.filter((task) => task.status === 'concluida').length
  const taxaConclusao = total > 0 ? Math.round((concluidas / total) * 100) : 0

  const dias = ultimosDias(DIAS_JANELA)
  const porDia = concluidasPorDia(todas, dias)
  const concluidasNaJanela = porDia.reduce((soma, dia) => soma + dia.quantidade, 0)
  const maiorPorDia = Math.max(1, ...porDia.map((dia) => dia.quantidade))

  const porPrioridade = pendentesPorPrioridade(todas)
  const maiorPorPrioridade = Math.max(1, ...porPrioridade.map((item) => item.quantidade))

  return (
    <div className={styles.wrapper}>
      <div className={styles.cabecalho}>
        <h1 className={styles.titulo}>Analytics</h1>
        <p className={styles.subtitulo}>Sua produtividade em números.</p>
      </div>

      <PageStateBoundary
        carregando={carregando}
        erro={erro}
        recarregar={recarregar}
        mensagemCarregando="Calculando suas estatísticas..."
      >
        <div className={styles.stats}>
          <StatCard icon={Percent} label="Taxa de conclusão" value={`${taxaConclusao}%`} tone="primary" />
          <StatCard icon={Flame} label="Concluídas em 7 dias" value={concluidasNaJanela} tone="success" />
        </div>

        <Card className={styles.card}>
          <h2 className={styles.cardTitulo}>Concluídas por dia</h2>
          <div className={styles.grafico} role="img" aria-label="Gráfico de tarefas concluídas nos últimos 7 dias">
            {porDia.map((dia) => (
              <div key={dia.chave} className={styles.coluna}>
                <span className={styles.colunaValor}>{dia.quantidade > 0 ? dia.quantidade : ''}</span>
                <div className={styles.barra} style={{ height: `${(dia.quantidade / maiorPorDia) * 100}%` }} />
                <span className={styles.colunaLabel}>{dia.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.card}>
          <h2 className={styles.cardTitulo}>Pendentes por prioridade</h2>
          <div className={styles.linhasPrioridade}>
            {porPrioridade.map(({ prioridade, quantidade }) => (
              <div key={prioridade} className={styles.linhaPrioridade}>
                <PriorityBadge prioridade={prioridade} />
                <div className={styles.trilha}>
                  <div
                    className={styles.trilhaBarra}
                    style={{ width: `${(quantidade / maiorPorPrioridade) * 100}%` }}
                  />
                </div>
                <span className={styles.linhaQuantidade}>{quantidade}</span>
              </div>
            ))}
          </div>
        </Card>
      </PageStateBoundary>
    </div>
  )
}

export { AnalyticsPage }
