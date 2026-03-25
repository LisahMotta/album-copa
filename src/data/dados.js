export const SELECOES = [
  { id: 'bra', nome: 'Brasil',      flag: '🇧🇷', grupo: 'A', cor: '#009c3b' },
  { id: 'arg', nome: 'Argentina',   flag: '🇦🇷', grupo: 'A', cor: '#74acdf' },
  { id: 'fra', nome: 'França',      flag: '🇫🇷', grupo: 'B', cor: '#002395' },
  { id: 'eng', nome: 'Inglaterra',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', grupo: 'B', cor: '#cf081f' },
  { id: 'esp', nome: 'Espanha',     flag: '🇪🇸', grupo: 'C', cor: '#c60b1e' },
  { id: 'ger', nome: 'Alemanha',    flag: '🇩🇪', grupo: 'C', cor: '#000000' },
  { id: 'por', nome: 'Portugal',    flag: '🇵🇹', grupo: 'D', cor: '#006600' },
  { id: 'ned', nome: 'Holanda',     flag: '🇳🇱', grupo: 'D', cor: '#ff6600' },
  { id: 'ita', nome: 'Itália',      flag: '🇮🇹', grupo: 'E', cor: '#0066cc' },
  { id: 'uru', nome: 'Uruguai',     flag: '🇺🇾', grupo: 'E', cor: '#5aaad6' },
  { id: 'mex', nome: 'México',      flag: '🇲🇽', grupo: 'F', cor: '#006847' },
  { id: 'usa', nome: 'EUA',         flag: '🇺🇸', grupo: 'F', cor: '#b22234' },
  { id: 'jap', nome: 'Japão',       flag: '🇯🇵', grupo: 'G', cor: '#bc002d' },
  { id: 'mar', nome: 'Marrocos',    flag: '🇲🇦', grupo: 'G', cor: '#c1272d' },
  { id: 'sen', nome: 'Senegal',     flag: '🇸🇳', grupo: 'H', cor: '#00853f' },
  { id: 'aus', nome: 'Austrália',   flag: '🇦🇺', grupo: 'H', cor: '#ffcd00' },
  { id: 'cro', nome: 'Croácia',     flag: '🇭🇷', grupo: 'A', cor: '#ff0000' },
  { id: 'mor', nome: 'Marrocos',    flag: '🇲🇦', grupo: 'B', cor: '#c1272d' },
  { id: 'sui', nome: 'Suíça',       flag: '🇨🇭', grupo: 'C', cor: '#ff0000' },
  { id: 'cor', nome: 'Coreia do Sul',flag:'🇰🇷', grupo: 'D', cor: '#003478' },
  { id: 'cam', nome: 'Camarões',    flag: '🇨🇲', grupo: 'E', cor: '#007a5e' },
  { id: 'gan', nome: 'Gana',        flag: '🇬🇭', grupo: 'F', cor: '#006b3f' },
  { id: 'pol', nome: 'Polônia',     flag: '🇵🇱', grupo: 'G', cor: '#dc143c' },
  { id: 'tun', nome: 'Tunísia',     flag: '🇹🇳', grupo: 'H', cor: '#e70013' },
  { id: 'ecu', nome: 'Equador',     flag: '🇪🇨', grupo: 'A', cor: '#ffdd00' },
  { id: 'qat', nome: 'Catar',       flag: '🇶🇦', grupo: 'A', cor: '#8d1b3d' },
  { id: 'ira', nome: 'Irã',         flag: '🇮🇷', grupo: 'B', cor: '#239f40' },
  { id: 'wal', nome: 'País de Gales',flag:'🏴󠁧󠁢󠁷󠁬󠁳󠁿', grupo: 'B', cor: '#cf081f' },
  { id: 'cos', nome: 'Costa Rica',  flag: '🇨🇷', grupo: 'E', cor: '#002b7f' },
  { id: 'can', nome: 'Canadá',      flag: '🇨🇦', grupo: 'F', cor: '#ff0000' },
  { id: 'bel', nome: 'Bélgica',     flag: '🇧🇪', grupo: 'F', cor: '#000000' },
  { id: 'den', nome: 'Dinamarca',   flag: '🇩🇰', grupo: 'D', cor: '#c60c30' },
]

export const POSICOES = [
  'Escudo',
  'Goleiro 1', 'Goleiro 2',
  'Zagueiro 1', 'Zagueiro 2', 'Zagueiro 3',
  'Lateral Dir.', 'Lateral Esq.',
  'Volante 1', 'Volante 2',
  'Meia 1', 'Meia 2',
  'Ponta Direita', 'Ponta Esquerda',
  'Camisa 10',
  'Atacante 1', 'Atacante 2',
  'Capitão',
  'Reserva 1', 'Reserva 2',
]

export const TOTAL_POR_SELECAO = POSICOES.length // 20

export function gerarChave(selId, pos) {
  return `${selId}_${pos}`
}

export function carregarColecao() {
  try {
    const raw = localStorage.getItem('album_copa_v2')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function salvarColecao(colecao) {
  try {
    localStorage.setItem('album_copa_v2', JSON.stringify(colecao))
  } catch (e) {
    console.warn('Erro ao salvar:', e)
  }
}

export function iniciarColecao() {
  const existente = carregarColecao()
  if (existente) return existente

  const col = {}
  SELECOES.forEach(sel => {
    POSICOES.forEach((_, i) => {
      const key = gerarChave(sel.id, i + 1)
      col[key] = { status: 'falta', qtd: 0 }
    })
  })
  return col
}

export function calcularStats(colecao) {
  const total = SELECOES.length * TOTAL_POR_SELECAO
  let coletadas = 0, repetidas = 0, retidas = 0

  Object.values(colecao).forEach(f => {
    if (f.status === 'coletada') coletadas++
    if (f.status === 'repetida') { coletadas++; repetidas++ }
    if (f.status === 'retida') retidas++
  })

  return {
    total,
    coletadas,
    repetidas,
    retidas,
    faltam: total - coletadas,
    pct: Math.round((coletadas / total) * 100)
  }
}

export function calcularStatsSelecao(colecao, selId) {
  const total = TOTAL_POR_SELECAO
  let coletadas = 0, repetidas = 0

  POSICOES.forEach((_, i) => {
    const key = gerarChave(selId, i + 1)
    const f = colecao[key]
    if (f?.status === 'coletada') coletadas++
    if (f?.status === 'repetida') { coletadas++; repetidas++ }
  })

  return { total, coletadas, repetidas, pct: Math.round((coletadas / total) * 100) }
}

export function getRetidas(colecao) {
  const lista = []
  SELECOES.forEach(sel => {
    POSICOES.forEach((pos, i) => {
      const key = gerarChave(sel.id, i + 1)
      const f = colecao[key]
      if (f?.status === 'retida') {
        lista.push({ key, selecao: sel, posicao: pos, num: i + 1 })
      }
    })
  })
  return lista
}
