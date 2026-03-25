import { useState, useCallback } from 'react'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { BottomNav } from './components/BottomNav'
import { Painel } from './components/Painel'
import { Selecoes } from './components/Selecoes'
import { Troca } from './components/Troca'
import { ModalRemoverExtras } from './components/ModalRemoverExtras'
import { Toast, showToast } from './components/Toast'
import { useColecao } from './hooks/useColecao'

const MAX_QTD = 5

export default function App() {
  const [aba, setAba] = useState('painel')
  const [modalRemover, setModalRemover] = useState(null)  // { selId, pos, qtd }

  const { colecao, clicarFigurinha, removerExtras, realizarTroca, getFigurinha } = useColecao()

  // Único handler de clique em figurinha
  const handleClique = useCallback((selId, pos) => {
    const fig = getFigurinha(selId, pos)

    // Se está no máximo → abre modal para remover
    if (fig.status === 'repetida' && (fig.qtd || 2) >= MAX_QTD) {
      setModalRemover({ selId, pos, qtd: fig.qtd })
      return
    }

    // Qualquer outro caso → avança normalmente
    clicarFigurinha(selId, pos)

    // Toast de feedback
    if (fig.status === 'falta')         showToast('Figurinha coletada! ⭐')
    else if (fig.status === 'coletada') showToast('Marcada como repetida')
    else {
      const novaQtd = (fig.qtd || 2) + 1
      if (novaQtd >= MAX_QTD)          showToast(`Máximo atingido! (${MAX_QTD - 1} extras) — clique para remover`)
      else                              showToast(`${novaQtd - 1} extra${novaQtd - 1 !== 1 ? 's' : ''}`)
    }
  }, [getFigurinha, clicarFigurinha])

  const handleConfirmarRemover = useCallback((quantas) => {
    if (!modalRemover) return
    const { selId, pos, qtd } = modalRemover
    removerExtras(selId, pos, quantas)
    const sobra = (qtd || 2) - 1 - quantas
    showToast(sobra <= 0 ? 'Extras removidas — voltou ao álbum' : `${quantas} extra${quantas !== 1 ? 's' : ''} removida${quantas !== 1 ? 's' : ''}`)
    setModalRemover(null)
  }, [modalRemover, removerExtras])

  const handleTroca = useCallback((keyFaltante, keyRepetida) => {
    realizarTroca(keyFaltante, keyRepetida)
    showToast('Troca realizada! ✓')
  }, [realizarTroca])

  return (
    <>
      <Header colecao={colecao} />
      <StatsBar colecao={colecao} />

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {aba === 'painel'   && <Painel   colecao={colecao} onClique={handleClique} onTroca={handleTroca} />}
        {aba === 'selecoes' && <Selecoes colecao={colecao} onClique={handleClique} />}
        {aba === 'troca'    && <Troca    colecao={colecao} onTroca={handleTroca} />}
      </div>

      <BottomNav aba={aba} onChange={setAba} />

      {modalRemover && (
        <ModalRemoverExtras
          fig={modalRemover}
          onConfirmar={handleConfirmarRemover}
          onFechar={() => setModalRemover(null)}
        />
      )}

      <Toast />
    </>
  )
}
