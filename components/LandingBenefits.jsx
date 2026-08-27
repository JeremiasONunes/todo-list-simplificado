import { Check } from 'lucide-react'

import { Card } from './Card'
import styles from '../styles/components/LandingBenefits.module.css'

const BENEFICIOS = [
  'Nunca mais esqueça um prazo importante',
  'Foque primeiro no que tem prioridade alta',
  'Veja sua produtividade evoluir com dados reais',
  'Simples desde o primeiro uso, sem curva de aprendizado',
]

function LandingBenefits() {
  return (
    <section className={styles.secao}>
      <Card className={styles.card}>
        <h2 className={styles.titulo}>Por que usar o ToDo List</h2>
        <ul className={styles.lista}>
          {BENEFICIOS.map((beneficio) => (
            <li key={beneficio} className={styles.item}>
              <span className={styles.check} aria-hidden="true">
                <Check size={14} strokeWidth={3} />
              </span>
              {beneficio}
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

export { LandingBenefits }
