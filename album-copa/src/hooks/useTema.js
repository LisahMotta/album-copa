import { useState, useEffect } from 'react'

export function useTema() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('album_tema')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('album_tema', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return { darkMode, toggleTema: () => setDarkMode(v => !v) }
}
