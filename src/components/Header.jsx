import { calcularStats } from '../data/dados'

export function Header({ colecao, onScanner }) {
  const { total, coletadas, pct } = calcularStats(colecao)

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%', background: 'var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0, boxShadow: '0 2px 8px rgba(200,146,42,0.4)'
        }}>⚽</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>
            ÁLBUM COPA
          </div>
          <div style={{ fontSize: 12, color: 'var(--gold-light)', marginTop: 3, fontWeight: 500 }}>
            {coletadas} de {total} figurinhas
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold-light)', letterSpacing: '0.02em', lineHeight: 1 }}>
          {pct}%
        </div>
        {/* Botão scanner */}
        <button onClick={onScanner} title="Registrar figurinha" style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, WebkitTapHighlightColor: 'transparent'
        }}>📷</button>
      </div>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </header>
  )
}
