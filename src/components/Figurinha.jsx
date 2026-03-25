import { FlagBadge } from './FlagBadge'

const MAX_QTD = 5  // máximo total (1 no álbum + 4 extras)

export function Figurinha({ selecao, pos, figurinha, onClick, mostrarFlag = false }) {
  const { status, qtd } = figurinha
  const extras = status === 'repetida' ? (qtd || 2) - 1 : 0
  const noMax = status === 'repetida' && (qtd || 2) >= MAX_QTD

  return (
    <div
      className={`fig-card ${status !== 'falta' ? status : ''}`}
      onClick={onClick}
      role="button"
      aria-label={`Figurinha ${pos}`}
    >
      {/* Badge de extras — verde normal, vermelho no máximo */}
      {status === 'repetida' && (
        <div className="qtd-badge" style={{ background: noMax ? 'var(--red)' : 'var(--green)' }}>
          {extras}
        </div>
      )}

      {/* Check */}
      {(status === 'coletada' || status === 'repetida') && (
        <div className="badge">✓</div>
      )}

      {/* Flag ou sigla GB */}
      {mostrarFlag && (
        selecao.flag
          ? <span style={{ fontSize: 18, lineHeight: 1 }}>{selecao.flag}</span>
          : <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#012169', borderRadius: 3, padding: '1px 3px', lineHeight: 1.4 }}>
              {selecao.sigla}
            </span>
      )}

      <span style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>#{pos}</span>
    </div>
  )
}
