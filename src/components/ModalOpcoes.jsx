import { SELECOES, POSICOES } from '../data/dados'
import { FlagBadge } from './FlagBadge'

// Modal que abre no long press — oferece Anotar e Remover
export function ModalOpcoes({ selId, pos, fig, anotacaoAtual, onAnotar, onRemover, onFechar }) {
  if (!selId || !pos) return null

  const sel = SELECOES.find(s => s.id === selId)
  const posNome = POSICOES[pos - 1]
  const { status, qtd } = fig
  const extras = status === 'repetida' ? (qtd || 2) - 1 : 0

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        {/* Info da figurinha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 48, height: 72, borderRadius: 8, flexShrink: 0,
            background: status === 'coletada' ? 'var(--gold-pale)'
              : status === 'repetida' ? 'var(--green-pale)' : 'var(--bg)',
            border: `2px solid ${status === 'coletada' ? 'var(--gold)'
              : status === 'repetida' ? 'var(--green)' : 'var(--border)'}`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4
          }}>
            <FlagBadge sel={sel} size={20} />
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>#{pos}</span>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{sel.nome}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{posNome}</div>
            {status !== 'falta' && (
              <span style={{
                display: 'inline-block', marginTop: 6,
                fontSize: 11, padding: '2px 10px', borderRadius: 12,
                background: status === 'coletada' ? 'var(--gold-pale)' : 'var(--green-pale)',
                color: status === 'coletada' ? '#92640a' : '#166534',
                fontWeight: 600
              }}>
                {status === 'coletada' ? '✓ No álbum' : `${extras} extra${extras !== 1 ? 's' : ''}`}
              </span>
            )}
            {anotacaoAtual && (
              <div style={{ fontSize: 11, color: '#60a5fa', marginTop: 4 }}>
                📝 {anotacaoAtual.length > 30 ? anotacaoAtual.slice(0,30)+'…' : anotacaoAtual}
              </div>
            )}
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Anotar */}
          <button className="btn" onClick={onAnotar} style={{ textAlign: 'left' }}>
            📝 {anotacaoAtual ? 'Editar anotação' : 'Adicionar anotação'}
          </button>

          {/* Remover — só aparece se está coletada ou repetida */}
          {status !== 'falta' && (
            <button
              className="btn"
              onClick={onRemover}
              style={{
                textAlign: 'left',
                borderColor: 'var(--red)',
                color: 'var(--red)',
                background: 'var(--red-pale)'
              }}
            >
              {status === 'repetida'
                ? `✕ Remover extras (${extras}x)`
                : '✕ Desfazer — tirar do álbum'}
            </button>
          )}

          <button className="btn ghost" onClick={onFechar}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
