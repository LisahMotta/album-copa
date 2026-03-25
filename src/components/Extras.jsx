import { useRef } from 'react'
import { SELECOES, POSICOES, getRepetidas, getFaltantesPorSelecao, gerarChave, calcularStats } from '../data/dados'
import { FlagBadge } from './FlagBadge'

// ── Exportar PDF de repetidas ──────────────────────────────
export function exportarRepetidasPDF(colecao) {
  const repetidas = getRepetidas(colecao)
  if (repetidas.length === 0) { alert('Você não tem figurinhas extras no momento.'); return }

  // Agrupa por seleção
  const porSel = {}
  repetidas.forEach(({ selecao, posicao, num, qtdExtra }) => {
    if (!porSel[selecao.id]) porSel[selecao.id] = { selecao, itens: [] }
    porSel[selecao.id].itens.push({ posicao, num, qtdExtra })
  })

  const totalExtras = repetidas.reduce((s, r) => s + r.qtdExtra, 0)
  const data = new Date().toLocaleDateString('pt-BR')

  let html = `
    <html><head><meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
      h1 { font-size: 20px; margin-bottom: 4px; }
      .sub { font-size: 13px; color: #666; margin-bottom: 20px; }
      .selecao { margin-bottom: 16px; break-inside: avoid; }
      .selecao-titulo { font-size: 14px; font-weight: bold; background: #f0f0f0; padding: 6px 10px; border-radius: 6px; margin-bottom: 6px; }
      .item { font-size: 12px; padding: 3px 10px; display: flex; gap: 8px; }
      .item .num { color: #888; width: 28px; }
      .item .qtd { background: #22a05a; color: white; border-radius: 10px; padding: 1px 7px; font-size: 11px; font-weight: bold; }
      @media print { body { padding: 10px; } }
    </style></head><body>
    <h1>⚽ Minhas Figurinhas Extras</h1>
    <div class="sub">Gerado em ${data} · ${repetidas.length} figurinhas diferentes · ${totalExtras} extras no total</div>
  `

  Object.values(porSel).forEach(({ selecao, itens }) => {
    html += `<div class="selecao"><div class="selecao-titulo">${selecao.flag || selecao.sigla} ${selecao.nome}</div>`
    itens.forEach(({ posicao, num, qtdExtra }) => {
      html += `<div class="item"><span class="num">#${num}</span><span>${posicao}</span><span class="qtd">${qtdExtra}x</span></div>`
    })
    html += `</div>`
  })

  html += `</body></html>`

  const win = window.open('', '_blank')
  win.document.write(html)
  win.document.close()
  setTimeout(() => win.print(), 400)
}

// ── Compartilhar faltantes via WhatsApp ────────────────────
export function compartilharWhatsApp(colecao) {
  const faltantes = getFaltantesPorSelecao(colecao)
  if (faltantes.length === 0) { alert('Parabéns! Você não tem figurinhas faltantes! 🎉'); return }

  const { faltam } = calcularStats(colecao)
  let texto = `⚽ *Minhas figurinhas faltantes*\n`
  texto += `_${faltam} faltando no total_\n\n`

  faltantes.slice(0, 15).forEach(({ selecao, faltantes: lista }) => {
    const flag = selecao.flag || selecao.sigla
    const nums = lista.map(f => `#${f.num}`).join(', ')
    texto += `${flag} *${selecao.nome}*: ${nums}\n`
  })

  if (faltantes.length > 15) texto += `\n_...e mais ${faltantes.length - 15} seleções_`

  const url = `https://wa.me/?text=${encodeURIComponent(texto)}`
  window.open(url, '_blank')
}

