import { useState } from 'react'
import { SELECOES, POSICOES, calcularStatsSelecao } from '../data/dados'
import { Figurinha } from './Figurinha'
import { FlagBadge } from './FlagBadge'

export function Selecoes({ colecao, onClique }) {
  const [detalhe, setDetalhe] = useState(null)

  if (detalhe) {
    const sel = SELECOES.find(s => s.id === detalhe)
    const st = calcularStatsSelecao(colecao, sel.id)

    return (
      <div className="scroll-area">
        {/* Cabeçalho sticky */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          padding: '12px 16px 10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <button onClick={() => setDetalhe(null)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: 22, lineHeight: 1,
              padding: '4px', marginLeft: -4,
              WebkitTapHighlightColor: 'transparent'
            }}>←</button>
            <FlagBadge sel={sel} size={28} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{sel.nome}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {st.coletadas}/{st.total} · {st.repetidas} extras · {st.pct}%
              </div>
            </div>
          </div>
          <div className="progress-card">
            <div className={`progress-card-fill ${st.pct === 100 ? 'full' : ''}`} style={{ width: `${st.pct}%` }} />
          </div>
        </div>

        <p className="hint">Toque para coletar · repita para extra · vermelho = limite atingido</p>

        <div className="fig-grid">
          {POSICOES.map((posNome, i) => {
            const pos = i + 1
            const key = `${sel.id}_${pos}`
            const fig = colecao[key] || { status: 'falta', qtd: 0 }
            return (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Figurinha
                  selecao={sel} pos={pos} figurinha={fig}
                  onClick={() => onClique(sel.id, pos)}
                />
                <div style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2, maxWidth: 56 }}>
                  {posNome}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const grupos = [...new Set(SELECOES.map(s => s.grupo))].sort()

  return (
    <div className="scroll-area" style={{ padding: '12px 14px 100px' }}>
      {grupos.map(grupo => (
        <div key={grupo} style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 10, paddingLeft: 2
          }}>Grupo {grupo}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SELECOES.filter(s => s.grupo === grupo).map(sel => {
              const st = calcularStatsSelecao(colecao, sel.id)
              return (
                <button key={sel.id} className="selecao-card" onClick={() => setDetalhe(sel.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <FlagBadge sel={sel} size={32} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{sel.nome}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                        {st.coletadas}/{st.total} coletadas
                        {st.repetidas > 0 && <span style={{ color: 'var(--green)', marginLeft: 6 }}>· {st.repetidas} extras</span>}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 18, fontWeight: 700,
                      color: st.pct === 100 ? 'var(--green)' : st.pct > 0 ? 'var(--gold)' : 'var(--text-muted)'
                    }}>{st.pct}%</div>
                  </div>
                  <div className="progress-card">
                    <div className={`progress-card-fill ${st.pct === 100 ? 'full' : ''}`} style={{ width: `${st.pct}%` }} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
