import { SELECOES, POSICOES } from '../data/dados'
import { FlagBadge } from './FlagBadge'

export function ModalRemoverExtras({ fig, onConfirmar, onFechar }) {
  if (!fig) return null
  const { selId, pos, qtd } = fig
  const sel = SELECOES.find(s => s.id === selId)
  const posNome = POSICOES[pos - 1]
  const extras = (qtd || 2) - 1
  const opcoes = Array.from({ length: extras }, (_, i) => i + 1)

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        {/* Info da figurinha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            width: 48, height: 72, borderRadius: 8, flexShrink: 0,
            background: 'var(--green-pale)', border: '2px solid var(--green)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4
          }}>
            <FlagBadge sel={sel} size={20} />
            <span style={{ fontSize: 9, color: '#166534', fontWeight: 600 }}>#{pos}</span>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{sel.nome}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{posNome}</div>
            <div style={{
              display: 'inline-block', marginTop: 6,
              background: 'var(--green-pale)', color: '#166534',
              borderRadius: 12, padding: '3px 10px',
              fontSize: 12, fontWeight: 600
            }}>{extras} extra{extras !== 1 ? 's' : ''}</div>
          </div>
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Quantas extras remover?
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8, marginBottom: 14 }}>
          {opcoes.map(n => {
            const sobra = extras - n
            const zerou = sobra === 0
            return (
              <button key={n} onClick={() => onConfirmar(n)} style={{
                padding: '14px 8px', borderRadius: 12,
                border: `2px solid ${zerou ? 'var(--red)' : 'var(--border)'}`,
                background: zerou ? 'var(--red-pale)' : 'var(--bg)',
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                textAlign: 'center',
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: zerou ? 'var(--red)' : 'var(--text)' }}>{n}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                  {zerou ? 'zera extras' : `sobra ${sobra}`}
                </div>
              </button>
            )
          })}
        </div>

        <button className="btn ghost" onClick={onFechar}>Cancelar</button>
      </div>
    </div>
  )
}