// ── Backup: exportar JSON ──────────────────────────────────
export function exportarJSON(colecao, anotacoes) {
  const dados = {
    versao: '2',
    data: new Date().toISOString(),
    colecao,
    anotacoes: anotacoes || {}
  }
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `album-copa-backup-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Restaurar JSON ─────────────────────────────────────────
export function ImportarJSON({ onImportar }) {
  const ref = useRef()

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const dados = JSON.parse(ev.target.result)
        if (!dados.colecao) throw new Error('Arquivo inválido')
        onImportar(dados.colecao, dados.anotacoes || {})
      } catch {
        alert('Arquivo inválido. Selecione um backup gerado pelo Álbum Copa.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <>
      <input ref={ref} type="file" accept=".json" onChange={handleFile} style={{ display: 'none' }} />
      <button onClick={() => ref.current.click()} style={{
        width: '100%', padding: '13px 16px', borderRadius: 12,
        border: '1.5px solid var(--border)', background: 'var(--bg)',
        color: 'var(--text)', fontFamily: 'var(--font-body)',
        fontSize: 15, fontWeight: 500, cursor: 'pointer', textAlign: 'center',
      }}>
        📂 Restaurar backup (JSON)
      </button>
    </>
  )
}

// ── Histórico de trocas ────────────────────────────────────
export function Historico({ historico, onLimpar }) {
  if (historico.length === 0) {
    return (
      <div className="empty-state" style={{ paddingTop: 40 }}>
        <div className="icon">🔄</div>
        <div className="title">Nenhuma troca registrada</div>
        <div className="sub">As trocas que você realizar aparecerão aqui.</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '12px 14px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
          {historico.length} troca{historico.length !== 1 ? 's' : ''} registrada{historico.length !== 1 ? 's' : ''}
        </span>
        <button onClick={onLimpar} style={{
          background: 'none', border: 'none', color: 'var(--red)',
          fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)'
        }}>Limpar</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {historico.map((t, i) => {
          const selRecebida = SELECOES.find(s => s.id === t.selRecebida)
          const selDada = SELECOES.find(s => s.id === t.selDada)
          const data = new Date(t.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })

          return (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{data}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Recebida */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 32, height: 48, borderRadius: 5,
                    background: 'var(--gold-pale)', border: '1.5px solid var(--gold)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2
                  }}>
                    <FlagBadge sel={selRecebida} size={14} />
                    <span style={{ fontSize: 8, color: '#92640a' }}>#{t.numRecebida}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{selRecebida?.nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{POSICOES[t.numRecebida - 1]}</div>
                  </div>
                </div>

                <div style={{ fontSize: 18, color: 'var(--text-muted)' }}>⇄</div>

                {/* Dada */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{selDada?.nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{POSICOES[t.numDada - 1]}</div>
                  </div>
                  <div style={{
                    width: 32, height: 48, borderRadius: 5,
                    background: 'var(--green-pale)', border: '1.5px solid var(--green)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2
                  }}>
                    <FlagBadge sel={selDada} size={14} />
                    <span style={{ fontSize: 8, color: '#166534' }}>#{t.numDada}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Painel de configurações ────────────────────────────────
export function PainelConfig({ darkMode, onToggleTema, colecao, anotacoes, onImportar, historico, onLimparHistorico, onZerar, zerarAtivo }) {
  return (
    <div className="scroll-area" style={{ padding: '16px 14px 100px' }}>

      {/* Tema */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Aparência
        </div>
        <button onClick={onToggleTema} style={{
          width: '100%', padding: '13px 16px', borderRadius: 12,
          border: '1.5px solid var(--border)', background: 'var(--bg-card)',
          color: 'var(--text)', fontFamily: 'var(--font-body)',
          fontSize: 15, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>{darkMode ? '☀️ Modo claro' : '🌙 Modo escuro'}</span>
          <span style={{
            background: darkMode ? 'var(--gold)' : 'var(--border)',
            color: darkMode ? '#fff' : 'var(--text-muted)',
            borderRadius: 12, padding: '2px 10px', fontSize: 12
          }}>{darkMode ? 'ATIVO' : 'OFF'}</span>
        </button>
      </div>

      {/* Compartilhar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Compartilhar
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => compartilharWhatsApp(colecao)} style={{
            width: '100%', padding: '13px 16px', borderRadius: 12,
            border: '1.5px solid #25d366', background: '#f0fdf4',
            color: '#166534', fontFamily: 'var(--font-body)',
            fontSize: 15, fontWeight: 500, cursor: 'pointer', textAlign: 'center',
          }}>
            📲 Faltantes via WhatsApp
          </button>
          <button onClick={() => exportarRepetidasPDF(colecao)} style={{
            width: '100%', padding: '13px 16px', borderRadius: 12,
            border: '1.5px solid var(--gold)', background: 'var(--gold-pale)',
            color: '#92640a', fontFamily: 'var(--font-body)',
            fontSize: 15, fontWeight: 500, cursor: 'pointer', textAlign: 'center',
          }}>
            🖨️ Exportar extras em PDF
          </button>
        </div>
      </div>

      {/* Backup */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Backup da coleção
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => exportarJSON(colecao, anotacoes)} style={{
            width: '100%', padding: '13px 16px', borderRadius: 12,
            border: '1.5px solid var(--border)', background: 'var(--bg-card)',
            color: 'var(--text)', fontFamily: 'var(--font-body)',
            fontSize: 15, fontWeight: 500, cursor: 'pointer', textAlign: 'center',
          }}>
            💾 Exportar backup (JSON)
          </button>
          <ImportarJSON onImportar={onImportar} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
          O backup salva todas as figurinhas e anotações. Use para transferir entre dispositivos.
        </div>
      </div>

      {/* Zona de perigo */}
      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Zona de perigo
        </div>
        <button onClick={onZerar} style={{
          width: '100%', padding: '13px 16px', borderRadius: 12,
          border: '1.5px solid var(--red)',
          background: zerarAtivo ? 'var(--red)' : 'var(--red-pale)',
          color: zerarAtivo ? '#fff' : 'var(--red)',
          fontFamily: 'var(--font-body)',
          fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'center',
          transition: 'all 0.2s'
        }}>
          {zerarAtivo ? '⚠️ Toque novamente para confirmar' : '🗑️ Zerar todas as figurinhas'}
        </button>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
          Apaga toda a coleção e começa do zero. Faça um backup antes!
        </div>
      </div>

      {/* Histórico */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Histórico de trocas
        </div>
        <Historico historico={historico} onLimpar={onLimparHistorico} />
      </div>
    </div>
  )
}
