export function StatsBar({ stats }) {
  const { total, coletadas, repetidas, faltam } = stats

  const itens = [
    { label: 'coletadas', valor: coletadas, cor: 'var(--gold)',   bg: 'var(--gold-pale)',  textCor: '#633806' },
    { label: 'faltam',    valor: faltam,    cor: 'var(--border)', bg: 'var(--bg-card)',    textCor: 'var(--text-muted)' },
    { label: 'extras',    valor: repetidas, cor: 'var(--green)',  bg: 'var(--green-pale)', textCor: '#1a5c34' },
    { label: 'total',     valor: total,     cor: 'var(--border)', bg: 'var(--bg-card)',    textCor: 'var(--text-muted)' },
  ]

  return (
    <div className="stats-bar">
      {itens.map(({ label, valor, cor, bg, textCor }) => (
        <div key={label} className="stat-pill" style={{ border: `1.5px solid ${cor}`, background: bg }}>
          <span className="num" style={{ color: textCor }}>{valor}</span>
          <span className="lbl" style={{ color: textCor, opacity: 0.8 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}
