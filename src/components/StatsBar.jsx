import { calcularStats } from '../data/dados'

export function StatsBar({ colecao }) {
  const { total, coletadas, repetidas, retidas, faltam } = calcularStats(colecao)

  const itens = [
    { label: 'coletadas', valor: coletadas, cor: 'var(--gold)', bg: 'var(--gold-pale)', textCor: '#633806' },
    { label: 'faltam',    valor: faltam,    cor: 'var(--border)', bg: 'var(--bg-card)', textCor: 'var(--text-muted)' },
    { label: 'repetidas', valor: repetidas, cor: 'var(--green)', bg: 'var(--green-pale)', textCor: '#1a5c34' },
    { label: 'retidas',   valor: retidas,   cor: 'var(--red)', bg: 'var(--red-pale)', textCor: '#a32d2d' },
    { label: 'total',     valor: total,     cor: 'var(--border)', bg: 'var(--bg-card)', textCor: 'var(--text-muted)' },
  ]

  return (
    <div style={{
      display: 'flex', gap: 6, padding: '10px 12px',
      overflowX: 'auto', background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      flexShrink: 0
    }}>
      {itens.map(({ label, valor, cor, bg, textCor }) => (
        <div key={label} style={{
          flexShrink: 0, padding: '5px 12px',
          borderRadius: 20, border: `1.5px solid ${cor}`,
          background: bg, whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: textCor }}>{valor}</span>
          <span style={{ fontSize: 11, color: textCor, opacity: 0.8, marginLeft: 4 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}
