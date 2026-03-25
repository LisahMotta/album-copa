// Bandeiras: Inglaterra e País de Gales usam badge GB (emoji regional não renderiza bem)
export const SELECOES = [
  // ── Grupo A ──────────────────────────────────────────────
  { id: 'usa', nome: 'EUA',            flag: '🇺🇸', sigla: 'USA', grupo: 'A' },
  { id: 'can', nome: 'Canadá',         flag: '🇨🇦', sigla: 'CAN', grupo: 'A' },
  { id: 'mex', nome: 'México',         flag: '🇲🇽', sigla: 'MEX', grupo: 'A' },
  { id: 'bel', nome: 'Bélgica',        flag: '🇧🇪', sigla: 'BEL', grupo: 'A' },

  // ── Grupo B ──────────────────────────────────────────────
  { id: 'por', nome: 'Portugal',       flag: '🇵🇹', sigla: 'POR', grupo: 'B' },
  { id: 'arg', nome: 'Argentina',      flag: '🇦🇷', sigla: 'ARG', grupo: 'B' },
  { id: 'mar', nome: 'Marrocos',       flag: '🇲🇦', sigla: 'MAR', grupo: 'B' },
  { id: 'nga', nome: 'Nigéria',        flag: '🇳🇬', sigla: 'NGA', grupo: 'B' },

  // ── Grupo C ──────────────────────────────────────────────
  { id: 'ger', nome: 'Alemanha',       flag: '🇩🇪', sigla: 'GER', grupo: 'C' },
  { id: 'jap', nome: 'Japão',          flag: '🇯🇵', sigla: 'JPN', grupo: 'C' },
  { id: 'uru', nome: 'Uruguai',        flag: '🇺🇾', sigla: 'URU', grupo: 'C' },
  { id: 'cze', nome: 'Rep. Tcheca',    flag: '🇨🇿', sigla: 'CZE', grupo: 'C' },

  // ── Grupo D ──────────────────────────────────────────────
  { id: 'fra', nome: 'França',         flag: '🇫🇷', sigla: 'FRA', grupo: 'D' },
  { id: 'bra', nome: 'Brasil',         flag: '🇧🇷', sigla: 'BRA', grupo: 'D' },
  { id: 'col', nome: 'Colômbia',       flag: '🇨🇴', sigla: 'COL', grupo: 'D' },
  { id: 'ser', nome: 'Sérvia',         flag: '🇷🇸', sigla: 'SRB', grupo: 'D' },

  // ── Grupo E ──────────────────────────────────────────────
  { id: 'esp', nome: 'Espanha',        flag: '🇪🇸', sigla: 'ESP', grupo: 'E' },
  { id: 'ned', nome: 'Holanda',        flag: '🇳🇱', sigla: 'NED', grupo: 'E' },
  { id: 'ecu', nome: 'Equador',        flag: '🇪🇨', sigla: 'ECU', grupo: 'E' },
  { id: 'egy', nome: 'Egito',          flag: '🇪🇬', sigla: 'EGY', grupo: 'E' },

  // ── Grupo F ──────────────────────────────────────────────
  { id: 'eng', nome: 'Inglaterra',     flag: null,   sigla: 'GB',  grupo: 'F' },
  { id: 'por2',nome: 'Paraguai',       flag: '🇵🇾', sigla: 'PAR', grupo: 'F' },
  { id: 'irl', nome: 'Irlanda',        flag: '🇮🇪', sigla: 'IRL', grupo: 'F' },
  { id: 'sau', nome: 'Arábia Saudita', flag: '🇸🇦', sigla: 'KSA', grupo: 'F' },

  // ── Grupo G ──────────────────────────────────────────────
  { id: 'ita', nome: 'Itália',         flag: '🇮🇹', sigla: 'ITA', grupo: 'G' },
  { id: 'cro', nome: 'Croácia',        flag: '🇭🇷', sigla: 'CRO', grupo: 'G' },
  { id: 'sco', nome: 'Escócia',        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', sigla: 'SCO', grupo: 'G' },
  { id: 'ale', nome: 'Argélia',        flag: '🇩🇿', sigla: 'ALG', grupo: 'G' },

  // ── Grupo H ──────────────────────────────────────────────
  { id: 'por3',nome: 'Portugal B',     flag: '🇵🇹', sigla: 'POR', grupo: 'H' },
  { id: 'sui', nome: 'Suíça',          flag: '🇨🇭', sigla: 'SUI', grupo: 'H' },
  { id: 'pol', nome: 'Polônia',        flag: '🇵🇱', sigla: 'POL', grupo: 'H' },
  { id: 'civ', nome: 'Costa do Marfim',flag: '🇨🇮', sigla: 'CIV', grupo: 'H' },

  // ── Grupo I ──────────────────────────────────────────────
  { id: 'aus', nome: 'Austrália',      flag: '🇦🇺', sigla: 'AUS', grupo: 'I' },
  { id: 'den', nome: 'Dinamarca',      flag: '🇩🇰', sigla: 'DEN', grupo: 'I' },
  { id: 'irn', nome: 'Irã',            flag: '🇮🇷', sigla: 'IRN', grupo: 'I' },
  { id: 'chl', nome: 'Chile',          flag: '🇨🇱', sigla: 'CHI', grupo: 'I' },

  // ── Grupo J ──────────────────────────────────────────────
  { id: 'kor', nome: 'Coreia do Sul',  flag: '🇰🇷', sigla: 'KOR', grupo: 'J' },
  { id: 'gha', nome: 'Gana',           flag: '🇬🇭', sigla: 'GHA', grupo: 'J' },
  { id: 'wal', nome: 'País de Gales',  flag: null,   sigla: 'GB',  grupo: 'J' },
  { id: 'rou', nome: 'Romênia',        flag: '🇷🇴', sigla: 'ROU', grupo: 'J' },

  // ── Grupo K ──────────────────────────────────────────────
  { id: 'sen', nome: 'Senegal',        flag: '🇸🇳', sigla: 'SEN', grupo: 'K' },
  { id: 'tun', nome: 'Tunísia',        flag: '🇹🇳', sigla: 'TUN', grupo: 'K' },
  { id: 'cam', nome: 'Camarões',       flag: '🇨🇲', sigla: 'CMR', grupo: 'K' },
  { id: 'per', nome: 'Peru',           flag: '🇵🇪', sigla: 'PER', grupo: 'K' },

  // ── Grupo L ──────────────────────────────────────────────
  { id: 'ven', nome: 'Venezuela',      flag: '🇻🇪', sigla: 'VEN', grupo: 'L' },
  { id: 'hun', nome: 'Hungria',        flag: '🇭🇺', sigla: 'HUN', grupo: 'L' },
  { id: 'qat', nome: 'Catar',          flag: '🇶🇦', sigla: 'QAT', grupo: 'L' },
  { id: 'nzl', nome: 'Nova Zelândia',  flag: '🇳🇿', sigla: 'NZL', grupo: 'L' },
]

// Renderiza flag ou sigla como fallback
export function renderFlag(sel, size = 26) {
  if (sel.flag) return sel.flag
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

export const TOTAL_POR_SELECAO = POSICOES.length  // 20

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
export const PRECO_PACOTINHO = 7.00
export const TOTAL_ALBUM = SELECOES.length * TOTAL_POR_SELECAO  // 960

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
  { id: 'primeira',    icon: '⭐', titulo: 'Primeira figurinha!',    desc: 'Coletou sua primeira figurinha',         check: (c) => Object.values(c).some(f => f.status !== 'falta') },
  { id: 'dez',         icon: '🔟', titulo: 'Dez coletadas',          desc: '10 figurinhas no álbum',                 check: (c) => calcularStats(c).coletadas >= 10 },
  { id: 'cinquenta',   icon: '5️⃣0️⃣', titulo: 'Cinquenta figurinhas', desc: '50 figurinhas coletadas',                check: (c) => calcularStats(c).coletadas >= 50 },
  { id: 'cem',         icon: '💯', titulo: 'Cem figurinhas',         desc: '100 figurinhas no álbum',                check: (c) => calcularStats(c).coletadas >= 100 },
  { id: 'trezentas',   icon: '🎖️', titulo: 'Meio caminho',           desc: '300 figurinhas coletadas',               check: (c) => calcularStats(c).coletadas >= 300 },
  { id: 'selecao1',    icon: '🏅', titulo: 'Seleção completa',       desc: 'Completou uma seleção inteira',          check: (c) => SELECOES.some(s => calcularStatsSelecao(c, s.id).pct === 100) },
  { id: 'tresselecoes',icon: '🥇', titulo: 'Três seleções',          desc: 'Completou 3 seleções',                   check: (c) => SELECOES.filter(s => calcularStatsSelecao(c, s.id).pct === 100).length >= 3 },
  { id: 'repetidor',   icon: '🔁', titulo: 'Colecionador de extras', desc: 'Tem 10 figurinhas extras',               check: (c) => calcularStats(c).repetidas >= 10 },
  { id: 'trocador',    icon: '🤝', titulo: 'Primeira troca',         desc: 'Realizou sua primeira troca',            check: (_, h) => h.length >= 1 },
  { id: 'album80',     icon: '🏆', titulo: 'Quase lá!',              desc: '80% do álbum completo',                  check: (c) => calcularStats(c).pct >= 80 },
]

export function verificarConquistas(colecao, historico) {
  return CONQUISTAS.map(c => ({ ...c, desbloqueada: c.check(colecao, historico) }))
}

// ── Figurinhas Especiais (estádios, troféu, bolas, etc.) ─────────────────
// 48 seleções × 20 fig = 960 + 20 especiais = 980 total
export const ESPECIAIS = [
  // Troféus e símbolos
  { id: 'esp_01', nome: 'Taça FIFA World Cup',       icon: '🏆', categoria: 'Troféu' },
  { id: 'esp_02', nome: 'Troféu — Verso',            icon: '🏆', categoria: 'Troféu' },

  // Bolas oficiais
  { id: 'esp_03', nome: 'Bola Oficial 2026',         icon: '⚽', categoria: 'Bola' },
  { id: 'esp_04', nome: 'Bola — Detalhe',            icon: '⚽', categoria: 'Bola' },
  { id: 'esp_05', nome: 'Bola do 1º Jogo',           icon: '⚽', categoria: 'Bola' },

  // Estádios — USA
  { id: 'esp_06', nome: 'MetLife Stadium',           icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_07', nome: 'SoFi Stadium',              icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_08', nome: 'AT&T Stadium',              icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_09', nome: 'Levi\'s Stadium',           icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_10', nome: 'Arrowhead Stadium',         icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_11', nome: 'Lincoln Financial Field',   icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_12', nome: 'Hard Rock Stadium',         icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_13', nome: 'Gillette Stadium',          icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_14', nome: 'Seattle Stadium',           icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_15', nome: 'NRG Stadium',               icon: '🏟️', categoria: 'Estádio' },

  // Estádios — Canadá e México
  { id: 'esp_16', nome: 'BC Place — Vancouver',      icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_17', nome: 'BMO Field — Toronto',       icon: '🏟️', categoria: 'Estádio' },
  { id: 'esp_18', nome: 'Estádio Azteca — Cidade do México', icon: '🏟️', categoria: 'Estádio' },

  // Mascote e capa
  { id: 'esp_19', nome: 'Mascote Oficial',           icon: '🦅', categoria: 'Especial' },
  { id: 'esp_20', nome: 'Capa do Álbum',             icon: '📔', categoria: 'Especial' },
]

export const TOTAL_ESPECIAIS = ESPECIAIS.length  // 20
export const TOTAL_GERAL = SELECOES.length * TOTAL_POR_SELECAO + TOTAL_ESPECIAIS  // 980

// Chave para figurinha especial
export function gerarChaveEspecial(id) {
  return `especial_${id}`
}

// Stats incluindo especiais
export function calcularStatsCompleto(colecao) {
  const base = calcularStats(colecao)
  let coletadasEsp = 0, repetidasEsp = 0
  ESPECIAIS.forEach(esp => {
    const f = colecao[gerarChaveEspecial(esp.id)]
    if (f?.status === 'coletada') coletadasEsp++
    if (f?.status === 'repetida') { coletadasEsp++; repetidasEsp += (f.qtd || 2) - 1 }
  })
  const totalColetadas = base.coletadas + coletadasEsp
  const totalRepetidas = base.repetidas + repetidasEsp
  const faltam = TOTAL_GERAL - totalColetadas
  return {
    total: TOTAL_GERAL,
    coletadas: totalColetadas,
    repetidas: totalRepetidas,
    faltam,
    pct: Math.round((totalColetadas / TOTAL_GERAL) * 100)
  }
}

// Iniciar coleção incluindo especiais
export function iniciarColecaoCompleta() {
  try {
    const raw = localStorage.getItem('album_copa_v2')
    if (raw) {
      const existente = JSON.parse(raw)
      // Adicionar especiais que ainda não existem
      let atualizado = false
      ESPECIAIS.forEach(esp => {
        const key = gerarChaveEspecial(esp.id)
        if (!existente[key]) { existente[key] = { status: 'falta', qtd: 0 }; atualizado = true }
      })
      if (atualizado) salvarColecao(existente)
      return existente
    }
  } catch {}

  // Coleção nova do zero
  const col = {}
  SELECOES.forEach(sel => {
    POSICOES.forEach((_, i) => {
      col[gerarChave(sel.id, i + 1)] = { status: 'falta', qtd: 0 }
    })
  })
  ESPECIAIS.forEach(esp => {
    col[gerarChaveEspecial(esp.id)] = { status: 'falta', qtd: 0 }
  })
  return col
}
