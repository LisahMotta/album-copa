// Roda com: node gerar-icones.mjs
// Gera icon-192.png e icon-512.png usando Canvas API do Node

import { createCanvas } from 'canvas'
import { writeFileSync, existsSync } from 'fs'

function desenharIcone(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')
  const s = size

  // Fundo arredondado escuro
  ctx.beginPath()
  ctx.roundRect(0, 0, s, s, s * 0.18)
  ctx.fillStyle = '#0a1628'
  ctx.fill()
  ctx.clip()

  // Faixa azul escuro topo
  ctx.fillStyle = '#1a3a6e'
  ctx.fillRect(0, 0, s, s * 0.38)

  // Faixa azul médio meio
  ctx.fillStyle = '#2d5a9e'
  ctx.fillRect(0, s * 0.35, s, s * 0.35)

  // Faixa azul claro baixo
  ctx.fillStyle = '#1a5ba8'
  ctx.fillRect(0, s * 0.65, s, s * 0.35)

  // Elipses coloridas nos 4 cantos
  function elipse(cx, cy, rx, ry, cor) {
    ctx.beginPath()
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
    ctx.fillStyle = cor
    ctx.fill()
  }

  elipse(s*0.14, s*0.24, s*0.11, s*0.15, '#2ea84e')   // verde topo esq
  elipse(s*0.86, s*0.76, s*0.11, s*0.15, '#e8501a')   // laranja baixo dir
  elipse(s*0.86, s*0.24, s*0.10, s*0.14, '#7b3fa8')   // roxo topo dir
  elipse(s*0.14, s*0.76, s*0.09, s*0.13, '#e8b820')   // amarelo baixo esq
  elipse(s*0.50, s*0.14, s*0.08, s*0.10, '#18a8c8')   // ciano topo centro

  // Faixa vermelha Panini no topo
  ctx.fillStyle = '#e8001a'
  ctx.fillRect(0, 0, s, s * 0.09)
  ctx.fillStyle = '#ffffff'
  ctx.font = `bold ${s * 0.045}px Arial`
  ctx.textAlign = 'center'
  ctx.fillText('PANINI', s/2, s * 0.065)

  // Taça dourada pequena acima do 26
  const tx = s/2, ty = s * 0.25, tw = s*0.18, th = s*0.16
  ctx.fillStyle = '#c8922a'
  ctx.beginPath()
  ctx.moveTo(tx - tw*0.4, ty - th*0.5)
  ctx.lineTo(tx - tw*0.3, ty + th*0.2)
  ctx.quadraticCurveTo(tx - tw*0.3, ty + th*0.5, tx, ty + th*0.5)
  ctx.quadraticCurveTo(tx + tw*0.3, ty + th*0.5, tx + tw*0.3, ty + th*0.2)
  ctx.lineTo(tx + tw*0.4, ty - th*0.5)
  ctx.closePath()
  ctx.fill()
  // base da taça
  ctx.fillRect(tx - tw*0.15, ty + th*0.5, tw*0.3, th*0.1)
  ctx.fillRect(tx - tw*0.22, ty + th*0.6, tw*0.44, th*0.08)

  // Número 26 grande
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = `900 ${s * 0.42}px Arial Black, Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('26', s/2, s * 0.66)

  // Faixa inferior escura
  ctx.fillStyle = 'rgba(5,5,5,0.88)'
  ctx.fillRect(0, s * 0.84, s, s * 0.16)

  // Texto inferior
  ctx.fillStyle = '#c8922a'
  ctx.font = `700 ${s * 0.038}px Arial`
  ctx.textBaseline = 'middle'
  ctx.fillText('WORLD CUP', s/2, s * 0.875)

  ctx.fillStyle = '#ffffff'
  ctx.font = `900 ${s * 0.052}px Arial Black, Arial`
  ctx.fillText('ÁLBUM COPA', s/2, s * 0.935)

  // Borda dourada
  ctx.beginPath()
  ctx.roundRect(s*0.02, s*0.02, s*0.96, s*0.96, s * 0.16)
  ctx.strokeStyle = '#c8922a'
  ctx.lineWidth = s * 0.025
  ctx.stroke()

  return canvas.toBuffer('image/png')
}

try {
  writeFileSync('public/icon-192.png', desenharIcone(192))
  writeFileSync('public/icon-512.png', desenharIcone(512))
  writeFileSync('public/apple-touch-icon.png', desenharIcone(192))
  console.log('Ícones gerados com sucesso!')
} catch(e) {
  console.error('Erro:', e.message)
  process.exit(1)
}
