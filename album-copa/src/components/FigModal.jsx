import { SELECOES, POSICOES } from '../data/dados'
import { FlagBadge } from './FlagBadge'

export function FigModal({ fig, onAcao, onFechar }) {
  if (!fig) return null
  const { selId, pos, statusAtual, qtd } = fig
  const sel = SELECOES.find(s => s.id === selId)
  const posNome = POSICOES[pos - 1]
  const repetidasExtras = statusAtual === 'repetida' ? (qtd || 2) - 1 : 0

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <div style={{
            width: 52, height: 78, borderRadius: 8, flexShrink: 0,
            background: statusAtual === 'coletada' ? 'linear-gradient(160deg,#fffbf0,#ffe9a0)'
              : statusAtual === 'repetida' ? 'linear-gradient(160deg,#f2fdf5,#c8f0d8)' : '#f0ede8',
            border: `2px solid ${statusAtual === 'coletada' ? 'var(--gold)' : statusAtual === 'repetida' ? 'var(--green)' : 'var(--border)'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4
          }}>
            <FlagBadge sel={sel} size={22} />
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 500 }}>#{pos}</span>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{sel.nome}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{posNome} • #{pos}</div>
            {statusAtual !== 'falta' && (
              <span style={{
                display: 'inline-block', marginTop: 6, fontSize: 11, padding: '2px 10px', borderRadius: 12,
                background: statusAtual === 'coletada' ? 'var(--gold-pale)' : 'var(--green-pale)',
                color: statusAtual === 'coletada' ? '#633806' : '#1a5c34', fontWeight: 500
              }}>
                {statusAtual === 'coletada' ? '✓ No álbum' : `${repetidasExtras} extra${repetidasExtras !== 1 ? 's' : ''}`}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {statusAtual === 'falta' && (
            <button className="btn primary" onClick={() => onAcao('coletar')}>✓ Coletar esta figurinha</button>
          )}
          {(statusAtual === 'coletada' || statusAtual === 'repetida') && (
            <button className="btn primary" onClick={() => onAcao('repetida')}>+ Tenho mais uma igual</button>
          )}
          {statusAtual !== 'falta' && (
            <button className="btn" style={{ color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => onAcao('remover')}>
              Remover do álbum
            </button>
          )}
          <button className="btn ghost" onClick={onFechar}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
