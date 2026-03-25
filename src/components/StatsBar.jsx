import { calcularStats } from '../data/dados'

export function StatsBar({ colecao }) {
  const { total, coletadas, repetidas, faltam } = calcularStats(colecao)

  return (
    <div className="stats-bar">
      <div className="stat-pill gold">
        <span className="num">{coletadas}</span>
        <span className="lbl">coletadas</span>
      </div>
      <div className="stat-pill">
        <span className="num" style={{ color: 'var(--text)' }}>{faltam}</span>
        <span className="lbl">faltam</span>
      </div>
      <div className="stat-pill green">
        <span className="num">{repetidas}</span>
        <span className="lbl">extras</span>
      </div>
      <div className="stat-pill">
        <span className="num" style={{ color: 'var(--text-muted)' }}>{total}</span>
        <span className="lbl">total</span>
      </div>
    </div>
  )
}
