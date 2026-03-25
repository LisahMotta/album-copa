import { useState } from 'react'
import { SELECOES, POSICOES, calcularStats } from '../data/dados'
import { Figurinha } from '../components/Figurinha'

const FILTROS = [
  { id: 'todas',    label: 'Todas' },
  { id: 'faltam',   label: 'Faltam' },
  { id: 'repetidas',label: 'Repetidas' },
]

export function Painel({ colecao, onClickFig }) {
  const [filtro, setFiltro] = useState('todas')
  const { faltam, repetidas } = calcularStats(colecao)

  const labels = { todas: 'Todas', faltam: `Faltam (${faltam})`, repetidas: `Repetidas (${repetidas})` }

  // Monta lista filtrada
  const lista = []
  SELECOES.forEach(sel => {
    POSICOES.forEach((_, i) => {
      const pos = i + 1
      const key = `${sel.id}_${pos}`
      const fig = colecao[key] || { status: 'falta', qtd: 0 }
      if (filtro === 'faltam' && fig.status !== 'falta') return
      if (filtro === 'repetidas' && fig.status !== 'repetida') return
      lista.push({ sel, pos, key, fig })
    })
  })

  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      {/* Filtros */}
      <div style={{ display: 'flex', gap: 6, padding: '10px 12px', overflowX: 'auto' }}>
        {FILTROS.map(f => (
          <button
            key={f.id}
            className={`chip ${filtro === f.id ? 'active' : ''}`}
            onClick={() => setFiltro(f.id)}
          >
            {labels[f.id]}
          </button>
        ))}
      </div>

      {/* Título */}
      <div style={{ padding: '0 12px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
          {lista.length} figurinha{lista.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
        gap: 5,
        padding: '0 10px 20px'
      }}>
        {lista.map(({ sel, pos, key, fig }) => (
          <Figurinha
            key={key}
            selecao={sel}
            pos={pos}
            figurinha={fig}
            mostrarFlag
            onClick={() => onClickFig(sel.id, pos, fig)}
          />
        ))}
      </div>

      {lista.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Nenhuma figurinha aqui</div>
          <div style={{ fontSize: 13 }}>Você não tem figurinhas nessa categoria</div>
        </div>
      )}
    </div>
  )
}
