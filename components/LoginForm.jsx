import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'

import styles from '../styles/components/LoginForm.module.css'

function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function aoSubmeter(event) {
    event.preventDefault()

    setErro('')

    if (!email) {
      setErro('Informe seu e-mail.')
      return
    }

    if (!senha) {
      setErro('Informe sua senha.')
      return
    }

    // Login de demonstração
    if (email === 'admin@email.com' && senha === '123456') {
      navigate('/dashboard')
      return
    }

    setErro('E-mail ou senha incorretos.')
  }

  return (
    <Card className={styles.card}>
      <h1 className={styles.titulo}>Entrar</h1>

      <form
        onSubmit={aoSubmeter}
        className={styles.formulario}
        noValidate
      >
        <Input
          label="E-mail"
          id="email"
          type="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Senha"
          id="senha"
          type="password"
          placeholder="••••••••"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        {erro && (
          <p role="alert" className={styles.erroGeral}>
            {erro}
          </p>
        )}

        <Button type="submit" variant="primary">
          Entrar
        </Button>
      </form>

      <p className={styles.rodape}>
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>

      <p className={styles.rodape}>
        <Link to="/recuperar-senha">Esqueci minha senha</Link>
      </p>
    </Card>
  )
}

export { LoginForm }