import { useState } from 'react'
import { getFaltantesPorSelecao, getRepetidas, POSICOES } from '../data/dados'
import { FlagBadge } from './FlagBadge'

export function Troca({ colecao, onTroca }) {
  const [etapa, setEtapa] = useState('selecao')   // 'selecao' | 'faltante' | 'repetida'
  const [selecaoSel, setSelecaoSel] = useState(null)
  const [faltanteSel, setFaltanteSel] = useState(null)

  const grupos = getFaltantesPorSelecao(colecao)
  const repetidas = getRepetidas(colecao)

  // ETAPA 1 — escolhe a seleção da faltante
  if (etapa === 'selecao') {
    if (grupos.length === 0) {
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
          <div style={{ fontSize: 48 }}>🎉</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Álbum completo!</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
            Você não tem figurinhas faltantes.
          </div>
        </div>
      )
    }

    return (
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 12px 24px' }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
          Passo 1 — Qual seleção você recebeu uma figurinha?
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {grupos.map(({ selecao, faltantes }) => (
            <button
              key={selecao.id}
              onClick={() => { setSelecaoSel(selecao); setEtapa('faltante') }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
                textAlign: 'left',
              }}
            >
              <FlagBadge sel={selecao} size={28} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{selecao.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {faltantes.length} figurinha{faltantes.length !== 1 ? 's' : ''} faltante{faltantes.length !== 1 ? 's' : ''}
                </div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--text-muted)' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ETAPA 2 — escolhe qual figurinha faltante você recebeu
  if (etapa === 'faltante') {
    const grupo = grupos.find(g => g.selecao.id === selecaoSel.id)

    return (
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Cabeçalho */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, zIndex: 10
        }}>
          <button onClick={() => setEtapa('selecao')}
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--text-muted)', padding: '0 4px 0 0' }}>
            ←
          </button>
          <FlagBadge sel={selecaoSel} size={26} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{selecaoSel.nome}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Passo 2 — Qual figurinha você recebeu?</div>
          </div>
        </div>

        <div style={{ padding: '10px 12px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {grupo.faltantes.map(({ key, posicao, num }) => (
            <button
              key={key}
              onClick={() => { setFaltanteSel({ key, posicao, num }); setEtapa('repetida') }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                background: 'var(--bg-card)', border: '1.5px solid var(--border)',
                borderRadius: 10, cursor: 'pointer', fontFamily: 'var(--font-body)',
                textAlign: 'left',
              }}
            >
              <div style={{
                width: 36, height: 54, borderRadius: 5, flexShrink: 0,
                background: '#f0ede8', border: '1.5px dashed var(--border)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
              }}>
                <FlagBadge sel={selecaoSel} size={16} />
                <span style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 2 }}>#{num}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{posicao}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Figurinha #{num} — faltante</div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--text-muted)' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ETAPA 3 — escolhe qual repetida foi dada na troca
  if (etapa === 'repetida') {
    return (
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Cabeçalho */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, zIndex: 10
        }}>
          <button onClick={() => setEtapa('faltante')}
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--text-muted)', padding: '0 4px 0 0' }}>
            ←
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Passo 3 — Qual repetida você deu?</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Recebendo: {selecaoSel.nome} #{faltanteSel.num} — {faltanteSel.posicao}
            </div>
          </div>
        </div>

        {repetidas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>😕</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Sem repetidas disponíveis</div>
            <div style={{ fontSize: 13 }}>Você não tem figurinhas repetidas para trocar no momento.</div>
          </div>
        ) : (
          <div style={{ padding: '10px 12px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {repetidas.map(({ key, selecao, posicao, num, qtdExtra }) => (
              <button
                key={key}
                onClick={() => {
                  onTroca(faltanteSel.key, key)
                  setEtapa('selecao')
                  setSelecaoSel(null)
                  setFaltanteSel(null)
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px',
                  background: 'var(--green-pale)', border: '1.5px solid var(--green)',
                  borderRadius: 10, cursor: 'pointer', fontFamily: 'var(--font-body)',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 36, height: 54, borderRadius: 5, flexShrink: 0,
                  background: 'linear-gradient(160deg,#f2fdf5,#c8f0d8)',
                  border: '1.5px solid var(--green)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2
                }}>
                  <FlagBadge sel={selecao} size={16} />
                  <span style={{ fontSize: 8, color: '#1a5c34' }}>#{num}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{selecao.nome} — {posicao}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Figurinha #{num}</div>
                </div>
                <span style={{
                  background: 'var(--green)', color: 'white',
                  borderRadius: 12, padding: '3px 10px',
                  fontSize: 12, fontWeight: 600, flexShrink: 0
                }}>
                  {qtdExtra}x extra
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
}
