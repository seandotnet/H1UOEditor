import type { CSSProperties } from 'react'
import type { OptionMeta } from '../lib/optionsMeta'
import './OptionField.css'

type Props = {
  meta: OptionMeta
  value: string
  onChange: (value: string) => void
  style?: CSSProperties
}

function formatNumber(value: string, step?: number) {
  const n = Number(value)
  if (Number.isNaN(n)) return value
  if (step !== undefined && step < 1) {
    const decimals = String(step).split('.')[1]?.length ?? 2
    return n.toFixed(Math.min(decimals, 6))
  }
  return String(n)
}

function intToHex(value: string) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return '#ffffff'
  return `#${Math.min(0xffffff, Math.floor(n)).toString(16).padStart(6, '0')}`
}

function hexToInt(hex: string) {
  const cleaned = hex.replace('#', '')
  const n = Number.parseInt(cleaned, 16)
  return Number.isFinite(n) ? String(n) : '0'
}

export function OptionField({ meta, value, onChange, style }: Props) {
  const control = meta.control

  return (
    <article className="field" style={style}>
      <div className="field__copy">
        <div className="field__title-row">
          <h3>{meta.label}</h3>
          <code>{meta.key}</code>
        </div>
        <p>{meta.description}</p>
        {meta.tip && <p className="field__tip">{meta.tip}</p>}
      </div>

      <div className="field__control">
        {control.kind === 'toggle' && (
          <button
            type="button"
            className={`field__toggle ${value === '1' ? 'is-on' : ''}`}
            onClick={() => onChange(value === '1' ? '0' : '1')}
            aria-pressed={value === '1'}
          >
            <span className="field__toggle-knob" />
            <span className="field__toggle-label">{value === '1' ? 'ON' : 'OFF'}</span>
          </button>
        )}

        {control.kind === 'select' && (
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            {!control.options.some((o) => o.value === value) && (
              <option value={value}>{value} (current)</option>
            )}
            {control.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}

        {control.kind === 'slider' && (
          <div className="field__slider">
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={Number(value) || control.min}
              onChange={(e) => onChange(formatNumber(e.target.value, control.step))}
            />
            <input
              className="field__number"
              type="number"
              min={control.min}
              max={control.max}
              step={control.step}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        )}

        {control.kind === 'number' && (
          <input
            className="field__number"
            type="number"
            min={control.min}
            max={control.max}
            step={control.step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        {control.kind === 'text' && (
          <input
            className="field__text"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        {control.kind === 'colorInt' && (
          <div className="field__color">
            <input
              type="color"
              value={intToHex(value)}
              onChange={(e) => onChange(hexToInt(e.target.value))}
            />
            <input
              className="field__number"
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        )}
      </div>
    </article>
  )
}
