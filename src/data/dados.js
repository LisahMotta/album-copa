// Usamos texto "GB" como fallback para bandeiras que não renderizam bem em todos os sistemas
export const SELECOES = [
  { id: 'bra', nome: 'Brasil',        flag: '🇧🇷', sigla: 'BRA', grupo: 'A' },
  { id: 'arg', nome: 'Argentina',     flag: '🇦🇷', sigla: 'ARG', grupo: 'A' },
  { id: 'fra', nome: 'França',        flag: '🇫🇷', sigla: 'FRA', grupo: 'B' },
  { id: 'eng', nome: 'Inglaterra',    flag: null,   sigla: 'GB',  grupo: 'B' },
  { id: 'esp', nome: 'Espanha',       flag: '🇪🇸', sigla: 'ESP', grupo: 'C' },
  { id: 'ger', nome: 'Alemanha',      flag: '🇩🇪', sigla: 'GER', grupo: 'C' },
  { id: 'por', nome: 'Portugal',      flag: '🇵🇹', sigla: 'POR', grupo: 'D' },
  { id: 'ned', nome: 'Holanda',       flag: '🇳🇱', sigla: 'NED', grupo: 'D' },
  { id: 'ita', nome: 'Itália',        flag: '🇮🇹', sigla: 'ITA', grupo: 'E' },
  { id: 'uru', nome: 'Uruguai',       flag: '🇺🇾', sigla: 'URU', grupo: 'E' },
  { id: 'mex', nome: 'México',        flag: '🇲🇽', sigla: 'MEX', grupo: 'F' },
  { id: 'usa', nome: 'EUA',           flag: '🇺🇸', sigla: 'USA', grupo: 'F' },
  { id: 'jap', nome: 'Japão',         flag: '🇯🇵', sigla: 'JPN', grupo: 'G' },
  { id: 'mar', nome: 'Marrocos',      flag: '🇲🇦', sigla: 'MAR', grupo: 'G' },
  { id: 'sen', nome: 'Senegal',       flag: '🇸🇳', sigla: 'SEN', grupo: 'H' },
  { id: 'aus', nome: 'Austrália',     flag: '🇦🇺', sigla: 'AUS', grupo: 'H' },
  { id: 'cro', nome: 'Croácia',       flag: '🇭🇷', sigla: 'CRO', grupo: 'A' },
  { id: 'sui', nome: 'Suíça',         flag: '🇨🇭', sigla: 'SUI', grupo: 'C' },
  { id: 'cor', nome: 'Coreia do Sul', flag: '🇰🇷', sigla: 'KOR', grupo: 'D' },
  { id: 'cam', nome: 'Camarões',      flag: '🇨🇲', sigla: 'CMR', grupo: 'E' },
  { id: 'gan', nome: 'Gana',          flag: '🇬🇭', sigla: 'GHA', grupo: 'F' },
  { id: 'pol', nome: 'Polônia',       flag: '🇵🇱', sigla: 'POL', grupo: 'G' },
  { id: 'tun', nome: 'Tunísia',       flag: '🇹🇳', sigla: 'TUN', grupo: 'H' },
  { id: 'ecu', nome: 'Equador',       flag: '🇪🇨', sigla: 'ECU', grupo: 'A' },
  { id: 'qat', nome: 'Catar',         flag: '🇶🇦', sigla: 'QAT', grupo: 'A' },
  { id: 'ira', nome: 'Irã',           flag: '🇮🇷', sigla: 'IRN', grupo: 'B' },
  { id: 'wal', nome: 'País de Gales', flag: null,   sigla: 'GB',  grupo: 'B' },
  { id: 'cos', nome: 'Costa Rica',    flag: '🇨🇷', sigla: 'CRC', grupo: 'E' },
  { id: 'can', nome: 'Canadá',        flag: '🇨🇦', sigla: 'CAN', grupo: 'F' },
  { id: 'bel', nome: 'Bélgica',       flag: '🇧🇪', sigla: 'BEL', grupo: 'F' },
  { id: 'den', nome: 'Dinamarca',     flag: '🇩🇰', sigla: 'DEN', grupo: 'D' },
  { id: 'ser', nome: 'Sérvia',        flag: '🇷🇸', sigla: 'SRB', grupo: 'G' },
]

// Renderiza flag ou sigla como fallback
export function renderFlag(sel, size = 26) {
  if (sel.flag) return sel.flag
  // fallback: badge com a sigla
  return sel.sigla
}

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

export const TOTAL_POR_SELECAO = POSICOES.length

export function gerarChave(selId, pos) {
  return `${selId}_${pos}`
}

export function carregarColecao() {
  try {
    const raw = localStorage.getItem('album_copa_v2')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function salvarColecao(colecao) {
  try {
    localStorage.setItem('album_copa_v2', JSON.stringify(colecao))
  } catch (e) { console.warn('Erro ao salvar:', e) }
}

export function iniciarColecao() {
  const existente = carregarColecao()
  if (existente) return existente
  const col = {}
  SELECOES.forEach(sel => {
    POSICOES.forEach((_, i) => {
      col[gerarChave(sel.id, i + 1)] = { status: 'falta', qtd: 0 }
    })
  })
  return col
}

export function calcularStats(colecao) {
  const total = SELECOES.length * TOTAL_POR_SELECAO
  let coletadas = 0, repetidas = 0
  Object.values(colecao).forEach(f => {
    if (f.status === 'coletada') coletadas++
    if (f.status === 'repetida') {
      coletadas++
      repetidas += (f.qtd || 2) - 1
    }
  })
  return { total, coletadas, repetidas, faltam: total - coletadas, pct: Math.round((coletadas / total) * 100) }
}

export function calcularStatsSelecao(colecao, selId) {
  const total = TOTAL_POR_SELECAO
  let coletadas = 0, repetidas = 0
  POSICOES.forEach((_, i) => {
    const f = colecao[gerarChave(selId, i + 1)]
    if (f?.status === 'coletada') coletadas++
    if (f?.status === 'repetida') { coletadas++; repetidas += (f.qtd || 2) - 1 }
  })
  return { total, coletadas, repetidas, pct: Math.round((coletadas / total) * 100) }
}

// Faltantes agrupadas por seleção
export function getFaltantesPorSelecao(colecao) {
  return SELECOES.map(sel => {
    const faltantes = []
    POSICOES.forEach((pos, i) => {
      const key = gerarChave(sel.id, i + 1)
      const f = colecao[key]
      if (!f || f.status === 'falta') {
        faltantes.push({ key, posicao: pos, num: i + 1 })
      }
    })
    return { selecao: sel, faltantes }
  }).filter(g => g.faltantes.length > 0)
}

// Todas as repetidas disponíveis para troca
export function getRepetidas(colecao) {
  const lista = []
  SELECOES.forEach(sel => {
    POSICOES.forEach((pos, i) => {
      const key = gerarChave(sel.id, i + 1)
      const f = colecao[key]
      if (f?.status === 'repetida') {
        lista.push({ key, selecao: sel, posicao: pos, num: i + 1, qtdExtra: (f.qtd || 2) - 1 })
      }
    })
  })
  return lista
}
