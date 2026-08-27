import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'
import { TermosDeUsoModal } from './TermosDeUsoModal'

import styles from '../styles/components/CadastroForm.module.css'

function CadastroForm() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [aceiteTermos, setAceiteTermos] = useState(false)

  const [erro, setErro] = useState('')
  const [termosAbertos, setTermosAbertos] = useState(false)

  function aoSubmeter(event) {
    event.preventDefault()

    setErro('')

    if (!nome) {
      setErro('Informe seu nome.')
      return
    }

    if (!email) {
      setErro('Informe seu e-mail.')
      return
    }

    if (!senha) {
      setErro('Informe sua senha.')
      return
    }

    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    if (!confirmarSenha) {
      setErro('Confirme sua senha.')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não conferem.')
      return
    }

    if (!aceiteTermos) {
      setErro('É preciso aceitar os termos de uso.')
      return
    }

    // Cadastro de demonstração
    console.log({
      nome,
      email,
      senha,
    })

    navigate('/dashboard')
  }

  return (
    <Card className={styles.card}>
      <h1 className={styles.titulo}>Criar conta</h1>

      <form
        onSubmit={aoSubmeter}
        className={styles.formulario}
        noValidate
      >
        <Input
          label="Nome"
          id="nome"
          placeholder="Seu nome"
          autoComplete="name"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <Input
          label="E-mail"
          id="email"
          type="email"
          placeholder="voce@exemplo.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Senha"
          id="senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <Input
          label="Confirmar senha"
          id="confirmarSenha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={confirmarSenha}
          onChange={(event) => setConfirmarSenha(event.target.value)}
        />

        <div className={styles.termosCampo}>
          <label className={styles.termos}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={aceiteTermos}
              onChange={(event) => setAceiteTermos(event.target.checked)}
            />

            <span>
              Ao continuar, você aceita os{' '}

              <button
                type="button"
                className={styles.linkTermos}
                onClick={() => setTermosAbertos(true)}
              >
                termos de uso
              </button>

              {' '}do ToDo List.
            </span>
          </label>
        </div>

        {erro && (
          <p role="alert" className={styles.erroGeral}>
            {erro}
          </p>
        )}

        <Button type="submit" variant="primary">
          Criar conta
        </Button>
      </form>

      <p className={styles.rodape}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>

      <TermosDeUsoModal
        open={termosAbertos}
        onClose={() => setTermosAbertos(false)}
      />
    </Card>
  )
}

export { CadastroForm }