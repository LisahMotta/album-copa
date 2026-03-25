const ABAS = [
  {
    id: 'painel', label: 'Álbum',
    icon: (a) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a?2.5:2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>)
  },
  {
    id: 'selecoes', label: 'Seleções',
    icon: (a) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a?2.5:2} strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 0 1 0 18M3 12h18M4.2 7.5h15.6M4.2 16.5h15.6"/>
      </svg>)
  },
  {
    id: 'troca', label: 'Trocar',
    icon: (a) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a?2.5:2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16V4m0 0L3 8m4-4l4 4"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/>
      </svg>)
  },
  {
    id: 'config', label: 'Mais',
    icon: (a) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a?2.5:2} strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M4.22 4.22l2.12 2.12m11.32 11.32 2.12 2.12M2 12h3m14 0h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>)
  },
]

export function BottomNav({ aba, onChange }) {
  return (
    <nav className="bottom-nav">
      {ABAS.map(a => (
        <button
          key={a.id}
          className={`nav-btn ${aba === a.id ? 'active' : ''}`}
          onClick={() => onChange(a.id)}
          style={{ position: 'relative' }}
        >
          {a.icon(aba === a.id)}
          <span>{a.label}</span>
        </button>
      ))}
    </nav>
  )
}
