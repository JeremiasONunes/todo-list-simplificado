import { useCallback, useEffect, useState } from 'react'

/**
 * Base de todo hook de LEITURA — 1º consumidor real é `useTasks` (Fase 5);
 * não existia antes porque nada no projeto até aqui precisava de
 * carregando/erro/recarregar (Landing é estático, Auth é só mutation).
 *
 * `cancelado` protege contra atualizar estado depois que o efeito já não
 * importa mais (componente desmontou, ou uma nova chamada de `buscar` já
 * substituiu esta) — mesmo padrão usado em `AuthContext` (Fase 4).
 */
function useAsync(funcaoAssincrona) {
  const [dado, setDado] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let cancelado = false
    setCarregando(true)
    setErro(null)

    funcaoAssincrona()
      .then((resultado) => !cancelado && setDado(resultado))
      .catch((e) => !cancelado && setErro(e))
      .finally(() => !cancelado && setCarregando(false))

    return () => {
      cancelado = true
    }
  }, [funcaoAssincrona, tentativa])

  const recarregar = useCallback(() => setTentativa((atual) => atual + 1), [])

  return { dado, carregando, erro, recarregar }
}

export { useAsync }
