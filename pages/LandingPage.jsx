import { LandingBenefits } from '../components/LandingBenefits'
import { LandingCTA } from '../components/LandingCTA'
import { LandingFeatures } from '../components/LandingFeatures'
import { LandingFooter } from '../components/LandingFooter'
import { LandingHero } from '../components/LandingHero'

/**
 * Página inicial pública (#1) — só compõe, mesmo padrão de página fina de
 * `Home`/`Sobre`. Cada seção é "full bleed" (gerencia o próprio espaçamento),
 * por isso `PublicLayout.content` não aplica padding nenhum por cima.
 */
function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingBenefits />
      <LandingCTA />
      <LandingFooter />
    </>
  )
}

export { LandingPage }
