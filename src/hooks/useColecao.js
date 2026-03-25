import { useState, useCallback } from 'react'
import { iniciarColecao, salvarColecao, gerarChave } from '../data/dados'

const MAX_QTD = 5  // máximo total por figurinha (1 álbum + 4 extras)

export function useColecao() {
  const [colecao, setColecao] = useState(() => iniciarColecao())

  const aplicarUpdates = useCallback((updates) => {
    setColecao(prev => {
      const nova = { ...prev, ...updates }
      salvarColecao(nova)
      return nova
    })
  }, [])

  // Clique único progressivo:
  // falta → coletada(1)
  // coletada(1) → repetida(2) → repetida(3) → ... → repetida(MAX_QTD)
  // repetida(MAX_QTD) → não faz nada (trava — app abre modal de remover)
  const clicarFigurinha = useCallback((selId, pos) => {
    const key = gerarChave(selId, pos)
    setColecao(prev => {
      const atual = prev[key] || { status: 'falta', qtd: 0 }
      let novo

      if (atual.status === 'falta') {
        novo = { status: 'coletada', qtd: 1 }
      } else if (atual.status === 'coletada') {
        novo = { status: 'repetida', qtd: 2 }
      } else if (atual.status === 'repetida') {
        if ((atual.qtd || 2) >= MAX_QTD) return prev  // travou — modal cuida do resto
        novo = { status: 'repetida', qtd: (atual.qtd || 2) + 1 }
      } else {
        return prev
      }

      const nova = { ...prev, [key]: novo }
      salvarColecao(nova)
      return nova
    })
  }, [])

  // Remove N unidades extras (chamado pelo modal)
  const removerExtras = useCallback((selId, pos, quantas) => {
    const key = gerarChave(selId, pos)
    setColecao(prev => {
      const atual = prev[key] || { status: 'repetida', qtd: 2 }
      const novaQtd = (atual.qtd || 2) - quantas
      const novo = novaQtd <= 1
        ? { status: 'coletada', qtd: 1 }
        : { status: 'repetida', qtd: novaQtd }
      const nova = { ...prev, [key]: novo }
      salvarColecao(nova)
      return nova
    })
  }, [])

  const remover = useCallback((selId, pos) => {
    aplicarUpdates({ [gerarChave(selId, pos)]: { status: 'falta', qtd: 0 } })
  }, [aplicarUpdates])

  const realizarTroca = useCallback((keyFaltante, keyRepetida) => {
    setColecao(prev => {
      const rep = prev[keyRepetida] || { status: 'repetida', qtd: 2 }
      const novaQtd = (rep.qtd || 2) - 1
      const nova = {
        ...prev,
        [keyFaltante]: { status: 'coletada', qtd: 1 },
        [keyRepetida]: novaQtd <= 1
          ? { status: 'coletada', qtd: 1 }
          : { status: 'repetida', qtd: novaQtd }
      }
      salvarColecao(nova)
      return nova
    })
  }, [])

  const getFigurinha = useCallback((selId, pos) => {
    return colecao[gerarChave(selId, pos)] || { status: 'falta', qtd: 0 }
  }, [colecao])

  return { colecao, clicarFigurinha, removerExtras, remover, realizarTroca, getFigurinha }
}
