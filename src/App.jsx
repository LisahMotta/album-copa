import { useState, useCallback, useEffect } from 'react'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { BottomNav } from './components/BottomNav'
import { Painel } from './components/Painel'
import { Selecoes } from './components/Selecoes'
import { Troca } from './components/Troca'
import { ModalRemoverExtras } from './components/ModalRemoverExtras'
import { ModalAnotacao } from './components/ModalAnotacao'
import { PainelConfig } from './components/Extras'
import { Toast, showToast } from './components/Toast'
import { useColecao } from './hooks/useColecao'
import { useHistorico } from './hooks/useHistorico'
import { useAnotacoes } from './hooks/useAnotacoes'
import { useTema } from './hooks/useTema'
import { SELECOES, POSICOES, calcularStatsSelecao } from './data/dados'

const MAX_QTD = 5

export default function App() {
  const [aba, setAba] = useState('painel')
  const [modalRemover, setModalRemover] = useState(null)
  const [modalAnotacao, setModalAnotacao] = useState(null)

  const { colecao, clicarFigurinha, removerExtras, realizarTroca, getFigurinha, importarColecao } = useColecao()
  const { historico, registrar, limpar: limparHistorico } = useHistorico()
  const { anotacoes, salvarAnotacao, getAnotacao } = useAnotacoes()
  const { darkMode, toggleTema } = useTema()

  // Notificação ao completar seleção
  useEffect(() => {
    SELECOES.forEach(sel => {
      const st = calcularStatsSelecao(colecao, sel.id)
      const key = `notif_${sel.id}`
      if (st.pct === 100 && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1')
        setTimeout(() => showToast(`🏆 ${sel.nome} completa!`), 300)
      }
    })
  }, [colecao])

  const handleClique = useCallback((selId, pos) => {
    const fig = getFigurinha(selId, pos)
    if (fig.status === 'repetida' && (fig.qtd || 2) >= MAX_QTD) {
      setModalRemover({ selId, pos, qtd: fig.qtd })
      return
    }
    clicarFigurinha(selId, pos)
    if (fig.status === 'falta')         showToast('Figurinha coletada! ⭐')
    else if (fig.status === 'coletada') showToast('Marcada como extra')
    else {
      const novaQtd = (fig.qtd || 2) + 1
      if (novaQtd >= MAX_QTD) showToast(`Máximo! Toque novamente para remover`)
      else showToast(`${novaQtd - 1} extra${novaQtd - 1 !== 1 ? 's' : ''}`)
    }
  }, [getFigurinha, clicarFigurinha])

  const handleLongPress = useCallback((selId, pos, key) => {
    setModalAnotacao({ selId, pos, key })
  }, [])

  const handleConfirmarRemover = useCallback((quantas) => {
    if (!modalRemover) return
    const { selId, pos, qtd } = modalRemover
    removerExtras(selId, pos, quantas)
    const sobra = (qtd || 2) - 1 - quantas
    showToast(sobra <= 0 ? 'Voltou ao álbum' : `${quantas} extra${quantas !== 1 ? 's' : ''} removida${quantas !== 1 ? 's' : ''}`)
    setModalRemover(null)
  }, [modalRemover, removerExtras])

  const handleTroca = useCallback((keyFaltante, keyRepetida) => {
    // Registra no histórico
    const [selIdRec, numRec] = keyFaltante.split('_')
    const [selIdDad, numDad] = keyRepetida.split('_')
    registrar({
      tipo: 'troca',
      selRecebida: selIdRec, numRecebida: parseInt(numRec),
      selDada: selIdDad,    numDada: parseInt(numDad),
    })
    realizarTroca(keyFaltante, keyRepetida)
    showToast('Troca realizada! ✓')
  }, [realizarTroca, registrar])

  const handleImportar = useCallback((novaColecao, novasAnotacoes) => {
    importarColecao(novaColecao)
    if (novasAnotacoes) {
      Object.entries(novasAnotacoes).forEach(([key, texto]) => salvarAnotacao(key, texto))
    }
    showToast('Backup restaurado com sucesso!')
  }, [importarColecao, salvarAnotacao])

  return (
    <>
      <Header colecao={colecao} darkMode={darkMode} onToggleTema={toggleTema} />
      <StatsBar colecao={colecao} />

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {aba === 'painel'   && <Painel   colecao={colecao} onClique={handleClique} onLongPress={handleLongPress} anotacoes={anotacoes} />}
        {aba === 'selecoes' && <Selecoes colecao={colecao} onClique={handleClique} onLongPress={handleLongPress} anotacoes={anotacoes} />}
        {aba === 'troca'    && <Troca    colecao={colecao} onTroca={handleTroca} />}
        {aba === 'config'   && (
          <PainelConfig
            darkMode={darkMode}
            onToggleTema={toggleTema}
            colecao={colecao}
            anotacoes={anotacoes}
            onImportar={handleImportar}
            historico={historico}
            onLimparHistorico={limparHistorico}
          />
        )}
      </div>

      <BottomNav aba={aba} onChange={setAba} />

      {modalRemover && (
        <ModalRemoverExtras fig={modalRemover} onConfirmar={handleConfirmarRemover} onFechar={() => setModalRemover(null)} />
      )}

      {modalAnotacao && (
        <ModalAnotacao
          selId={modalAnotacao.selId}
          pos={modalAnotacao.pos}
          anotacaoAtual={getAnotacao(modalAnotacao.key)}
          onSalvar={(texto) => salvarAnotacao(modalAnotacao.key, texto)}
          onFechar={() => setModalAnotacao(null)}
        />
      )}

      <Toast />
    </>
  )
}
