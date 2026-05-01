// Renderiza emoji de bandeira ou badge de sigla quando o emoji não existe
export function FlagBadge({ sel, size = 26 }) {
  if (sel.flag) {
    return <span style={{ fontSize: size, lineHeight: 1 }}>{sel.flag}</span>
  }
  // Fallback para GB e similares
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
