import { useState } from 'react'
import { SELECOES, POSICOES } from '../data/dados'
import { FlagBadge } from './FlagBadge'

export function ModalAnotacao({ selId, pos, anotacaoAtual, onSalvar, onFechar }) {
  const [texto, setTexto] = useState(anotacaoAtual || '')
  const sel = SELECOES.find(s => s.id === selId)
  const posNome = POSICOES[pos - 1]

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <FlagBadge sel={sel} size={22} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{sel.nome} — #{pos}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{posNome}</div>
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Anotação</div>

        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Ex: Consegui com o João, boa condição..."
          rows={4}
          autoFocus
          style={{
            width: '100%', padding: '12px', borderRadius: 10,
            border: '1.5px solid var(--border)',
            background: 'var(--bg)', color: 'var(--text)',
            fontFamily: 'var(--font-body)', fontSize: 14,
            resize: 'none', outline: 'none', lineHeight: 1.6,
            marginBottom: 12
          }}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onFechar} style={{
            flex: 1, padding: '13px', borderRadius: 12,
            border: '1.5px solid var(--border)', background: 'none',
            color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
            fontSize: 14, cursor: 'pointer'
          }}>Cancelar</button>
          <button onClick={() => { onSalvar(texto); onFechar() }} style={{
            flex: 2, padding: '13px', borderRadius: 12,
            border: 'none', background: 'var(--gold)',
            color: '#fff', fontFamily: 'var(--font-body)',
            fontSize: 14, fontWeight: 600, cursor: 'pointer'
          }}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
