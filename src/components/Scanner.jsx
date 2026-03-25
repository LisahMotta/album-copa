import { useRef, useState, useEffect } from 'react'
import { SELECOES, POSICOES } from '../data/dados'

// Scanner simples: digita o código manualmente (câmera real requer lib externa)
// Formato: BRA-01, ARG-15, etc.
export function Scanner({ colecao, onColetar, onFechar }) {
  const [input, setInput] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')
  const inputRef = useRef()

  useEffect(() => { inputRef.current?.focus() }, [])

  function parsearCodigo(codigo) {
    // Aceita formatos: BRA01, BRA-01, BRA 01, bra01
    const limpo = codigo.toUpperCase().replace(/[\s-]/g, '')
    const match = limpo.match(/^([A-Z]+)(\d{1,2})$/)
    if (!match) return null
    const [, siglaInput, numStr] = match
    const num = parseInt(numStr)
    if (num < 1 || num > POSICOES.length) return null
    const sel = SELECOES.find(s =>
      s.sigla === siglaInput ||
      s.id.toUpperCase() === siglaInput ||
      s.nome.toUpperCase().startsWith(siglaInput)
    )
    if (!sel) return null
    return { sel, num, posicao: POSICOES[num - 1], key: `${sel.id}_${num}` }
  }

  function buscar() {
    setErro('')
    setResultado(null)
    const r = parsearCodigo(input.trim())
    if (!r) {
      setErro('Código não encontrado. Use o formato: BRA01 ou ARG-10')
      return
    }
    const fig = colecao[r.key] || { status: 'falta', qtd: 0 }
    setResultado({ ...r, fig })
  }

  function confirmar() {
    if (!resultado) return
    onColetar(resultado.sel.id, resultado.num)
    setResultado(null)
    setInput('')
    inputRef.current?.focus()
  }

  const statusLabel = {
    falta: { txt: 'Faltando', cor: 'var(--text-muted)', bg: 'var(--bg)' },
    coletada: { txt: 'Já coletada ✓', cor: '#166534', bg: 'var(--green-pale)' },
    repetida: { txt: `Repetida (${(resultado?.fig?.qtd||2)-1}x extra)`, cor: '#92640a', bg: 'var(--gold-pale)' },
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>📷 Registrar figurinha</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
          Digite o código da figurinha (sigla + número).<br />
          Ex: <strong>BRA01</strong> · <strong>ARG-10</strong> · <strong>ESP 15</strong>
        </div>

        {/* Exemplos rápidos de siglas */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {['BRA', 'ARG', 'FRA', 'ESP', 'POR', 'GER'].map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              padding: '4px 10px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--bg)',
              fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)'
            }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); setErro(''); setResultado(null) }}
            onKeyDown={e => e.key === 'Enter' && buscar()}
            placeholder="Ex: BRA01"
            style={{
              flex: 1, padding: '13px 14px', borderRadius: 10,
              border: `1.5px solid ${erro ? 'var(--red)' : 'var(--border)'}`,
              background: 'var(--bg)', color: 'var(--text)',
              fontFamily: 'var(--font-body)', fontSize: 18,
              fontWeight: 700, letterSpacing: '0.05em', outline: 'none',
              textTransform: 'uppercase'
            }}
          />
          <button onClick={buscar} style={{
            padding: '13px 18px', borderRadius: 10,
            background: 'var(--dark)', color: '#fff',
            border: 'none', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-body)'
          }}>Buscar</button>
        </div>

        {erro && <div style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>{erro}</div>}

        {/* Resultado */}
        {resultado && (() => {
          const { txt, cor, bg } = statusLabel[resultado.fig.status] || statusLabel.falta
          return (
            <div style={{ background: bg, border: `1.5px solid ${cor}`, borderRadius: 12, padding: '14px', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{resultado.sel.flag || resultado.sel.sigla}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{resultado.sel.nome} — #{resultado.num}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{resultado.posicao}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: cor }}>{txt}</div>
              </div>
              {resultado.fig.status === 'falta' && (
                <button onClick={confirmar} style={{
                  width: '100%', padding: '12px', borderRadius: 10,
                  background: 'var(--gold)', border: 'none', color: '#fff',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)'
                }}>✓ Coletar esta figurinha</button>
              )}
              {resultado.fig.status !== 'falta' && (
                <button onClick={confirmar} style={{
                  width: '100%', padding: '12px', borderRadius: 10,
                  background: 'var(--green)', border: 'none', color: '#fff',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)'
                }}>+ Marcar mais uma extra</button>
              )}
            </div>
          )
        })()}

        <button className="btn ghost" onClick={onFechar}>Fechar</button>
      </div>
    </div>
  )
}
