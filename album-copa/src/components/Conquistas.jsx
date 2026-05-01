import { verificarConquistas } from '../data/dados'

export function Conquistas({ colecao, historico }) {
  const conquistas = verificarConquistas(colecao, historico)
  const desbloqueadas = conquistas.filter(c => c.desbloqueada).length

  return (
    <div style={{ padding: '12px 14px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Conquistas
        </div>
        <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>
          {desbloqueadas}/{conquistas.length}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {conquistas.map(c => (
          <div key={c.id} style={{
            background: c.desbloqueada ? 'var(--gold-pale)' : 'var(--bg-card)',
            border: `1.5px solid ${c.desbloqueada ? 'var(--gold)' : 'var(--border)'}`,
            borderRadius: 12, padding: '12px',
            opacity: c.desbloqueada ? 1 : 0.5,
            transition: 'all 0.3s'
          }}>
            <div style={{ fontSize: 26, marginBottom: 6, lineHeight: 1 }}>{c.desbloqueada ? c.icon : '🔒'}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.desbloqueada ? '#92640a' : 'var(--text-muted)', marginBottom: 2 }}>
              {c.titulo}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
