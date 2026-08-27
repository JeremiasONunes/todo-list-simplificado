import { Badge } from './Badge'

/** Mapa único de prioridade → (rótulo, tom) — se um dia a escala de
 * prioridade mudar, muda aqui, não em cada lugar que mostra uma prioridade. */
const PRIORIDADES = {
  baixa: { label: 'Baixa', tone: 'neutral' },
  media: { label: 'Média', tone: 'secondary' },
  alta: { label: 'Alta', tone: 'primary' },
  urgente: { label: 'Urgente', tone: 'danger' },
}

/** @param {{ prioridade: 'baixa'|'media'|'alta'|'urgente' }} props */
function PriorityBadge({ prioridade }) {
  const { label, tone } = PRIORIDADES[prioridade] ?? PRIORIDADES.media
  return <Badge tone={tone}>{label}</Badge>
}

export { PriorityBadge }
