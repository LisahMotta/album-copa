import { useState, useCallback, useEffect } from 'react'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { BottomNav } from './components/BottomNav'
import { Painel } from './components/Painel'
import { Selecoes } from './components/Selecoes'
import { Troca } from './components/Troca'
import { Especiais } from './components/Especiais'
import { ModalRemoverExtras } from './components/ModalRemoverExtras'
import { ModalAnotacao } from './components/ModalAnotacao'
import { ModalOpcoes } from './components/ModalOpcoes'
import { Scanner } from './components/Scanner'
import { GerarImagem } from './components/GerarImagem'
import { PainelConfig } from './components/Extras'
import { Calculadora } from './components/Calculadora'
import { Toast, showToast } from './components/Toast'
import { useColecao, zerarColecao } from './hooks/useColecao'
import { useHistorico } from './hooks/useHistorico'
import { useAnotacoes } from './hooks/useAnotacoes'
import { useTema } from './hooks/useTema'
import { usePacotinhos } from './hooks/usePacotinhos'
import {
  SELECOES, calcularStatsSelecao, verificarConquistas,
  gerarChaveEspecial, calcularStatsCompleto
} from './data/dados'

const MAX_QTD = 5

export default function App() {
  const [aba, setAba] = useState('painel')
  const [modalRemover,   setModalRemover]   = useState(null)
  const [modalAnotacao,  setModalAnotacao]  = useState(null)
  const [modalOpcoes,    setModalOpcoes]    = useState(null)
  const [modalScanner,   setModalScanner]   = useState(false)
  const [modalImagem,    setModalImagem]    = useState(false)
  const [confirmarZerar, setConfirmarZerar] = useState(false)
  const [conquistasAntes, setConquistasAntes] = useState([])

  const { colecao, clicarFigurinha, removerExtras, remover, realizarTroca, getFigurinha, importarColecao, clicarEspecial } = useColecao()
  const { historico, registrar, limpar: limparHistorico } = useHistorico()
  const { anotacoes, salvarAnotacao, getAnotacao } = useAnotacoes()
  const { darkMode, toggleTema } = useTema()
  const { pacotinhos, abrirPacotinho, resetar: resetarPacotinhos } = usePacotinhos()

  // Notificação seleção completa
  useEffect(() => {
    SELECOES.forEach(sel => {
      const st = calcularStatsSelecao(colecao, sel.id)
      const key = `notif_${sel.id}`
      if (st.pct === 100 && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1')
        setTimeout(() => showToast(`🏆 ${sel.nome} completa!`), 400)
      }
    })
  }, [colecao])

  // Notificação de nova conquista
  useEffect(() => {
    const atuais = verificarConquistas(colecao, historico)
    const novas = atuais.filter(c => c.desbloqueada && !conquistasAntes.find(a => a.id === c.id && a.desbloqueada))
    novas.forEach((c, i) => setTimeout(() => showToast(`${c.icon} Conquista: ${c.titulo}`), i * 1200))
    setConquistasAntes(atuais)
  }, [colecao, historico])

  // Clique em figurinha normal
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
      const n = (fig.qtd || 2) + 1
      if (n >= MAX_QTD) showToast('Máximo! Toque novamente para remover')
      else showToast(`${n - 1} extra${n - 1 !== 1 ? 's' : ''}`)
    }
  }, [getFigurinha, clicarFigurinha])

  // Remover figurinha diretamente (botão X)
  const handleRemover = useCallback((selId, pos) => {
    const fig = getFigurinha(selId, pos)
    if (fig.status === 'repetida') {
      setModalRemover({ selId, pos, qtd: fig.qtd })
    } else {
      remover(selId, pos)
      showToast('Figurinha removida ✕')
    }
  }, [getFigurinha, remover])

  // Clique em figurinha especial
  const handleCliqueEspecial = useCallback((key, fig) => {
    if (fig.status === 'repetida' && (fig.qtd || 2) >= MAX_QTD) {
      setModalRemover({ key, isEspecial: true, qtd: fig.qtd })
      return
    }
    clicarEspecial(key)
    if (fig.status === 'falta')         showToast('Figurinha especial coletada! ✨')
    else if (fig.status === 'coletada') showToast('Marcada como extra')
    else showToast(`${(fig.qtd || 2)} extras`)
  }, [clicarEspecial])

  const handleLongPress = useCallback((selId, pos, key) => {
    const fig = getFigurinha(selId, pos)
    setModalOpcoes({ selId, pos, key, fig })
  }, [getFigurinha])

  const handleRemoverDireto = useCallback((selId, pos, fig) => {
    setModalOpcoes(null)
    if (fig.status === 'repetida') {
      setModalRemover({ selId, pos, qtd: fig.qtd })
    } else {
      remover(selId, pos)
      showToast('Figurinha removida do álbum')
    }
  }, [remover])

  const handleLongPressEspecial = useCallback((key) => {
    setModalAnotacao({ selId: null, pos: null, key })
  }, [])

  const handleConfirmarRemover = useCallback((quantas) => {
    if (!modalRemover) return
    const { selId, pos, qtd, key, isEspecial } = modalRemover
    if (isEspecial) {
      clicarEspecial(key, -quantas)
    } else {
      removerExtras(selId, pos, quantas)
    }
    const sobra = (qtd || 2) - 1 - quantas
    showToast(sobra <= 0 ? 'Voltou ao álbum' : `${quantas} extra${quantas !== 1 ? 's' : ''} removida${quantas !== 1 ? 's' : ''}`)
    setModalRemover(null)
  }, [modalRemover, removerExtras, clicarEspecial])

  const handleTroca = useCallback((keyFaltante, keyRepetida) => {
    const [selIdRec, numRec] = keyFaltante.split('_')
    const [selIdDad, numDad] = keyRepetida.split('_')
    registrar({ tipo: 'troca', selRecebida: selIdRec, numRecebida: parseInt(numRec), selDada: selIdDad, numDada: parseInt(numDad) })
    realizarTroca(keyFaltante, keyRepetida)
    showToast('Troca realizada! ✓')
  }, [realizarTroca, registrar])

  const handleImportar = useCallback((novaColecao, novasAnotacoes) => {
    importarColecao(novaColecao)
    if (novasAnotacoes) Object.entries(novasAnotacoes).forEach(([k, t]) => salvarAnotacao(k, t))
    showToast('Backup restaurado!')
  }, [importarColecao, salvarAnotacao])

  const handleZerar = useCallback(() => {
    if (!confirmarZerar) {
      setConfirmarZerar(true)
      setTimeout(() => setConfirmarZerar(false), 4000)
      return
    }
    zerarColecao()
    window.location.reload()
  }, [confirmarZerar])

  const handleScannerColetar = useCallback((selId, pos) => {
    const fig = getFigurinha(selId, pos)
    clicarFigurinha(selId, pos)
    showToast(fig.status === 'falta' ? 'Coletada via scanner! ⭐' : 'Extra registrada via scanner')
  }, [getFigurinha, clicarFigurinha])

  const handleScannerEspecial = useCallback((key, fig) => {
    clicarEspecial(key)
    showToast(fig.status === 'falta' ? 'Especial coletada! ✨' : 'Extra registrada via scanner')
  }, [clicarEspecial])

  // Stats completas (seleções + especiais)
  const statsCompletas = calcularStatsCompleto(colecao)

  return (
    <>
      <Header stats={statsCompletas} onScanner={() => setModalScanner(true)} />
      <StatsBar stats={statsCompletas} />

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {aba === 'painel'    && <Painel    colecao={colecao} onClique={handleClique} onRemover={handleRemover} onLongPress={handleLongPress} anotacoes={anotacoes} historico={historico} />}
        {aba === 'selecoes'  && <Selecoes  colecao={colecao} onClique={handleClique} onRemover={handleRemover} onLongPress={handleLongPress} anotacoes={anotacoes} />}
        {aba === 'especiais' && <Especiais colecao={colecao} onClique={handleCliqueEspecial} onLongPress={handleLongPressEspecial} anotacoes={anotacoes} />}
        {aba === 'troca'     && <Troca     colecao={colecao} onTroca={handleTroca} />}
        {aba === 'config'    && (
          <div className="scroll-area">
            <Calculadora colecao={colecao} pacotinhosAbertos={pacotinhos} onAbrirPacotinho={abrirPacotinho} onResetar={resetarPacotinhos} />
            <div style={{ padding: '0 14px' }}>
              <button onClick={() => setModalImagem(true)} style={{
                width: '100%', padding: '13px', borderRadius: 12, marginBottom: 8,
                border: '1.5px solid #e879f9', background: '#fdf4ff',
                color: '#86198f', fontFamily: 'var(--font-body)',
                fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'center'
              }}>📸 Gerar imagem para Instagram</button>
            </div>
            <PainelConfig
              onZerar={handleZerar} zerarAtivo={confirmarZerar}
              darkMode={darkMode} onToggleTema={toggleTema}
              colecao={colecao} anotacoes={anotacoes}
              onImportar={handleImportar}
              historico={historico} onLimparHistorico={limparHistorico}
            />
          </div>
        )}
      </div>

      <BottomNav aba={aba} onChange={setAba} />

      {modalOpcoes && (
        <ModalOpcoes
          selId={modalOpcoes.selId}
          pos={modalOpcoes.pos}
          fig={modalOpcoes.fig}
          anotacaoAtual={getAnotacao(modalOpcoes.key)}
          onAnotar={() => {
            setModalOpcoes(null)
            setModalAnotacao({ selId: modalOpcoes.selId, pos: modalOpcoes.pos, key: modalOpcoes.key })
          }}
          onRemover={() => handleRemoverDireto(modalOpcoes.selId, modalOpcoes.pos, modalOpcoes.fig)}
          onFechar={() => setModalOpcoes(null)}
        />
      )}
      {modalRemover && <ModalRemoverExtras fig={modalRemover} onConfirmar={handleConfirmarRemover} onFechar={() => setModalRemover(null)} />}
      {modalAnotacao && (
        <ModalAnotacao
          selId={modalAnotacao.selId} pos={modalAnotacao.pos}
          anotacaoAtual={getAnotacao(modalAnotacao.key)}
          onSalvar={(t) => salvarAnotacao(modalAnotacao.key, t)}
          onFechar={() => setModalAnotacao(null)}
        />
      )}
      {modalScanner && <Scanner colecao={colecao} onColetar={handleScannerColetar} onColetarEspecial={handleScannerEspecial} onFechar={() => setModalScanner(false)} />}
      {modalImagem  && <GerarImagem colecao={colecao} onFechar={() => setModalImagem(false)} />}
      <Toast />
    </>
  )
}
