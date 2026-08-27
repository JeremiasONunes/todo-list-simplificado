import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Novo Design System (Fase 1) — convive com o `index.css` do Tailwind acima
// enquanto a migração dos componentes existentes não termina (ver plano de
// adequação). Importado depois: os tokens/reset daqui vencem onde colidem
// com o `@layer base` antigo (ex.: fundo do body).
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
