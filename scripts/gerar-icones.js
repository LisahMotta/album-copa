#!/usr/bin/env node
// Gera icon-192.png e icon-512.png para o PWA
// Rode: node scripts/gerar-icones.js
// Requer: npm install canvas

const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

function gerarIcone(tamanho) {
  const canvas = createCanvas(tamanho, tamanho)
  const ctx = canvas.getContext('2d')

  // Fundo degradê escuro
  const grad = ctx.createLinearGradient(0, 0, tamanho, tamanho)
  grad.addColorStop(0, '#1a1a2e')
  grad.addColorStop(1, '#0f3460')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.roundRect(0, 0, tamanho, tamanho, tamanho * 0.2)
  ctx.fill()

  // Borda dourada
  ctx.strokeStyle = '#c8922a'
  ctx.lineWidth = tamanho * 0.04
  ctx.beginPath()
  ctx.roundRect(
    tamanho * 0.05, tamanho * 0.05,
    tamanho * 0.9, tamanho * 0.9,
    tamanho * 0.15
  )
  ctx.stroke()

  // Emoji bola de futebol
  ctx.font = `${tamanho * 0.5}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('⚽', tamanho / 2, tamanho / 2)

  return canvas.toBuffer('image/png')
}

const publicDir = path.join(__dirname, '..', 'public')
fs.mkdirSync(publicDir, { recursive: true })

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), gerarIcone(192))
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), gerarIcone(512))

console.log('✓ icon-192.png e icon-512.png gerados em /public')
