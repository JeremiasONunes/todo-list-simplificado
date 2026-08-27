import { Modal } from './Modal'
import styles from '../styles/components/TermosDeUsoModal.module.css'

/**
 * Conteúdo estático dos Termos de Uso — mesmo princípio do
 * `TermosDeUsoModal` do Lythra: COMPOSIÇÃO em vez de reimplementar modal
 * (`Modal` já resolve fechar com Esc, foco, `role="dialog"`; este
 * componente só decide QUE TEXTO mostrar).
 *
 * Conteúdo mais simples que o do Lythra de propósito: lá é uma rede social
 * de verdade, citando artigos da LGPD, porque tem dados de outras pessoas
 * envolvidos (quem você segue, avaliações públicas). Aqui não existe nada
 * disso — é um projeto didático, sem servidor real, sem dado de terceiro
 * nenhum — então o texto é honesto sobre isso em vez de imitar uma
 * formalidade jurídica que não se aplicaria de verdade.
 * @param {{ open: boolean, onClose: () => void }} props
 */
function TermosDeUsoModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Termos de Uso">
      <div className={styles.conteudo}>
        <section>
          <h4 className={styles.secao}>1. O que é o ToDo List</h4>
          <p>
            O ToDo List é uma aplicação de organização de tarefas, criada como projeto de estudo do
            curso Desenvolvedor Full Stack (SENAC). Ao criar uma conta, você concorda com estes
            termos.
          </p>
        </section>

        <section>
          <h4 className={styles.secao}>2. Dados que pedimos</h4>
          <ul className={styles.lista}>
            <li>Dados de cadastro: nome, e-mail e senha.</li>
            <li>Dados de uso: as tarefas que você criar (título, prioridade, prazo e status).</li>
          </ul>
        </section>

        <section>
          <h4 className={styles.secao}>3. Pra que usamos</h4>
          <p>Só pra você acessar sua própria conta e ver suas próprias tarefas — nada além disso.</p>
        </section>

        <section>
          <h4 className={styles.secao}>4. Onde tudo fica guardado</h4>
          <p>
            Este é um projeto didático — não existe servidor real por trás dele. Sua conta e suas
            tarefas ficam salvas só no armazenamento local do seu navegador, nunca são enviadas pra
            lugar nenhum.
          </p>
        </section>

        <section>
          <h4 className={styles.secao}>5. Apagar seus dados</h4>
          <p>
            Você pode excluir suas tarefas a qualquer momento pelo próprio app, ou apagar tudo de uma
            vez limpando os dados do site nas configurações do navegador.
          </p>
        </section>

        <p className={styles.aviso}>
          Projeto didático (SENAC — Desenvolvedor Full Stack). Nenhum dado é enviado a servidores
          reais; tudo é simulado e armazenado só no seu navegador.
        </p>
      </div>
    </Modal>
  )
}

export { TermosDeUsoModal }
