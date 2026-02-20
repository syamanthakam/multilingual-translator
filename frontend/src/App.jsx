import { useState, useEffect, useRef } from 'react'

const LANGS = [
  { code: 'auto', name: 'Auto-detect' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'zh', name: 'Chinese' },
]

export default function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [source, setSource] = useState('auto')
  const [target, setTarget] = useState('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const streamingTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (streamingTimer.current) clearInterval(streamingTimer.current)
    }
  }, [])

  function startStreaming(text) {
    if (streamingTimer.current) clearInterval(streamingTimer.current)
    setOutput('')

    let index = 0
    streamingTimer.current = setInterval(() => {
      index += 1
      setOutput(text.slice(0, index))
      if (index >= text.length && streamingTimer.current) {
        clearInterval(streamingTimer.current)
        streamingTimer.current = null
      }
    }, 20) // 50 chars/sec-ish
  }

  async function handleTranslate(e) {
    e.preventDefault()
    setError('')

    if (!input.trim()) {
      setError('Please enter some text to translate.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: input,
          source_lang: source,
          target_lang: target,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Translation failed')
      }

      // Animate character-by-character display of the translated text.
      startStreaming(data.translated)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Multilingual Translator</h1>
      <p>
        Real-time text translation between multiple languages with a
        character-by-character streaming display.
      </p>

      <form onSubmit={handleTranslate} style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
          <label>
            Source
            <select value={source} onChange={e => setSource(e.target.value)}>
              {LANGS.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </label>
          <label>
            Target
            <select value={target} onChange={e => setTarget(e.target.value)}>
              {LANGS.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </label>
        </div>

        <textarea
          rows={4}
          style={{ width: '100%', marginBottom: '0.5rem' }}
          placeholder="Type text to translate..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

      <h2 style={{ marginTop: '2rem' }}>Translation</h2>
      <div
        style={{
          minHeight: '4rem',
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: 4,
          background: '#fafafa',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          whiteSpace: 'pre-wrap',
        }}
      >
        {output || <span style={{ color: '#888' }}>Your translated text will appear here, streaming character by character.</span>}
      </div>
    </div>
  )
}
