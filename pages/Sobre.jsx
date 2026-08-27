import { BarChart3, CheckSquare, Component, Lock, Route, Zap } from 'lucide-react'
import { Card } from '../components/Card'
import styles from '../styles/pages/Sobre.module.css'
const CONCEITOS = [
  {
    icon: Component,
    titulo: 'Componentização',
    descricao: 'Design system próprio — Button, Input, Card, Modal e outros, reutilizados em todo o app.',
  },
  {
    icon: Zap,
    titulo: 'Hooks',
    descricao: 'useState, useEffect e hooks customizados (useTasks, useAuth, useAsync).',
  },
  {
    icon: Route,
    titulo: 'Roteamento',
    descricao: 'React Router — rotas protegidas pra quem precisa estar logado.',
  },
  {
    icon: Lock,
    titulo: 'Autenticação',
    descricao: 'Sessão via Context API — hoje mockada, pronta pra virar uma API de verdade.',
  },
  {
    icon: CheckSquare,
    titulo: 'Tarefas',
    descricao: 'Prioridade, prazo, busca e filtros — organizar o que importa, não só listar.',
  },
  {
    icon: BarChart3,
    titulo: 'Analytics',
    descricao: 'Taxa de conclusão e evolução ao longo do tempo, num painel de produtividade simples.',
  },
]
function Sobre() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cabecalho}>
        <h1 className={styles.titulo}>Sobre esta aplicação</h1>
        <p className={styles.subtitulo}>Conheça mais sobre o projeto</p>
      </div>

      <Card className={styles.card}>
        <p className={styles.descricao}>
          Esta é uma aplicação de lista de tarefas (ToDo List) desenvolvida com React e Vite —
          cadastro e login, tarefas com prioridade e prazo, um painel de resumo e um analytics de
          produtividade. Foi criada com o objetivo de praticar conceitos fundamentais do React:
        </p>

        <div className={styles.grade}>
          {CONCEITOS.map(({ icon, titulo, descricao }) => {
            const Icon = icon
            return (
              <div key={titulo} className={styles.item}>
                <span className={styles.iconWrapper} aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className={styles.itemTitulo}>{titulo}</h3>
                <p className={styles.itemDescricao}>{descricao}</p>
              </div>
            )
          })}
        </div>

        <div className={styles.creditos}>
          <p className={styles.creditosLinha}>
            Desenvolvido por <strong className={styles.creditosNome}>Jeremias O Nunes</strong>
          </p>
          <p className={styles.creditosLinha}>Como parte de um projeto de estudo em React</p>
        </div>
      </Card>
    </div>)}export { Sobre }
