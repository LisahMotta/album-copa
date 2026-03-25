import { useState } from 'react'
import { SELECOES, POSICOES, calcularStatsSelecao } from '../data/dados'
import { Figurinha } from './Figurinha'
import { FlagBadge } from './FlagBadge'

export function Selecoes({ colecao, onClique, onLongPress, anotacoes }) {
  const [detalhe, setDetalhe] = useState(null)

  if (detalhe) {
    const sel = SELECOES.find(s => s.id === detalhe)
    const st = calcularStatsSelecao(colecao, sel.id)

    return (
      <div className="scroll-area">
        {/* Cabeçalho sticky */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>

          {/* Banner Panini da seleção */}
          <div style={{
            background: 'var(--dark)', padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <button onClick={() => setDetalhe(null)} style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
              color: '#fff', fontSize: 18, lineHeight: 1, padding: '6px 8px',
              borderRadius: 8, WebkitTapHighlightColor: 'transparent'
            }}>←</button>

            <div style={{ fontSize: 36, lineHeight: 1 }}>
              {sel.flag ? sel.flag : (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 52, height: 36, background: '#012169',
                  borderRadius: 6, fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: 1
                }}>{sel.sigla}</span>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>
                {sel.nome.toUpperCase()}
              </div>
              <div style={{ fontSize: 11, color: 'var(--gold-light)', marginTop: 3 }}>
                GRUPO {sel.grupo} · {st.coletadas}/{st.total} · {st.pct}%
              </div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div style={{ height: 4, background: 'var(--border)' }}>
            <div style={{
              height: '100%', width: `${st.pct}%`,
              background: st.pct === 100 ? 'var(--green)' : 'var(--gold)',
              transition: 'width 0.4s'
            }} />
          </div>

          <div style={{ padding: '6px 14px', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
            Toque para coletar · segure para anotar
          </div>
        </div>

        <div className="fig-grid">
          {POSICOES.map((posNome, i) => {
            const pos = i + 1
            const key = `${sel.id}_${pos}`
            const fig = colecao[key] || { status: 'falta', qtd: 0 }
            const temNota = !!(anotacoes && anotacoes[key])
            return (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Figurinha
                  selecao={sel} pos={pos} figurinha={fig}
                  temAnotacao={temNota}
                  onClick={() => onClique(sel.id, pos)}
                  onLongPress={() => onLongPress?.(sel.id, pos, key)}
                />
                <div style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2, maxWidth: 58 }}>
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
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, paddingLeft: 2
          }}>Grupo {grupo}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SELECOES.filter(s => s.grupo === grupo).map(sel => {
              const st = calcularStatsSelecao(colecao, sel.id)
              return (
                <button key={sel.id} className="selecao-card" onClick={() => setDetalhe(sel.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>

                    {/* Bandeira grande */}
                    <div style={{ flexShrink: 0 }}>
                      {sel.flag
                        ? <span style={{ fontSize: 36, lineHeight: 1 }}>{sel.flag}</span>
                        : <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 50, height: 34, background: '#012169',
                            borderRadius: 5, fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: 1
                          }}>{sel.sigla}</span>
                      }
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{sel.nome}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                        {st.coletadas}/{st.total} coletadas
                        {st.repetidas > 0 && <span style={{ color: 'var(--green)', marginLeft: 6 }}>· {st.repetidas} extras</span>}
                      </div>
                    </div>

                    <div style={{
                      fontSize: 20, fontWeight: 800,
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
