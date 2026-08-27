import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'
import styles from '../styles/components/RecuperarSenhaForm.module.css'

const esquema = z.object({
  email: z.string().min(1, 'Informe seu e-mail.').email('E-mail inválido.'),
})

/**
 * 100% simulado — não existe `usuarioService.recuperarSenha` nem envio de
 * e-mail real (não faz sentido criar um método de service pra algo que não
 * tem o que fazer de verdade ainda). Só valida o formato do e-mail via Zod e
 * mostra a confirmação — mesmo comportamento não importa se o e-mail existe
 * ou não, de propósito (não revelar se um e-mail está cadastrado é prática
 * comum de segurança, mesmo aqui sendo só simulação).
 */
function RecuperarSenhaForm() {
  const [enviado, setEnviado] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(esquema) })

  async function aoSubmeter() {
    setEnviado(true)
  }

  if (enviado) {
    return (
      <Card className={styles.card}>
        <h1 className={styles.titulo}>Verifique seu e-mail</h1>
        <p className={styles.mensagem}>
          Se esse e-mail estiver cadastrado, enviamos instruções pra redefinir sua senha.
        </p>
        <Link to="/login" className={styles.link}>
          Voltar para o login
        </Link>
      </Card>
    )
  }

  return (
    <Card className={styles.card}>
      <h1 className={styles.titulo}>Recuperar senha</h1>
      <p className={styles.mensagem}>Informe seu e-mail e enviaremos instruções de recuperação.</p>
      <form onSubmit={handleSubmit(aoSubmeter)} className={styles.formulario} noValidate>
        <Input
          label="E-mail"
          id="email"
          type="email"
          placeholder="voce@exemplo.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
        </Button>
      </form>
      <p className={styles.rodape}>
        <Link to="/login">Voltar para o login</Link>
      </p>
    </Card>
  )
}

export { RecuperarSenhaForm }
