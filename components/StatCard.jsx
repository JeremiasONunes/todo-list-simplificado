import { Card } from './Card'
import styles from '../styles/components/StatCard.module.css'

/**
 * Nasce na Fase 6 — o mesmo bloco (ícone + número grande + rótulo) se repete
 * 4x em `DashboardPage` (Total/Pendentes/Concluídas/Atrasadas); extrair evita
 * repetir a mesma marcação 4 vezes na mesma página, não é abstração pensada
 * pra reuso futuro em outro lugar.
 *
 * `icon` (componente `lucide-react`) no lugar de `emoji` — mesma troca de
 * `EmptyState`/`Sidebar`/`LandingFeatures`. O ícone herda a cor de `tone`
 * junto com o número (`styles[tone]` nos dois `<span>`) — antes só o número
 * mudava de cor, o emoji ficava sempre colorido do mesmo jeito por conta
 * própria; um ícone de linha precisa da cor vir de algum lugar.
 * @param {{ icon: import('react').ComponentType, label: string, value: number|string, tone?: 'neutral'|'primary'|'success'|'danger' }} props
 */
function StatCard({ icon, label, value, tone = 'neutral' }) {
  const Icon = icon
  return (
    <Card className={styles.card}>
      <span className={`${styles.iconWrapper} ${styles[tone]}`} aria-hidden="true">
        <Icon size={22} />
      </span>
      <span className={`${styles.valor} ${styles[tone]}`}>{value}</span>
      <span className={styles.label}>{label}</span>
    </Card>
  )
}

export { StatCard }
