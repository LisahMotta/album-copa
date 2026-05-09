// Renderiza emoji de bandeira, badge de sigla, ou Cruz de São Jorge para Inglaterra
export function FlagBadge({ sel, size = 26 }) {
  // Inglaterra — Cruz de São Jorge (cruz vermelha em fundo branco)
  if (sel.flag === 'ENG' || sel.id === 'eng') {
    const s = size
    return (
      <svg
        width={s * 1.4}
        height={s}
        viewBox="0 0 28 20"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: 2, flexShrink: 0 }}
      >
        {/* Fundo branco */}
        <rect width="28" height="20" fill="#ffffff"/>
        {/* Cruz vermelha horizontal */}
        <rect x="0" y="7.5" width="28" height="5" fill="#cf091b"/>
        {/* Cruz vermelha vertical */}
        <rect x="11.5" y="0" width="5" height="20" fill="#cf091b"/>
      </svg>
    )
  }

  // Emoji de bandeira normal
  if (sel.flag && sel.flag !== null && sel.flag.length > 2) {
    return <span style={{ fontSize: size, lineHeight: 1 }}>{sel.flag}</span>
  }

  // Fallback: badge com sigla (GB, etc.)
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size * 1.4, height: size * 0.9,
      background: '#012169',
      borderRadius: 4,
      fontSize: size * 0.38,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '0.03em',
      fontFamily: 'var(--font-body)',
      flexShrink: 0,
      lineHeight: 1,
    }}>
      {sel.sigla}
    </span>
  )
}
