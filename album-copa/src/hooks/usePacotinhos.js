import { useState, useCallback } from 'react'

function carregar() {
  try { return parseInt(localStorage.getItem('album_pacotinhos') || '0') } catch { return 0 }
}

export function usePacotinhos() {
  const [pacotinhos, setPacotinhos] = useState(carregar)

  const abrirPacotinho = useCallback(() => {
    setPacotinhos(prev => {
      const novo = prev + 1
      localStorage.setItem('album_pacotinhos', String(novo))
      return novo
    })
  }, [])

  const resetar = useCallback(() => {
    setPacotinhos(0)
    localStorage.setItem('album_pacotinhos', '0')
  }, [])

  return { pacotinhos, abrirPacotinho, resetar }
}
