import { useState, useCallback } from 'react'
import { iniciarColecao, salvarColecao, gerarChave } from '../data/dados'

export function useColecao() {
  const [colecao, setColecao] = useState(() => iniciarColecao())

  const atualizar = useCallback((key, novoStatus, qtdExtra = 0) => {
    setColecao(prev => {
      const nova = { ...prev }
      const atual = nova[key] || { status: 'falta', qtd: 0 }

      if (novoStatus === 'repetida') {
        nova[key] = { status: 'repetida', qtd: (atual.qtd || 1) + 1 }
      } else if (novoStatus === 'falta') {
        nova[key] = { status: 'falta', qtd: 0 }
      } else {
        nova[key] = { status: novoStatus, qtd: 1 }
      }

      salvarColecao(nova)
      return nova
    })
  }, [])

  const coletar = useCallback((selId, pos) => {
    atualizar(gerarChave(selId, pos), 'coletada')
  }, [atualizar])

  const marcarRepetida = useCallback((selId, pos) => {
    atualizar(gerarChave(selId, pos), 'repetida')
  }, [atualizar])

  const marcarRetida = useCallback((selId, pos) => {
    atualizar(gerarChave(selId, pos), 'retida')
  }, [atualizar])

  const remover = useCallback((selId, pos) => {
    atualizar(gerarChave(selId, pos), 'falta')
  }, [atualizar])

  const colarRetida = useCallback((key) => {
    setColecao(prev => {
      const nova = { ...prev, [key]: { status: 'coletada', qtd: 1 } }
      salvarColecao(nova)
      return nova
    })
  }, [])

  const getFigurinha = useCallback((selId, pos) => {
    return colecao[gerarChave(selId, pos)] || { status: 'falta', qtd: 0 }
  }, [colecao])

  return { colecao, coletar, marcarRepetida, marcarRetida, remover, colarRetida, getFigurinha }
}
