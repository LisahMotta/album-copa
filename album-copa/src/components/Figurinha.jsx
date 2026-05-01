import { FlagBadge } from './FlagBadge'

const MAX_QTD = 5

export function Figurinha({ selecao, pos, figurinha, onClick, onLongPress, mostrarFlag = false, temAnotacao = false, eRara = false }) {
  const { status, qtd } = figurinha
  const extras = status === 'repetida' ? (qtd || 2) - 1 : 0
  const noMax  = status === 'repetida' && (qtd || 2) >= MAX_QTD
  const eEscudo = pos === 1

  let pressTimer = null
  function handleTouchStart() { pressTimer = setTimeout(() => onLongPress?.(), 500) }
  function handleTouchEnd()   { clearTimeout(pressTimer) }

  // Classe base
  let classCard = `fig-card`
  if (eRara && status === 'coletada') classCard += ' rara-coletada'
  else if (eRara && status === 'falta') classCard += ' rara-vazia'
  else if (eEscudo && status === 'falta') classCard += ' escudo-vazio'
  else if (status !== 'falta') classCard += ` ${status}`

  return (
    <div
      className={classCard}
      onClick={() => onClick?.()}
      onContextMenu={e => { e.preventDefault(); onLongPress?.() }}
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

      {/* Badge rara */}
      {eRara && <div className="badge-rara">✨</div>}

      {/* Indicador de anotação */}
      {temAnotacao && <div className="badge-nota" />}

      {/* Conteúdo central */}
      {eEscudo ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>🛡️</span>
          {mostrarFlag && <FlagBadge sel={selecao} size={12} />}
        </div>
      ) : (
        mostrarFlag && <FlagBadge sel={selecao} size={16} />
      )}

      <span style={{
        fontSize: 13, marginTop: 2, lineHeight: 1,
        color: eEscudo ? 'var(--gold)' : eRara ? '#7c3aed' : 'var(--text-muted)',
        fontWeight: (eEscudo || eRara) ? 700 : 600
      }}>
        {eEscudo ? 'ESC' : `#${pos}`}
      </span>
    </div>
  )
}
