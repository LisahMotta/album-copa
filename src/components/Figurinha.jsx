export function Figurinha({ selecao, pos, figurinha, onClick, mostrarFlag = false }) {
  const { status, qtd } = figurinha

  return (
    <div
      className={`fig-card ${status !== 'falta' ? status : ''}`}
      onClick={onClick}
      role="button"
      aria-label={`Figurinha ${pos}`}
    >
      {status === 'repetida' && (
        <div className="qtd-badge">{qtd}</div>
      )}
      {(status === 'coletada' || status === 'repetida' || status === 'retida') && (
        <div className="badge">
          {status === 'retida' ? '!' : '✓'}
        </div>
      )}

      {mostrarFlag && (
        <span style={{ fontSize: 18, lineHeight: 1 }}>{selecao.flag}</span>
      )}

      <span style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>#{pos}</span>
    </div>
  )
}
