import { ESPECIAIS, gerarChaveEspecial } from '../data/dados'

const CATEGORIAS = ['FWC', 'CC']

export function Especiais({ colecao, onClique, onLongPress, anotacoes }) {
  // Agrupa por categoria
  const porCategoria = CATEGORIAS.map(cat => ({
    categoria: cat,
    itens: ESPECIAIS.filter(e => e.categoria === cat)
  })).filter(g => g.itens.length > 0)

  const total = ESPECIAIS.length
  const coletadas = ESPECIAIS.filter(e => {
    const f = colecao[gerarChaveEspecial(e.id)]
    return f?.status === 'coletada' || f?.status === 'repetida'
  }).length

  return (
    <div style={{ padding: '12px 14px 100px' }}>
      {/* Header da seção */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
        borderRadius: 14, padding: '14px 16px', marginBottom: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#fff', letterSpacing: '0.05em' }}>
            FIGURINHAS ESPECIAIS
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>
            FWC 1-19 · CC 1-14 · Figurinhas Especiais
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold-light)' }}>
          {Math.round((coletadas / total) * 100)}%
        </div>
      </div>

      {/* Progresso */}
      <div style={{ marginBottom: 16, background: 'var(--bg-card)', borderRadius: 12, padding: '10px 14px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
          <span>{coletadas} de {total} coletadas</span>
          <span>{total - coletadas} faltam</span>
        </div>
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.round((coletadas/total)*100)}%`, background: 'var(--gold)', borderRadius: 3, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* Grid por categoria */}
      {porCategoria.map(({ categoria, itens }) => (
        <div key={categoria} style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 10, paddingLeft: 2
          }}>{categoria}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(82px, 1fr))', gap: 8 }}>
            {itens.map(esp => {
              const key = gerarChaveEspecial(esp.id)
              const fig = colecao[key] || { status: 'falta', qtd: 0 }
              const coletada = fig.status === 'coletada' || fig.status === 'repetida'
              const extras = fig.status === 'repetida' ? (fig.qtd || 2) - 1 : 0
              const temNota = !!(anotacoes?.[key])

              return (
                <div
                  key={esp.id}
                  onClick={() => onClique(key, fig)}
                  onContextMenu={e => { e.preventDefault(); onLongPress?.(key) }}
                  onTouchStart={(e) => {
                    const startY = e.touches[0].clientY
                    const startX = e.touches[0].clientX
                    let moved = false
                    const timer = setTimeout(() => { if (!moved) onLongPress?.(key) }, 500)
                    const onMove = (ev) => {
                      if (Math.abs(ev.touches[0].clientY - startY) > 8 ||
                          Math.abs(ev.touches[0].clientX - startX) > 8) {
                        moved = true; clearTimeout(timer)
                      }
                    }
                    const onEnd = () => {
                      clearTimeout(timer)
                      document.removeEventListener('touchmove', onMove)
                      document.removeEventListener('touchend', onEnd)
                    }
                    document.addEventListener('touchmove', onMove, { passive: true })
                    document.addEventListener('touchend', onEnd, { once: true })
                  }}
                  style={{
                    borderRadius: 10, border: `2px solid ${
                      fig.status === 'coletada' ? 'var(--gold)' :
                      fig.status === 'repetida' ? 'var(--green)' : 'var(--border)'
                    }`,
                    background: fig.status === 'coletada'
                      ? 'linear-gradient(160deg,#fffdf5,#fef3c7)'
                      : fig.status === 'repetida'
                        ? 'linear-gradient(160deg,#f0fdf4,#dcfce7)'
                        : 'var(--bg-card)',
                    padding: '10px 8px',
                    cursor: 'pointer', position: 'relative',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 6,
                    transition: 'transform 0.1s',
                    WebkitTapHighlightColor: 'transparent',
                    userSelect: 'none',
                  }}
                >
                  {/* Badge check ou qtd */}
                  {coletada && (
                    <div style={{
                      position: 'absolute', top: 4, right: 4,
                      width: 16, height: 16, borderRadius: '50%',
                      background: fig.status === 'repetida' ? 'var(--green)' : 'var(--gold)',
                      color: '#fff', fontSize: 9, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {fig.status === 'repetida' ? extras : '✓'}
                    </div>
                  )}

                  {/* Indicador de anotação */}
                  {temNota && (
                    <div style={{ position: 'absolute', bottom: 4, right: 4, width: 8, height: 8, borderRadius: '50%', background: '#60a5fa' }} />
                  )}

                  {/* Sigla do álbum em destaque */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
                    color: coletada
                      ? (fig.status === 'repetida' ? '#166534' : '#92640a')
                      : 'var(--text-muted)',
                    lineHeight: 1,
                  }}>
                    {esp.siglaAlbum}
                  </div>

                  {/* Bandeira (CC e FWC sedes) ou ícone (FWC demais) */}
                  {esp.pais
                    ? <span style={{ fontSize: 20, lineHeight: 1 }}>{esp.pais}</span>
                    : typeof esp.icon === 'string' && esp.icon.length <= 2 && esp.icon.codePointAt(0) > 127000
                      ? <span style={{ fontSize: 20, lineHeight: 1 }}>{esp.icon}</span>
                      : <span style={{ fontSize: 22, lineHeight: 1 }}>{esp.icon}</span>
                  }

                  {/* Nome curto — extrai parte após o traço */}
                  <div style={{
                    fontSize: 9, textAlign: 'center', lineHeight: 1.2,
                    color: coletada ? (fig.status === 'repetida' ? '#166634' : '#92640a') : 'var(--text-muted)',
                    fontWeight: coletada ? 600 : 400,
                    padding: '0 2px',
                  }}>
                    {(() => {
                      const parte = esp.nome.split('—')[1]?.trim() || esp.nome
                      // Se termina com ano (ex: "Brasil 2014"), destacar o ano
                      const matchAno = parte.match(/^(.+)\s(\d{4})$/)
                      if (matchAno) return <><span style={{display:'block'}}>{matchAno[1]}</span><span style={{fontWeight:700,color: coletada ? 'inherit' : 'var(--gold)'}}>{matchAno[2]}</span></>
                      return parte
                    })()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
