import { useState, useCallback } from 'react'

const MAX_HISTORICO = 50

function carregar() {
  try { return JSON.parse(localStorage.getItem('album_historico') || '[]') } catch { return [] }
}

function salvar(lista) {
  try { localStorage.setItem('album_historico', JSON.stringify(lista)) } catch {}
}

export function useHistorico() {
  const [historico, setHistorico] = useState(carregar)

  const registrar = useCallback((evento) => {
    setHistorico(prev => {
      const novo = [{ ...evento, data: new Date().toISOString() }, ...prev].slice(0, MAX_HISTORICO)
      salvar(novo)
      return novo
    })
  }, [])

  const limpar = useCallback(() => {
    setHistorico([])
    localStorage.removeItem('album_historico')
  }, [])

  return { historico, registrar, limpar }
}
