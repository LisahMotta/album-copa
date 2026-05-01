import { useRef, useEffect } from 'react'
import { SELECOES, POSICOES, calcularStats, calcularStatsSelecao } from '../data/dados'

export function GerarImagem({ colecao, onFechar }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 1080, H = 1080
    canvas.width = W
    canvas.height = H

    const { coletadas, total, pct, repetidas, faltam } = calcularStats(colecao)

    // Fundo escuro degradê
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#0f172a')
    bg.addColorStop(1, '#1e1b4b')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Detalhe decorativo círculo
    ctx.beginPath()
    ctx.arc(W - 80, 80, 200, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(200,146,42,0.06)'
    ctx.fill()

    // Título
    ctx.fillStyle = '#c8922a'
    ctx.font = 'bold 52px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('⚽ MEU ÁLBUM COPA', W / 2, 90)

    // Subtítulo
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '28px Arial'
    ctx.fillText('Panini World Cup Collection', W / 2, 135)

    // Percentual grande
    ctx.font = 'bold 160px Arial'
    ctx.fillStyle = '#e8b84b'
    ctx.fillText(`${pct}%`, W / 2, 310)

    ctx.font = 'bold 30px Arial'
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.fillText('completo', W / 2, 355)

    // Stats
    const stats = [
      { label: 'Coletadas', valor: coletadas, cor: '#c8922a' },
      { label: 'Faltam',   valor: faltam,    cor: '#94a3b8' },
      { label: 'Extras',   valor: repetidas,  cor: '#22a05a' },
      { label: 'Total',    valor: total,      cor: '#94a3b8' },
    ]
    const boxW = 220, boxH = 100, startX = 55, startY = 390, gap = 15
    stats.forEach((s, i) => {
      const x = startX + i * (boxW + gap)
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      ctx.beginPath()
      ctx.roundRect(x, startY, boxW, boxH, 14)
      ctx.fill()
      ctx.fillStyle = s.cor
      ctx.font = 'bold 42px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(s.valor, x + boxW / 2, startY + 55)
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '22px Arial'
      ctx.fillText(s.label, x + boxW / 2, startY + 85)
    })

    // Barra de progresso
    const barY = 520, barH2 = 16, barW = W - 110
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.beginPath(); ctx.roundRect(55, barY, barW, barH2, 8); ctx.fill()
    const gradBar = ctx.createLinearGradient(55, 0, 55 + barW * pct / 100, 0)
    gradBar.addColorStop(0, '#c8922a'); gradBar.addColorStop(1, '#e8b84b')
    ctx.fillStyle = gradBar
    ctx.beginPath(); ctx.roundRect(55, barY, barW * pct / 100, barH2, 8); ctx.fill()

    // Grid de seleções
    const selOrdenadas = [...SELECOES].sort((a,b) => a.nome.localeCompare(b.nome,'pt-BR'))
    const cols = 8, rows = Math.ceil(selOrdenadas.length / cols)
    const cellW = (W - 80) / cols, cellH = 56
    const gridY = 560

    selOrdenadas.forEach((sel, idx) => {
      const col = idx % cols, row = Math.floor(idx / cols)
      const x = 40 + col * cellW, y = gridY + row * (cellH + 6)
      const st = calcularStatsSelecao(colecao, sel.id)

      // Fundo célula
      ctx.fillStyle = st.pct === 100
        ? 'rgba(34,160,90,0.25)'
        : st.pct > 0
          ? 'rgba(200,146,42,0.15)'
          : 'rgba(255,255,255,0.04)'
      ctx.beginPath(); ctx.roundRect(x, y, cellW - 6, cellH, 8); ctx.fill()

      // Borda se completa
      if (st.pct === 100) {
        ctx.strokeStyle = '#22a05a'
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.roundRect(x, y, cellW - 6, cellH, 8); ctx.stroke()
      }

      // Flag
      ctx.font = '22px serif'
      ctx.textAlign = 'left'
      ctx.fillText(sel.flag || sel.sigla, x + 6, y + 30)

      // Pct
      ctx.font = `bold 14px Arial`
      ctx.fillStyle = st.pct === 100 ? '#4ade80' : st.pct > 0 ? '#e8b84b' : 'rgba(255,255,255,0.3)'
      ctx.textAlign = 'right'
      ctx.fillText(`${st.pct}%`, x + cellW - 10, y + 22)

      // Mini barra
      const mbarW = cellW - 14, mbarY = y + cellH - 10
      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      ctx.beginPath(); ctx.roundRect(x + 6, mbarY, mbarW - 2, 4, 2); ctx.fill()
      ctx.fillStyle = st.pct === 100 ? '#22a05a' : '#c8922a'
      ctx.beginPath(); ctx.roundRect(x + 6, mbarY, (mbarW - 2) * st.pct / 100, 4, 2); ctx.fill()
    })

    // Rodapé
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.font = '24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`gerado em ${new Date().toLocaleDateString('pt-BR')} • Álbum Copa PWA`, W / 2, H - 30)

  }, [colecao])

  function baixar() {
    const a = document.createElement('a')
    a.href = canvasRef.current.toDataURL('image/png')
    a.download = `album-copa-${new Date().toLocaleDateString('pt-BR').replace(/\//g,'-')}.png`
    a.click()
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '90dvh' }}>
        <div className="modal-handle" />
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📸 Imagem para Instagram</div>

        <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 14, border: '1px solid var(--border)' }}>
          <canvas ref={canvasRef} style={{ width: '100%', display: 'block' }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={baixar} style={{
            flex: 2, padding: '13px', borderRadius: 12,
            background: 'var(--gold)', border: 'none', color: '#fff',
            fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)'
          }}>⬇️ Baixar imagem (1080×1080)</button>
          <button onClick={onFechar} style={{
            flex: 1, padding: '13px', borderRadius: 12,
            border: '1.5px solid var(--border)', background: 'none',
            color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-body)'
          }}>Fechar</button>
        </div>
      </div>
    </div>
  )
}
