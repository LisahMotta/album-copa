import { useRef } from 'react'
import { FlagBadge } from './FlagBadge'

const MAX_QTD = 5
const MOVE_THRESHOLD = 8
const LONG_PRESS_MS  = 500

export function Figurinha({ selecao, pos, figurinha, onClick, onRemover, onLongPress, mostrarFlag = false, temAnotacao = false, eRara = false }) {
  const { status, qtd } = figurinha
  const extras  = status === 'repetida' ? (qtd || 2) - 1 : 0
  const noMax   = status === 'repetida' && (qtd || 2) >= MAX_QTD
  const eEscudo = pos === 1

  const startX       = useRef(0)
  const startY       = useRef(0)
  const longTimer    = useRef(null)
  const didLongPress = useRef(false)
  const didMove      = useRef(false)

  function onTouchStart(e) {
    const t = e.touches[0]
    startX.current = t.clientX
    startY.current = t.clientY
    didMove.current = false
    didLongPress.current = false
    longTimer.current = setTimeout(() => {
      if (!didMove.current) {
        didLongPress.current = true
        onLongPress?.()
      }
    }, LONG_PRESS_MS)
  }

  function onTouchMove(e) {
    const t = e.touches[0]
    const dx = Math.abs(t.clientX - startX.current)
    const dy = Math.abs(t.clientY - startY.current)
    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      didMove.current = true
      clearTimeout(longTimer.current)
    }
  }

  function onTouchEnd(e) {
    clearTimeout(longTimer.current)
    if (!didMove.current && !didLongPress.current) {
      e.preventDefault()
      onClick?.()
    }
  }

  function onTouchCancel() {
    clearTimeout(longTimer.current)
    didMove.current = true
  }

  let classCard = 'fig-card'
  if      (eRara   && status === 'coletada') classCard += ' rara-coletada'
  else if (eRara   && status === 'falta')    classCard += ' rara-vazia'
  else if (eEscudo && status === 'falta')    classCard += ' escudo-vazio'
  else if (status !== 'falta')               classCard += ` ${status}`

  return (
    <div
      className={classCard}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onContextMenu={e => { e.preventDefault(); onLongPress?.() }}
      onClick={() => onClick?.()}
      role="button"
      aria-label={`Figurinha ${pos}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Badge de extras */}
      {status === 'repetida' && (
        <div className="badge-qtd" style={{ background: noMax ? 'var(--red)' : 'var(--green)' }}>
          {extras}
        </div>
      )}

      {/* ✓ check — toque longo para remover */}
      {(status === 'coletada' || status === 'repetida') && (
        <div className="badge-check">✓</div>
      )}

      {/* Botão X para remover — aparece só em coletada/repetida */}
      {onRemover && status !== 'falta' && (
        <div
          className="badge-remover"
          onClick={e => { e.stopPropagation(); onRemover() }}
          onTouchEnd={e => { e.stopPropagation(); e.preventDefault(); onRemover() }}
          title="Remover"
        >✕</div>
      )}

      {eRara && <div className="badge-rara">✨</div>}
      {temAnotacao && <div className="badge-nota" />}

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
