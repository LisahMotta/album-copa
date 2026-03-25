import { calcularProgressoPorGrupo } from '../data/dados'
import { FlagBadge } from './FlagBadge'

export function ProgressoGrupos({ colecao }) {
  const grupos = calcularProgressoPorGrupo(colecao)

  return (
    <div style={{ padding: '12px 14px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
        Progresso por grupo
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {grupos.map(({ grupo, total, coletadas, pct, selecoes }) => (
          <div key={grupo} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6,
                background: 'var(--dark)', color: 'var(--gold-light)',
                fontFamily: 'var(--font-display)', fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {grupo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {selecoes.map(({ sel }) => (
                    <span key={sel.id} style={{ fontSize: 14 }}>
                      {sel.flag || <span style={{ fontSize: 9, background: '#012169', color: '#fff', borderRadius: 2, padding: '0 2px' }}>{sel.sigla}</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--gold)', flexShrink: 0 }}>
                {pct}%
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? 'var(--green)' : 'var(--gold)', borderRadius: 3, transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{coletadas}/{total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
