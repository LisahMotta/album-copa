import { useState, useCallback, useRef } from 'react'

let setToastGlobal = null

export function Toast() {
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)
  const timer = useRef(null)

  setToastGlobal = useCallback((text) => {
    setMsg(text)
    setVisible(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(false), 2000)
  }, [])

  return (
    <div className={`toast ${visible ? '' : 'hide'}`}>
      {msg}
    </div>
  )
}

export function showToast(msg) {
  setToastGlobal?.(msg)
}
