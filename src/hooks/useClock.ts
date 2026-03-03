import { useEffect, useState } from 'react'

export function useClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return time
}
