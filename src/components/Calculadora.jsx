import { useState } from 'react'
import { calcularPacotinhos, calcularStats, PRECO_PACOTINHO } from '../data/dados'

export function Calculadora({ colecao, pacotinhosAbertos, onAbrirPacotinho, onResetar }) {
  const [preco, setPreco] = useState(PRECO_PACOTINHO)
  const { faltam, coletadas, total, pct } = calcularStats(colecao)
  const { pacotinhos, custo, pacotinhosMinimo } = calcularPacotinhos(colecao)

  const gastoReal = pacotinhosAbertos * preco
  const valorColecao = coletadas * 0.50  // ~R$0,50 por figurinha coletada

  return (
    <div style={{ padding: '12px 14px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
        Calculadora
      </div>

      {/* Pacotinhos abertos */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px', marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Pacotinhos abertos</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, color: 'var(--gold)', lineHeight: 1 }}>
            {pacotinhosAbertos}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{(pacotinhosAbertos * 5).toLocaleString('pt-BR')} figurinhas abertas</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Gasto estimado: R$ {gastoReal.toFixed(2).replace('.', ',')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={onAbrirPacotinho} style={{
            flex: 2, padding: '12px', borderRadius: 10,
            background: 'var(--gold)', border: 'none',
            color: '#fff', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', fontFamily: 'var(--font-body)'
          }}>+ Abri um pacotinho</button>
          <button onClick={onResetar} style={{
            flex: 1, padding: '12px', borderRadius: 10,
            background: 'none', border: '1.5px solid var(--border)',
            color: 'var(--text-muted)', fontSize: 13,
            cursor: 'pointer', fontFamily: 'var(--font-body)'
          }}>Zerar</button>
        </div>
      </div>

      {/* Preço do pacotinho */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px', marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Preço do pacotinho (R$)</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[2.50, 3.00, 4.00, 5.00].map(p => (
            <button key={p} onClick={() => setPreco(p)} style={{
              flex: 1, padding: '8px 4px', borderRadius: 8,
              border: `1.5px solid ${preco === p ? 'var(--gold)' : 'var(--border)'}`,
              background: preco === p ? 'var(--gold-pale)' : 'var(--bg)',
              color: preco === p ? '#92640a' : 'var(--text-muted)',
              fontSize: 13, fontWeight: preco === p ? 700 : 400,
              cursor: 'pointer', fontFamily: 'var(--font-body)'
            }}>
              {p.toFixed(2).replace('.', ',')}
            </button>
          ))}
        </div>
      </div>

      {/* Estimativa para completar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px', marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Para completar o álbum</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'Faltam', valor: faltam, sub: 'figurinhas', cor: 'var(--text)' },
            { label: 'Mínimo', valor: pacotinhosMinimo, sub: 'pacotinhos', cor: 'var(--green)' },
            { label: 'Estimado*', valor: pacotinhos, sub: 'pacotinhos', cor: 'var(--gold)' },
            { label: 'Custo estimado', valor: `R$ ${(pacotinhos * preco).toFixed(0)}`, sub: 'aproximado', cor: 'var(--red)' },
          ].map(({ label, valor, sub, cor }) => (
            <div key={label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: cor, lineHeight: 1 }}>{valor}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5 }}>
          *Estimativa estatística considerando figurinhas repetidas. O mínimo é o ideal sem nenhuma repetição.
        </div>
      </div>

      {/* Valor da coleção */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)', borderRadius: 14, padding: '14px', marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Valor estimado da coleção</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--gold-light)', lineHeight: 1, marginBottom: 4 }}>
          R$ {valorColecao.toFixed(0)}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          {coletadas} figurinhas × R$ 0,50 médio por figurinha avulsa
        </div>
        <div style={{ marginTop: 10, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gold)', borderRadius: 2, transition: 'width 0.5s' }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--gold-light)', marginTop: 4 }}>{pct}% completo</div>
      </div>
    </div>
  )
}
