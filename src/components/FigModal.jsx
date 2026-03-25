import { SELECOES, POSICOES } from '../data/dados'

export function FigModal({ fig, onAcao, onFechar }) {
  if (!fig) return null

  const { selId, pos } = fig
  const sel = SELECOES.find(s => s.id === selId)
  const posNome = POSICOES[pos - 1]
  const status = fig.statusAtual

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        {/* Cabeçalho */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <div style={{
            width: 52, height: 78, borderRadius: 8, flexShrink: 0,
            background: status === 'coletada' ? 'linear-gradient(160deg,#fffbf0,#ffe9a0)'
              : status === 'repetida' ? 'linear-gradient(160deg,#f2fdf5,#c8f0d8)'
              : status === 'retida' ? 'linear-gradient(160deg,#fff5f5,#fde0e0)'
              : '#f0ede8',
            border: `2px solid ${status === 'coletada' ? 'var(--gold)' : status === 'repetida' ? 'var(--green)' : status === 'retida' ? 'var(--red)' : 'var(--border)'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2
          }}>
            <span style={{ fontSize: 22 }}>{sel.flag}</span>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 500 }}>#{pos}</span>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{sel.nome}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{posNome} • #{pos}</div>
            {status !== 'falta' && (
              <span style={{
                display: 'inline-block', marginTop: 6,
                fontSize: 11, padding: '2px 10px', borderRadius: 12,
                background: status === 'coletada' ? 'var(--gold-pale)'
                  : status === 'repetida' ? 'var(--green-pale)'
                  : 'var(--red-pale)',
                color: status === 'coletada' ? '#633806'
                  : status === 'repetida' ? '#1a5c34'
                  : '#a32d2d',
                fontWeight: 500
              }}>
                {status === 'coletada' ? '✓ No álbum' : status === 'repetida' ? `× ${fig.qtd} repetidas` : '📌 Retida'}
              </span>
            )}
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {status === 'falta' && <>
            <button className="btn primary" onClick={() => onAcao('coletar')}>✓ Coletar esta figurinha</button>
            <button className="btn danger" onClick={() => onAcao('reter')}>📌 Guardar como retida</button>
          </>}

          {status === 'coletada' && <>
            <button className="btn primary" onClick={() => onAcao('repetida')}>+ Tenho outra igual (repetida)</button>
            <button className="btn danger" onClick={() => onAcao('reter')}>📌 Mover para retidas</button>
            <button className="btn" onClick={() => onAcao('remover')}>Remover do álbum</button>
          </>}

          {status === 'repetida' && <>
            <button className="btn primary" onClick={() => onAcao('repetida')}>+ Tenho mais uma igual</button>
            <button className="btn" onClick={() => onAcao('remover')}>Remover</button>
          </>}

          {status === 'retida' && <>
            <button className="btn primary" onClick={() => onAcao('colar')}>✓ Colar no álbum agora</button>
            <button className="btn" onClick={() => onAcao('remover')}>Remover</button>
          </>}

          <button className="btn ghost" onClick={onFechar}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
