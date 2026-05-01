// Gera icon-192.png e icon-512.png sem dependências externas
// Usa apenas módulos nativos do Node.js
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

function uint32BE(n) {
  const b = Buffer.alloc(4)
  b.writeUInt32BE(n, 0)
  return b
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, 'ascii')
  const crc = crc32(Buffer.concat([typeBuffer, data]))
  return Buffer.concat([uint32BE(data.length), typeBuffer, data, uint32BE(crc)])
}

// CRC32 table
const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
    t[i] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xFFFFFFFF
  for (const b of buf) c = crcTable[(c ^ b) & 0xFF] ^ (c >>> 8)
  return (c ^ 0xFFFFFFFF) >>> 0
}

function gerarPNG(tamanho) {
  const W = tamanho, H = tamanho
  const s = tamanho

  // Cada pixel: RGBA
  const pixels = new Uint8Array(W * H * 4)

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= W || y < 0 || y >= H) return
    const i = (y * W + x) * 4
    pixels[i] = r; pixels[i+1] = g; pixels[i+2] = b; pixels[i+3] = a
  }

  function inRRect(x, y) {
    const margin = Math.floor(s * 0.02)
    const radius = Math.floor(s * 0.17)
    const x0 = margin, y0 = margin
    const x1 = W - margin, y1 = H - margin
    if (x < x0 || x >= x1 || y < y0 || y >= y1) return false
    // cantos arredondados
    const cx = [x0+radius, x1-radius, x0+radius, x1-radius]
    const cy = [y0+radius, y0+radius, y1-radius, y1-radius]
    for (let i = 0; i < 4; i++) {
      if (x < cx[i] === (i%2===0) && y < cy[i] === (i<2)) {
        const dx = x - cx[i], dy = y - cy[i]
        if (dx*dx + dy*dy > radius*radius) return false
      }
    }
    return true
  }

  function inEllipse(x, y, cx, cy, rx, ry) {
    const dx = (x - cx) / rx, dy = (y - cy) / ry
    return dx*dx + dy*dy <= 1
  }

  // Desenhar cada pixel
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!inRRect(x, y)) continue

      const px = x / W, py = y / H
      const bw = Math.floor(s * 0.016)
      const m  = Math.floor(s * 0.02)

      // Borda dourada
      const inBorder = (x < m+bw || x >= W-m-bw || y < m+bw || y >= H-m-bw) && inRRect(x,y)
      if (inBorder) { setPixel(x, y, 200, 146, 42); continue }

      // Faixa Panini vermelha
      if (py < 0.10) { setPixel(x, y, 232, 0, 26); continue }

      // Faixa inferior escura
      if (py > 0.83) { setPixel(x, y, 5, 5, 5); continue }

      // Elipses coloridas
      if (inEllipse(x,y, s*0.13, s*0.25, s*0.11, s*0.15)) { setPixel(x,y, 46,168,78); continue }
      if (inEllipse(x,y, s*0.87, s*0.75, s*0.11, s*0.15)) { setPixel(x,y, 232,80,26); continue }
      if (inEllipse(x,y, s*0.87, s*0.25, s*0.10, s*0.14)) { setPixel(x,y, 123,63,168); continue }
      if (inEllipse(x,y, s*0.13, s*0.75, s*0.09, s*0.13)) { setPixel(x,y, 232,184,32); continue }
      if (inEllipse(x,y, s*0.50, s*0.13, s*0.08, s*0.10)) { setPixel(x,y, 24,168,200); continue }

      // Fundo azul por faixa
      if (py < 0.38)      setPixel(x, y, 26, 58, 110)
      else if (py < 0.62) setPixel(x, y, 45, 90, 158)
      else                setPixel(x, y, 26, 91, 168)
    }
  }

  // Montar PNG
  const sig = Buffer.from([137,80,78,71,13,10,26,10])
  const ihdr = pngChunk('IHDR', Buffer.concat([
    uint32BE(W), uint32BE(H),
    Buffer.from([8, 2, 0, 0, 0]) // bit depth 8, color type RGB
  ]))

  // Scanlines (filter byte 0 + RGB)
  const raw = Buffer.alloc(H * (1 + W * 3))
  for (let y = 0; y < H; y++) {
    raw[y * (1 + W*3)] = 0 // filter None
    for (let x = 0; x < W; x++) {
      const src = (y * W + x) * 4
      const dst = y * (1 + W*3) + 1 + x*3
      raw[dst]   = pixels[src]
      raw[dst+1] = pixels[src+1]
      raw[dst+2] = pixels[src+2]
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 })
  const idat = pngChunk('IDAT', compressed)
  const iend = pngChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([sig, ihdr, idat, iend])
}

// Gerar os arquivos
const publicDir = path.join(__dirname, '..', 'public')
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })

const png192 = gerarPNG(192)
const png512 = gerarPNG(512)

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192)
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512)
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png192)

console.log(`icon-192.png: ${png192.length} bytes`)
console.log(`icon-512.png: ${png512.length} bytes`)
console.log('Ícones gerados com sucesso!')
