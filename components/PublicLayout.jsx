// Outlet é um componente especial do React Router. Ele não desenha nada
// visualmente por si só — funciona como um "buraco" no meio do layout onde
// a PÁGINA ATIVA (Landing, Login, Cadastro...) vai ser encaixada, dependendo
// da URL que o usuário está visitando naquele momento.
import { Outlet } from 'react-router-dom'

// Header é o cabeçalho (marca + links Início/Sobre/Entrar) — comentado com
// detalhes em `Header.jsx`/`Header.module.css`.
import { Header } from './Header'

// styles é o objeto gerado a partir do CSS Module deste componente —
// `styles.shell` no código vira a classe CSS `.shell` do arquivo
// `PublicLayout.module.css`.
import styles from '../styles/components/PublicLayout.module.css'

/**
 * "Casca" das rotas públicas (Landing/Login/Cadastro/Recuperar senha/Sobre)
 * — renomeada de `AppLayout` nesta fase, quando a área logada ganhou seu
 * próprio layout (`AuthenticatedLayout`, sidebar) em vez de continuar
 * dividindo este aqui. Mesmo papel do `PublicLayout` do Lythra: renderiza
 * `Header` uma vez, `<Outlet />` recebe a rota ativa.
 *
 * TEORIA — POR QUE ISTO EXISTE (LAYOUT COMPARTILHADO)
 * ---------------------------------------------------------------------------
 * Sem um componente de "layout", cada página (Landing.jsx, Login.jsx,
 * Sobre.jsx...) precisaria importar e renderizar `<Header />` sozinha —
 * repetindo o mesmo código em cada arquivo. Em vez disso, o arquivo de
 * rotas (`routeConfig.jsx`) diz ao React Router "toda rota pública passa
 * primeiro por `PublicLayout`" — e é este componente que desenha o Header
 * UMA VEZ SÓ, com o `<Outlet />` decidindo qual página específica aparece
 * embaixo dele, dependendo da URL.
 *
 * Link "Pular para o conteúdo" — primeiro elemento focável da página, só
 * visível quando recebe foco (`styles.skipLink`, CSS puro, sem JS).
 */
function PublicLayout() {
  return (
    // .shell é a caixa mais externa de toda página pública — ela garante
    // que a página sempre tenha, no mínimo, a altura da tela inteira (ver
    // comentário completo no arquivo .module.css).
    <div className={styles.shell}>
      {/*
       * TEORIA — O QUE É UM "SKIP LINK" (link de pular)
       * -----------------------------------------------------------------
       * Este é o PRIMEIRO elemento focável da página inteira — quem
       * navega só pelo teclado (apertando Tab repetidamente, sem usar
       * mouse) cairia primeiro em cima dele. Sem este link, a primeira
       * parada seria dentro do Header (marca, depois cada link do nav),
       * obrigando a pessoa a apertar Tab várias vezes em TODA página só
       * pra chegar no conteúdo principal. Clicar (ou apertar Enter) neste
       * link pula direto pro `<main>` logo abaixo.
       *
       * `href="#conteudo-principal"` é um link "âncora": o `#` mais um id
       * faz o navegador pular pro elemento da página que tem exatamente
       * esse `id` — aqui, o `<main>` alguns linhas abaixo. Repare que o
       * `id` do `<main>` é literalmente `"conteudo-principal"`, batendo
       * com o texto depois do `#` aqui.
       *
       * Por padrão, este link fica INVISÍVEL (fora da tela) — só aparece
       * quando alguém navega até ele pelo teclado e ele recebe foco (ver
       * `.skipLink`/`.skipLink:focus` no arquivo CSS). Pra quem usa mouse,
       * ele nunca aparece — não atrapalha o visual normal da página.
       */}
      <a href="#conteudo-principal" className={styles.skipLink}>
        Pular para o conteúdo
      </a>

      {/* Renderizado uma vez só — está fora do "buraco" do Outlet, então
       * NUNCA desmonta/remonta quando o usuário navega entre páginas
       * públicas diferentes (ex.: de "/" pra "/login"). */}
      <Header />

      {/*
       * <main> é uma tag HTML SEMÂNTICA (tem um significado especial, não
       * é só uma caixa genérica como <div>) — ela marca "aqui começa o
       * conteúdo principal da página", ajudando tanto leitores de tela
       * (podem pular direto pra cá) quanto o próprio motor de busca a
       * entender a estrutura da página. Só deve existir UM <main> por
       * página — aqui, um só, reaproveitado por todas as rotas públicas.
       */}
      <main id="conteudo-principal" className={styles.content}>
        {/*
         * Aqui é o "buraco" de verdade: o React Router olha pra URL atual
         * e decide qual componente de página encaixar neste ponto exato —
         * `<LandingPage />` se a URL for "/", `<LoginPage />` se for
         * "/login", e assim por diante (a lista completa está em
         * `routes/routeConfig.jsx`). O `<Header />` e o link de pular
         * ficam sempre iguais; só o que entra AQUI muda a cada navegação.
         */}
        <Outlet />
      </main>
    </div>
  )
}

export { PublicLayout }
