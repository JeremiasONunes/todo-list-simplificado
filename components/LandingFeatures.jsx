// Importa quatro ícones da biblioteca lucide-react.
// Cada um deles é um componente React que pode ser renderizado no JSX.
import { BarChart3, CheckCircle2, Search, Target } from 'lucide-react'

// Importa o componente Card criado no projeto.
import { Card } from './Card'

// Importa os estilos CSS Module desse componente.
// O "styles" permite acessar as classes definidas no arquivo .module.css.
import styles from '../styles/components/LandingFeatures.module.css'


/**
 * Array contendo os dados das funcionalidades que serão exibidas.
 *
 * A ideia aqui é separar:
 *
 * 1. DADOS → FUNCIONALIDADES
 * 2. ESTRUTURA VISUAL → JSX dentro do map()
 *
 * Dessa forma, não precisamos escrever 4 Cards manualmente.
 *
 * Se amanhã quisermos adicionar uma quinta funcionalidade,
 * basta adicionar outro objeto neste array.
 */
const FUNCIONALIDADES = [
  {
    // Componente do ícone que será utilizado.
    icon: CheckCircle2,

    // Título da funcionalidade.
    titulo: 'Gerencie suas tarefas',

    // Texto explicativo.
    descricao:
      'Crie, edite e conclua tarefas com poucos cliques, sem telas complicadas.',
  },

  {
    icon: Target,
    titulo: 'Prioridade e prazo',
    descricao:
      'Marque o que é urgente e defina prazos — nada de tarefa importante se perdendo.',
  },

  {
    icon: Search,
    titulo: 'Busca e filtros',
    descricao:
      'Encontre qualquer tarefa rapidamente por texto, status ou prioridade.',
  },

  {
    icon: BarChart3,
    titulo: 'Analytics de produtividade',
    descricao:
      'Acompanhe quantas tarefas você conclui, sua taxa de conclusão e sua evolução.',
  },
]


/**
 * Componente responsável por renderizar a seção
 * de funcionalidades da Landing Page.
 */
function LandingFeatures() {
  return (
    // <section> representa uma seção da página.
    //
    // id="funcionalidades" permite acessar essa seção
    // através de um link como:
    //
    // <a href="#funcionalidades">
    //
    // className={styles.secao} aplica o estilo "secao"
    // definido no CSS Module.
    <section id="funcionalidades" className={styles.secao}>

      {/* Título principal da seção */}
      <h2 className={styles.titulo}>
        Tudo que você precisa pra manter o ritmo
      </h2>

      {/* Container que provavelmente organiza os Cards em uma grade */}
      <div className={styles.grade}>

        {/*
         * Aqui está a parte mais importante:
         *
         * FUNCIONALIDADES é um array com 4 objetos.
         *
         * O .map() percorre esse array e executa
         * a função uma vez para cada objeto.
         *
         * Resultado:
         *
         * objeto 1 → cria Card 1
         * objeto 2 → cria Card 2
         * objeto 3 → cria Card 3
         * objeto 4 → cria Card 4
         */}
        {FUNCIONALIDADES.map(({ icon, titulo, descricao }) => {

          /*
           * "icon" contém o componente do ícone.
           *
           * Por exemplo, no primeiro objeto:
           *
           * icon = CheckCircle2
           *
           * No segundo:
           *
           * icon = Target
           *
           * etc.
           *
           * Aqui criamos uma variável chamada Icon
           * contendo o componente que veio do objeto.
           *
           * A letra maiúscula é importante porque React
           * interpreta <Icon /> como um componente.
           */
          const Icon = icon

          return (

            /*
             * Para cada objeto do array, um Card é criado.
             *
             * key={titulo} fornece uma identificação única
             * para o React conseguir controlar essa lista.
             */
            <Card key={titulo} className={styles.item}>

              {/*
               * Área que contém o ícone.
               *
               * aria-hidden="true" informa às tecnologias
               * assistivas que esse ícone é apenas decorativo.
               */}
              <span
                className={styles.iconWrapper}
                aria-hidden="true"
              >

                {/*
                 * Renderiza o ícone correspondente.
                 *
                 * Como Icon recebe dinamicamente:
                 *
                 * CheckCircle2
                 * Target
                 * Search
                 * BarChart3
                 *
                 * o React renderiza o ícone correto
                 * para cada funcionalidade.
                 */}
                <Icon size={22} />

              </span>

              {/* Título da funcionalidade */}
              <h3 className={styles.itemTitulo}>
                {titulo}
              </h3>

              {/* Descrição da funcionalidade */}
              <p className={styles.itemDescricao}>
                {descricao}
              </p>

            </Card>
          )
        })}

      </div>
    </section>
  )
}


// Exporta o componente para que ele possa ser utilizado
// em outros arquivos.
export { LandingFeatures }