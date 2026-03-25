import { FlagBadge } from './FlagBadge'

const MAX_QTD = 5

export function Figurinha({ selecao, pos, figurinha, onClick, onLongPress, mostrarFlag = false, temAnotacao = false }) {
  const { status, qtd } = figurinha
  const extras = status === 'repetida' ? (qtd || 2) - 1 : 0
  const noMax = status === 'repetida' && (qtd || 2) >= MAX_QTD

  function handleClick(e) {
    onClick?.()
  }

  function handleContextMenu(e) {
    e.preventDefault()
    onLongPress?.()
  }

  // Long press para mobile
  let pressTimer = null
  function handleTouchStart() {
    pressTimer = setTimeout(() => { onLongPress?.() }, 500)
  }
  function handleTouchEnd() {
    clearTimeout(pressTimer)
  }

  return (
    <div
      className={`fig-card ${status !== 'falta' ? status : ''}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      role="button"
      aria-label={`Figurinha ${pos}`}
    >
      {/* Badge extras */}
      {status === 'repetida' && (
        <div className="badge-qtd" style={{ background: noMax ? 'var(--red)' : 'var(--green)' }}>
          {extras}
        </div>
      )}

      {/* Check */}
      {(status === 'coletada' || status === 'repetida') && (
        <div className="badge-check">✓</div>
      )}

      {/* Indicador de anotação */}
      {temAnotacao && <div className="badge-nota" />}

      {/* Flag ou sigla */}
      {mostrarFlag && <FlagBadge sel={selecao} size={18} />}

      <span style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>#{pos}</span>
    </div>
  )
}
