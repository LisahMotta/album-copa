import { useState, useCallback } from 'react'

function carregar() {
  try { return JSON.parse(localStorage.getItem('album_anotacoes') || '{}') } catch { return {} }
}

export function useAnotacoes() {
  const [anotacoes, setAnotacoes] = useState(carregar)

  const salvarAnotacao = useCallback((key, texto) => {
    setAnotacoes(prev => {
      const novo = { ...prev }
      if (texto.trim()) novo[key] = texto.trim()
      else delete novo[key]
      try { localStorage.setItem('album_anotacoes', JSON.stringify(novo)) } catch {}
      return novo
    })
  }, [])

  const getAnotacao = useCallback((key) => {
    return anotacoes[key] || ''
  }, [anotacoes])

  return { anotacoes, salvarAnotacao, getAnotacao }
}
