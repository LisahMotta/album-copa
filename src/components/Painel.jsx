import { useState } from 'react'
import { SELECOES, POSICOES, calcularStats, gerarChave } from '../data/dados'
import { Figurinha } from './Figurinha'

const FILTROS = [
  { id: 'todas',     label: 'Todas' },
  { id: 'faltam',    label: 'Faltam' },
  { id: 'repetidas', label: 'Extras' },
]

export function Painel({ colecao, onClique, onLongPress, anotacoes }) {
  const [filtro, setFiltro] = useState('todas')
  const { faltam, repetidas: qtdExtras } = calcularStats(colecao)

  const labels = { todas: 'Todas', faltam: `Faltam (${faltam})`, repetidas: `Extras (${qtdExtras})` }

  const lista = []
  SELECOES.forEach(sel => {
    POSICOES.forEach((_, i) => {
      const pos = i + 1
      const key = gerarChave(sel.id, pos)
      const fig = colecao[key] || { status: 'falta', qtd: 0 }
      if (filtro === 'faltam'    && fig.status !== 'falta')    return
      if (filtro === 'repetidas' && fig.status !== 'repetida') return
      lista.push({ sel, pos, key, fig })
    })
  })

  return (
    <div className="scroll-area">
      <div className="filters">
        {FILTROS.map(f => (
          <button key={f.id} className={`chip ${filtro === f.id ? 'active' : ''}`} onClick={() => setFiltro(f.id)}>
            {labels[f.id]}
          </button>
        ))}
      </div>

      <p className="hint">Toque para coletar · segure para anotar</p>

      {lista.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🎉</div>
          <div className="title">Nenhuma figurinha aqui</div>
          <div className="sub">Você não tem figurinhas nessa categoria.</div>
        </div>
      ) : (
        <div className="fig-grid">
          {lista.map(({ sel, pos, key, fig }) => (
            <Figurinha
              key={key} selecao={sel} pos={pos} figurinha={fig} mostrarFlag
              temAnotacao={!!(anotacoes && anotacoes[key])}
              onClick={() => onClique(sel.id, pos)}
              onLongPress={() => onLongPress?.(sel.id, pos, key)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
