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

// Figurinhas raras (brilhantes) — posições especiais
export const POSICOES_RARAS = new Set([1, 15, 18]) // Escudo, Camisa 10, Capitão

// Preço médio por pacotinho (5 figurinhas)
export const PRECO_PACOTINHO = 4.00
export const TOTAL_ALBUM = 640  // total oficial do álbum Panini

// Progresso por grupo
export function calcularProgressoPorGrupo(colecao) {
  const grupos = {}
  SELECOES.forEach(sel => {
    if (!grupos[sel.grupo]) grupos[sel.grupo] = { total: 0, coletadas: 0, selecoes: [] }
    const st = calcularStatsSelecao(colecao, sel.id)
    grupos[sel.grupo].total     += st.total
    grupos[sel.grupo].coletadas += st.coletadas
    grupos[sel.grupo].selecoes.push({ sel, st })
  })
  return Object.entries(grupos)
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([grupo, dados]) => ({
      grupo,
      ...dados,
      pct: Math.round((dados.coletadas / dados.total) * 100)
    }))
}

// Calcular pacotinhos e custo estimado
export function calcularPacotinhos(colecao) {
  const { faltam } = calcularStats(colecao)
  // Probabilidade de pegar figurinha nova (fórmula do colecionador)
  const total = TOTAL_ALBUM
  let esperados = 0
  for (let i = 0; i < faltam; i++) {
    esperados += total / (total - i)
  }
  const pacotinhos = Math.ceil(esperados / 5)
  const custo = pacotinhos * PRECO_PACOTINHO
  return { faltam, pacotinhos, custo, pacotinhosMinimo: Math.ceil(faltam / 5) }
}

// Conquistas disponíveis
export const CONQUISTAS = [
  { id: 'primeira',   icon: '⭐', titulo: 'Primeira figurinha!',     desc: 'Coletou sua primeira figurinha',          check: (c) => Object.values(c).some(f => f.status !== 'falta') },
  { id: 'dez',        icon: '🔟', titulo: 'Dez coletadas',           desc: '10 figurinhas no álbum',                  check: (c) => calcularStats(c).coletadas >= 10 },
  { id: 'cinquenta',  icon: '5️⃣0️⃣', titulo: 'Cinquenta figurinhas',  desc: '50 figurinhas coletadas',                 check: (c) => calcularStats(c).coletadas >= 50 },
  { id: 'cem',        icon: '💯', titulo: 'Cem figurinhas',          desc: '100 figurinhas no álbum',                 check: (c) => calcularStats(c).coletadas >= 100 },
  { id: 'duzentas',   icon: '🎖️', titulo: 'Meio caminho',            desc: '200 figurinhas coletadas',                check: (c) => calcularStats(c).coletadas >= 200 },
  { id: 'selecao1',   icon: '🏅', titulo: 'Seleção completa',        desc: 'Completou uma seleção inteira',           check: (c) => SELECOES.some(s => calcularStatsSelecao(c, s.id).pct === 100) },
  { id: 'tresselecoes',icon:'🥇', titulo: 'Três seleções',           desc: 'Completou 3 seleções',                    check: (c) => SELECOES.filter(s => calcularStatsSelecao(c, s.id).pct === 100).length >= 3 },
  { id: 'repetidor',  icon: '🔁', titulo: 'Colecionador de extras',  desc: 'Tem 10 figurinhas extras',                check: (c) => calcularStats(c).repetidas >= 10 },
  { id: 'trocador',   icon: '🤝', titulo: 'Primeira troca',          desc: 'Realizou sua primeira troca',             check: (_, h) => h.length >= 1 },
  { id: 'album80',    icon: '🏆', titulo: 'Quase lá!',               desc: '80% do álbum completo',                  check: (c) => calcularStats(c).pct >= 80 },
]

export function verificarConquistas(colecao, historico) {
  return CONQUISTAS.map(c => ({ ...c, desbloqueada: c.check(colecao, historico) }))
}
