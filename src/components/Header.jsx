import { calcularStats } from '../data/dados'

export function Header({ colecao }) {
  const { total, coletadas, pct } = calcularStats(colecao)

  return (
    <header style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)',
      padding: '14px 16px 12px',
      borderBottom: '2px solid var(--gold)',
      flexShrink: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0
        }}>⚽</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22, color: 'white', letterSpacing: '0.04em', lineHeight: 1
          }}>ÁLBUM COPA DO MUNDO</div>
          <div style={{ fontSize: 11, color: 'var(--gold-light)', marginTop: 2 }}>
            {coletadas} de {total} figurinhas • {pct}% completo
          </div>
        </div>
      </div>

      {/* Barra de progresso geral */}
      <div className="progress">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </header>
  )
}
