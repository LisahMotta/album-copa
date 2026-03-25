import { useState } from 'react'
import { SELECOES, POSICOES, calcularStats, gerarChave, POSICOES_RARAS } from '../data/dados'
import { Figurinha } from './Figurinha'
import { FlagBadge } from './FlagBadge'
import { ProgressoGrupos } from './ProgressoGrupos'
import { Conquistas } from './Conquistas'

const FILTROS = [
  { id: 'todas',     label: 'Todas' },
  { id: 'faltam',    label: 'Faltam' },
  { id: 'repetidas', label: 'Extras' },
  { id: 'raras',     label: '✨ Raras' },
]

export function Painel({ colecao, onClique, onLongPress, anotacoes, historico }) {
  const [filtro, setFiltro] = useState('todas')
  const [modoLista, setModoLista] = useState(false)
  const [secao, setSecao] = useState('album')   // 'album' | 'grupos' | 'conquistas'
  const { faltam, repetidas: qtdExtras } = calcularStats(colecao)

  const labels = {
    todas:     'Todas',
    faltam:    `Faltam (${faltam})`,
    repetidas: `Extras (${qtdExtras})`,
    raras:     '✨ Raras',
  }

  const selecoesOrdenadas = [...SELECOES].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

  const lista = []
  selecoesOrdenadas.forEach(sel => {
    POSICOES.forEach((posNome, i) => {
      const pos = i + 1
      const key = gerarChave(sel.id, pos)
      const fig = colecao[key] || { status: 'falta', qtd: 0 }
      const eRara = POSICOES_RARAS.has(pos)
      if (filtro === 'faltam'    && fig.status !== 'falta')    return
      if (filtro === 'repetidas' && fig.status !== 'repetida') return
      if (filtro === 'raras'     && !eRara)                    return
      lista.push({ sel, pos, posNome, key, fig, eRara })
    })
  })

  return (
    <div className="scroll-area">
      {/* Abas de seção */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        {[['album','Álbum'],['grupos','Grupos'],['conquistas','Conquistas']].map(([id,label]) => (
          <button key={id} onClick={() => setSecao(id)} style={{
            flex: 1, padding: '11px 4px', background: 'none', border: 'none',
            borderBottom: `2px solid ${secao === id ? 'var(--gold)' : 'transparent'}`,
            color: secao === id ? 'var(--gold)' : 'var(--text-muted)',
            fontSize: 13, fontWeight: secao === id ? 700 : 400,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'color 0.15s'
          }}>{label}</button>
        ))}
      </div>

      {secao === 'grupos' && <ProgressoGrupos colecao={colecao} />}
      {secao === 'conquistas' && <Conquistas colecao={colecao} historico={historico || []} />}

      {secao === 'album' && <>
        {/* Filtros + toggle modo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto' }}>
            {FILTROS.map(f => (
              <button key={f.id} className={`chip ${filtro === f.id ? 'active' : ''}`} onClick={() => setFiltro(f.id)}>
                {labels[f.id]}
              </button>
            ))}
          </div>
          {/* Toggle lista/grid */}
          <button onClick={() => setModoLista(v => !v)} title={modoLista ? 'Ver em grid' : 'Ver em lista'} style={{
            flexShrink: 0, width: 36, height: 36, borderRadius: 8,
            border: '1.5px solid var(--border)', background: 'var(--bg-card)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)'
          }}>
            {modoLista ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        <p className="hint">Toque para coletar · segure para anotar{filtro === 'raras' ? ' · ✨ figurinhas especiais' : ''}</p>

        {lista.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🎉</div>
            <div className="title">Nenhuma figurinha aqui</div>
            <div className="sub">Você não tem figurinhas nessa categoria.</div>
          </div>
        ) : modoLista ? (
          /* Modo lista */
          <div style={{ padding: '0 12px 100px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {lista.map(({ sel, pos, posNome, key, fig, eRara }) => {
              const extras = fig.status === 'repetida' ? (fig.qtd || 2) - 1 : 0
              return (
                <div key={key} onClick={() => onClique(sel.id, pos)}
                  onContextMenu={e => { e.preventDefault(); onLongPress?.(sel.id, pos, key) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 12px', borderRadius: 10,
                    background: fig.status === 'coletada' ? 'var(--gold-pale)'
                      : fig.status === 'repetida' ? 'var(--green-pale)'
                      : 'var(--bg-card)',
                    border: `1px solid ${fig.status === 'coletada' ? 'var(--gold)'
                      : fig.status === 'repetida' ? 'var(--green)'
                      : 'var(--border)'}`,
                    cursor: 'pointer',
                  }}>
                  <FlagBadge sel={sel} size={20} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                      {sel.nome}
                      {eRara && <span style={{ marginLeft: 4, fontSize: 11 }}>✨</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{posNome} · #{pos}</div>
                  </div>
                  {fig.status === 'coletada' && <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>✓</span>}
                  {fig.status === 'repetida' && <span style={{ fontSize: 12, background: 'var(--green)', color: '#fff', borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>{extras}x</span>}
                  {fig.status === 'falta' && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>falta</span>}
                  {anotacoes?.[key] && <span style={{ fontSize: 10, color: '#60a5fa' }}>●</span>}
                </div>
              )
            })}
          </div>
        ) : (
          /* Modo grid */
          <div className="fig-grid">
            {lista.map(({ sel, pos, key, fig, eRara }) => (
              <Figurinha
                key={key} selecao={sel} pos={pos} figurinha={fig}
                mostrarFlag eRara={eRara}
                temAnotacao={!!(anotacoes?.[key])}
                onClick={() => onClique(sel.id, pos)}
                onLongPress={() => onLongPress?.(sel.id, pos, key)}
              />
            ))}
          </div>
        )}
      </>}
    </div>
  )
}
