import { useRef, useState, useEffect } from 'react'
import { SELECOES, POSICOES, ESPECIAIS, gerarChaveEspecial } from '../data/dados'

export function Scanner({ colecao, onColetar, onColetarEspecial, onFechar }) {
  const [input, setInput]       = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro]         = useState('')
  const inputRef = useRef()

  useEffect(() => { inputRef.current?.focus() }, [])

  function parsearCodigo(codigo) {
    const limpo = codigo.toUpperCase().trim().replace(/\s+/g, ' ')

    // ── Figurinhas especiais: FWC 1, FWC-1, FWC1, CC 3, CC-3, CC3 ──
    const matchEsp = limpo.match(/^(FWC|CC)[\s-]?(\d{1,2})$/)
    if (matchEsp) {
      const [, tipo, numStr] = matchEsp
      const num = parseInt(numStr)
      const id = `${tipo.toLowerCase()}_${String(num).padStart(2,'0')}`
      const esp = ESPECIAIS.find(e => e.id === id)
      if (!esp) return { erro: `${tipo} ${num} não encontrada (máx: ${tipo === 'FWC' ? 19 : 14})` }
      const key = gerarChaveEspecial(esp.id)
      const fig = colecao[key] || { status: 'falta', qtd: 0 }
      return { tipo: 'especial', esp, key, fig }
    }

    // ── Figurinhas de seleção: BRA01, ARG-10, BRA 5 ──
    const matchSel = limpo.replace(/[\s-]/g,'').match(/^([A-Z]{2,4})(\d{1,2})$/)
    if (!matchSel) return { erro: 'Formato inválido. Ex: BRA01 · FWC5 · CC3' }

    const [, siglaInput, numStr] = matchSel
    const num = parseInt(numStr)
    if (num < 1 || num > POSICOES.length) return { erro: `Número inválido (1–${POSICOES.length})` }

    const sel = SELECOES.find(s =>
      s.sigla === siglaInput ||
      s.id.toUpperCase() === siglaInput ||
      s.nome.toUpperCase().replace(/\s/g,'').startsWith(siglaInput)
    )
    if (!sel) return { erro: `Seleção "${siglaInput}" não encontrada` }

    const key = `${sel.id}_${num}`
    const fig = colecao[key] || { status: 'falta', qtd: 0 }
    return { tipo: 'selecao', sel, num, posicao: POSICOES[num - 1], key, fig }
  }

  function buscar() {
    setErro('')
    setResultado(null)
    if (!input.trim()) return
    const r = parsearCodigo(input.trim())
    if (r.erro) { setErro(r.erro); return }
    setResultado(r)
  }

  function confirmar() {
    if (!resultado) return
    if (resultado.tipo === 'especial') {
      onColetarEspecial?.(resultado.key, resultado.fig)
    } else {
      onColetar(resultado.sel.id, resultado.num)
    }
    setResultado(null)
    setInput('')
    inputRef.current?.focus()
  }

  const statusLabel = {
    falta:    { txt: 'Faltando',             cor: 'var(--text-muted)', bg: 'var(--bg)' },
    coletada: { txt: 'Já coletada ✓',        cor: '#166534',           bg: 'var(--green-pale)' },
    repetida: { txt: `Repetida`,             cor: '#92640a',           bg: 'var(--gold-pale)' },
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>📷 Registrar figurinha</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
          Digite a sigla + número da figurinha:<br/>
          <strong>BRA01</strong> · <strong>ARG-10</strong> · <strong>FWC 5</strong> · <strong>CC 3</strong>
        </div>

        {/* Atalhos rápidos */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {['BRA','ARG','FRA','ESP','POR','FWC','CC'].map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              padding: '4px 10px', borderRadius: 8,
              border: `1px solid ${s === 'FWC' ? 'var(--gold)' : s === 'CC' ? '#e83a2a' : 'var(--border)'}`,
              background: s === 'FWC' ? 'var(--gold-pale)' : s === 'CC' ? '#fff0ee' : 'var(--bg)',
              fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
              color: s === 'FWC' ? '#92640a' : s === 'CC' ? '#a32010' : 'var(--text-muted)',
              fontWeight: (s === 'FWC' || s === 'CC') ? 700 : 400
            }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value.toUpperCase()); setErro(''); setResultado(null) }}
            onKeyDown={e => e.key === 'Enter' && buscar()}
            placeholder="Ex: BRA01 · FWC5 · CC3"
            style={{
              flex: 1, padding: '13px 14px', borderRadius: 10,
              border: `1.5px solid ${erro ? 'var(--red)' : 'var(--border)'}`,
              background: 'var(--bg)', color: 'var(--text)',
              fontFamily: 'var(--font-body)', fontSize: 18,
              fontWeight: 700, letterSpacing: '0.05em', outline: 'none',
            }}
          />
          <button onClick={buscar} style={{
            padding: '13px 18px', borderRadius: 10,
            background: 'var(--dark)', color: '#fff',
            border: 'none', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-body)'
          }}>Buscar</button>
        </div>

        {erro && (
          <div style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'var(--red-pale)', borderRadius: 8 }}>
            ⚠️ {erro}
          </div>
        )}

        {/* Resultado */}
        {resultado && (() => {
          const fig = resultado.fig
          const { txt, cor, bg } = statusLabel[fig.status] || statusLabel.falta
          const extras = fig.status === 'repetida' ? (fig.qtd || 2) - 1 : 0

          return (
            <div style={{ background: bg, border: `1.5px solid ${cor}`, borderRadius: 12, padding: '14px', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                {resultado.tipo === 'especial' ? (
                  <span style={{ fontSize: 28 }}>
                    {resultado.esp.pais || resultado.esp.icon}
                  </span>
                ) : (
                  <span style={{ fontSize: 28 }}>
                    {resultado.sel.flag || resultado.sel.sigla}
                  </span>
                )}
                <div style={{ flex: 1 }}>
                  {resultado.tipo === 'especial' ? (
                    <>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{resultado.esp.siglaAlbum}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {resultado.esp.nome.split('—')[1]?.trim() || resultado.esp.nome}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{resultado.sel.nome} — #{resultado.num}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{resultado.posicao}</div>
                    </>
                  )}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: cor }}>
                  {fig.status === 'repetida' ? `${extras}x extra` : txt}
                </div>
              </div>

              <button onClick={confirmar} style={{
                width: '100%', padding: '12px', borderRadius: 10,
                background: fig.status === 'falta' ? 'var(--gold)' : 'var(--green)',
                border: 'none', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)'
              }}>
                {fig.status === 'falta' ? '✓ Coletar esta figurinha' : '+ Marcar mais uma extra'}
              </button>
            </div>
          )
        })()}

        <button className="btn ghost" onClick={onFechar}>Fechar</button>
      </div>
    </div>
  )
}
