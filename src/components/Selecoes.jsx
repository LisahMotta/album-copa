import { useState } from 'react'
import { SELECOES, POSICOES, calcularStatsSelecao } from '../data/dados'
import { Figurinha } from '../components/Figurinha'

export function Selecoes({ colecao, onClickFig }) {
  const [detalhe, setDetalhe] = useState(null)

  if (detalhe) {
    const sel = SELECOES.find(s => s.id === detalhe)
    const st = calcularStatsSelecao(colecao, sel.id)

    return (
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Cabeçalho seleção */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px',
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, zIndex: 10
        }}>
          <button
            onClick={() => setDetalhe(null)}
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--text-muted)', padding: '0 6px 0 0' }}
          >←</button>
          <span style={{ fontSize: 28 }}>{sel.flag}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{sel.nome}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {st.coletadas}/{st.total} coletadas · {st.repetidas} repetidas
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold)' }}>{st.pct}%</div>
        </div>

        {/* Progress */}
        <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)' }}>
          <div className="progress">
            <div className={`progress-fill ${st.pct === 100 ? 'full' : ''}`} style={{ width: `${st.pct}%` }} />
          </div>
        </div>

        {/* Figurinhas da seleção */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
          gap: 6, padding: '10px 10px 20px'
        }}>
          {POSICOES.map((posNome, i) => {
            const pos = i + 1
            const key = `${sel.id}_${pos}`
            const fig = colecao[key] || { status: 'falta', qtd: 0 }
            return (
              <div key={key}>
                <Figurinha
                  selecao={sel}
                  pos={pos}
                  figurinha={fig}
                  onClick={() => onClickFig(sel.id, pos, fig)}
                />
                <div style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', marginTop: 2, lineHeight: 1.2 }}>
                  {posNome.split(' ').slice(0, 2).join(' ')}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Lista de seleções agrupadas por grupo
  const grupos = [...new Set(SELECOES.map(s => s.grupo))].sort()

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '10px 12px 20px' }}>
      {grupos.map(grupo => (
        <div key={grupo} style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            marginBottom: 8, paddingLeft: 4
          }}>Grupo {grupo}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SELECOES.filter(s => s.grupo === grupo).map(sel => {
              const st = calcularStatsSelecao(colecao, sel.id)
              return (
                <button
                  key={sel.id}
                  onClick={() => setDetalhe(sel.id)}
                  style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: '10px 14px', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', textAlign: 'left',
                    transition: 'border-color 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                    <span style={{ fontSize: 26 }}>{sel.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{sel.nome}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {st.coletadas}/{st.total} · {st.repetidas} rep.
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: st.pct === 100 ? 'var(--green)' : 'var(--gold)' }}>
                      {st.pct}%
                    </div>
                  </div>
                  <div className="progress">
                    <div className={`progress-fill ${st.pct === 100 ? 'full' : ''}`} style={{ width: `${st.pct}%` }} />
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
