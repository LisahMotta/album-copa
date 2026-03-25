import { useState, useCallback } from 'react'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { BottomNav } from './components/BottomNav'
import { Painel } from './components/Painel'
import { Selecoes } from './components/Selecoes'
import { Retidas } from './components/Retidas'
import { FigModal } from './components/FigModal'
import { Toast, showToast } from './components/Toast'
import { useColecao } from './hooks/useColecao'

export default function App() {
  const [aba, setAba] = useState('painel')
  const [modal, setModal] = useState(null)

  const { colecao, coletar, marcarRepetida, marcarRetida, remover, colarRetida, getFigurinha } = useColecao()

  const abrirModal = useCallback((selId, pos, fig) => {
    setModal({ selId, pos, statusAtual: fig.status, qtd: fig.qtd })
  }, [])

  const handleAcao = useCallback((acao) => {
    if (!modal) return
    const { selId, pos } = modal

    switch (acao) {
      case 'coletar':
        coletar(selId, pos)
        showToast('Figurinha coletada! ⭐')
        break
      case 'repetida':
        marcarRepetida(selId, pos)
        showToast('Marcada como repetida')
        break
      case 'reter':
        marcarRetida(selId, pos)
        showToast('Guardada como retida 📌')
        break
      case 'colar':
        colarRetida(`${selId}_${pos}`)
        showToast('Colada no álbum! ✓')
        break
      case 'remover':
        remover(selId, pos)
        showToast('Removida do álbum')
        break
    }

    setModal(null)
  }, [modal, coletar, marcarRepetida, marcarRetida, colarRetida, remover])

  const handleColar = useCallback((key) => {
    colarRetida(key)
    showToast('Colada no álbum! ✓')
  }, [colarRetida])

  const modalComFig = modal ? {
    ...modal,
    ...getFigurinha(modal.selId, modal.pos),
    statusAtual: modal.statusAtual,
    qtd: getFigurinha(modal.selId, modal.pos).qtd
  } : null

  return (
    <>
      <Header colecao={colecao} />
      <StatsBar colecao={colecao} />

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {aba === 'painel' && (
          <Painel colecao={colecao} onClickFig={abrirModal} />
        )}
        {aba === 'selecoes' && (
          <Selecoes colecao={colecao} onClickFig={abrirModal} />
        )}
        {aba === 'retidas' && (
          <Retidas colecao={colecao} onColar={handleColar} onClickFig={abrirModal} />
        )}
      </div>

      <BottomNav aba={aba} colecao={colecao} onChange={setAba} />

      {modalComFig && (
        <FigModal
          fig={modalComFig}
          onAcao={handleAcao}
          onFechar={() => setModal(null)}
        />
      )}

      <Toast />
    </>
  )
}
