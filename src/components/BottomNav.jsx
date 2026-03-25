import { getRetidas, calcularStats } from '../data/dados'

const ABAS = [
  {
    id: 'painel',
    label: 'Painel',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  },
  {
    id: 'selecoes',
    label: 'Seleções',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a15 15 0 0 1 0 18M3 12h18M4.2 7.5h15.6M4.2 16.5h15.6" />
      </svg>
    )
  },
  {
    id: 'retidas',
    label: 'Retidas',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    )
  },
]

export function BottomNav({ aba, colecao, onChange }) {
  const retidas = getRetidas(colecao).length

  return (
    <nav className="bottom-nav">
      {ABAS.map(a => (
        <button
          key={a.id}
          className={`nav-btn ${aba === a.id ? 'active' : ''}`}
          onClick={() => onChange(a.id)}
        >
          {a.icon(aba === a.id)}
          <span>
            {a.id === 'retidas' && retidas > 0 ? `Retidas (${retidas})` : a.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
