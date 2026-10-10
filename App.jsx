import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <section className="card">
      <span className="tag">COUNTER</span>
      <h2>Simple Counter</h2>
      <p>Increase, decrease, or reset the number.</p>

      <div className="counter-value">{count}</div>

      <div className="counter-actions">
        <button onClick={() => setCount(c => c - 1)}>- Decrease</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button className="primary" onClick={() => setCount(c => c + 1)}>+ Increase</button>
      </div>
    </section>
  )
}

function Calculator() {
  const [display, setDisplay] = useState('0')

  const press = (v) => {
    if (display === 'Error') return setDisplay(v)
    if (display === '0' && !['.', '+', '-', '×', '÷'].includes(v)) return setDisplay(v)
    setDisplay(prev => prev + v)
  }

  const calculate = () => {
    try {
      const exp = display.replaceAll('×', '*').replaceAll('÷', '/')
      if (!/^[0-9+\-*/.() ]+$/.test(exp)) throw new Error()
      const result = Function(`"use strict"; return (${exp})`)()
      if (!Number.isFinite(result)) throw new Error()
      setDisplay(String(Number(result.toFixed(10))))
    } catch {
      setDisplay('Error')
    }
  }

  const keys = ['C','⌫','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','=']

  return (
    <section className="card">
      <span className="tag">CALCULATOR</span>
      <h2>Simple Calculator</h2>
      <p>Basic arithmetic with a clean React interface.</p>

      <div className="display">{display}</div>

      <div className="calculator-grid">
        {keys.map((key) => (
          <button
            key={key}
            className={`${['÷','×','-','+'].includes(key) ? 'operator' : ''} ${key === '=' ? 'equals' : ''} ${key === '0' ? 'zero' : ''}`}
            onClick={() => {
              if (key === 'C') setDisplay('0')
              else if (key === '⌫') setDisplay(display.length > 1 && display !== 'Error' ? display.slice(0, -1) : '0')
              else if (key === '=') calculate()
              else if (key === '%') {
                const n = Number(display)
                setDisplay(Number.isFinite(n) ? String(n / 100) : 'Error')
              } else press(key)
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="page">
      <header>
        <span className="eyebrow">REACT MINI APP</span>
        <h1>Counter & Calculator</h1>
        <p>Two simple tools in one modern responsive app.</p>
      </header>

      <div className="grid">
        <Counter />
        <Calculator />
      </div>
    </main>
  )
}
