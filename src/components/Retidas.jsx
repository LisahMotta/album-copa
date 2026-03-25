import { SELECOES, POSICOES, getRetidas } from '../data/dados'

export function Retidas({ colecao, onColar, onClickFig }) {
  const lista = getRetidas(colecao)

  if (lista.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
        <div style={{ fontSize: 48 }}>📌</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Nenhuma figurinha retida</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
          Figurinhas retidas ficam aqui esperando você colá-las no álbum. Marque como "retida" ao tocar numa figurinha.
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      <div style={{ padding: '10px 14px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
          {lista.length} aguardando ser colada{lista.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ padding: '0 12px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {lista.map(({ key, selecao, posicao, num }, idx) => (
          <div
            key={key}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0',
              borderBottom: idx < lista.length - 1 ? '1px solid var(--border)' : 'none',
              animation: 'fadeIn 0.2s ease both',
              animationDelay: `${idx * 0.03}s`
            }}
          >
            {/* Miniatura da figurinha */}
            <div
              onClick={() => onClickFig(selecao.id, num, { status: 'retida', qtd: 1 })}
              style={{
                width: 40, height: 60, borderRadius: 6, flexShrink: 0,
                border: '2px solid var(--red)', background: 'var(--red-pale)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 1,
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: 18 }}>{selecao.flag}</span>
              <span style={{ fontSize: 8, color: '#a32d2d', fontWeight: 500 }}>#{num}</span>
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{selecao.nome}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{posicao} • #{num}</div>
            </div>

            {/* Botão colar */}
            <button
              onClick={() => onColar(key)}
              style={{
                flexShrink: 0, padding: '6px 12px',
                borderRadius: 8, border: '1.5px solid var(--green)',
                background: 'none', color: 'var(--green)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'background 0.12s'
              }}
            >
              Colar ✓
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
