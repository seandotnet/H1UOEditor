import type { CategoryMeta, OptionMeta } from '../lib/optionsMeta'
import { OptionField } from './OptionField'
import './EditorShell.css'

type Props = {
  clientName: string
  filePath: string
  categories: CategoryMeta[]
  activeCategory: string
  onCategoryChange: (id: string) => void
  dirty: boolean
  readOnly: boolean
  loading: boolean
  status: string | null
  error: string | null
  knownOptions: OptionMeta[]
  unknownKeys: string[]
  sectionValues: Record<string, string>
  sectionTitle: string
  sectionDescription: string
  sectionName: string
  onChange: (section: string, key: string, value: string) => void
  onSave: () => void
  onReload: () => void
  onBackup: () => void
  onToggleReadOnly: (next: boolean) => void
  onClose: () => void
  onShowFolder: () => void
}

export function EditorShell(props: Props) {
  const {
    clientName,
    filePath,
    categories,
    activeCategory,
    onCategoryChange,
    dirty,
    readOnly,
    loading,
    status,
    error,
    knownOptions,
    unknownKeys,
    sectionValues,
    sectionTitle,
    sectionDescription,
    sectionName,
    onChange,
    onSave,
    onReload,
    onBackup,
    onToggleReadOnly,
    onClose,
    onShowFolder,
  } = props

  return (
    <div className="shell">
      <aside className="shell__aside">
        <div className="shell__brand">
          <span className="shell__brand-mark">H1UO</span>
          <span className="shell__brand-sub">EDITOR</span>
        </div>

        <nav className="shell__nav">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`shell__nav-item ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <span>{cat.title}</span>
              <span className="shell__nav-section">[{cat.section}]</span>
            </button>
          ))}
        </nav>

        <button className="shell__back" onClick={onClose}>
          Change client
        </button>
      </aside>

      <section className="shell__main">
        <header className="shell__header">
          <div>
            <p className="shell__client">{clientName}</p>
            <h1 className="shell__heading">{sectionTitle}</h1>
            <p className="shell__desc">{sectionDescription}</p>
          </div>

          <div className="shell__toolbar">
            <label className="shell__readonly">
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => onToggleReadOnly(e.target.checked)}
              />
              Read-only lock
            </label>
            <button className="shell__btn ghost" disabled={loading} onClick={onBackup}>
              Backup
            </button>
            <button className="shell__btn ghost" disabled={loading} onClick={onReload}>
              Reload
            </button>
            <button className="shell__btn primary" disabled={loading || !dirty} onClick={onSave}>
              {dirty ? 'Save changes' : 'Saved'}
            </button>
          </div>
        </header>

        <button className="shell__path" onClick={onShowFolder} title="Show in folder">
          {filePath}
        </button>

        {(status || error) && (
          <div className={`shell__status ${error ? 'is-error' : ''}`}>{error || status}</div>
        )}

        <div className="shell__list">
          {knownOptions.map((meta, i) => (
            <OptionField
              key={`${meta.section}.${meta.key}`}
              meta={meta}
              value={sectionValues[meta.key] ?? ''}
              style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
              onChange={(value) => onChange(meta.section, meta.key, value)}
            />
          ))}

          {unknownKeys.length > 0 && (
            <div className="shell__unknown">
              <h2>Other keys in [{sectionName}]</h2>
              <p>Unrecognized options. Still editable.</p>
              {unknownKeys.map((key) => (
                <OptionField
                  key={key}
                  meta={{
                    section: sectionName,
                    key,
                    label: key,
                    description: 'Key from your UserOptions.ini with no built-in label yet.',
                    control: { kind: 'text' },
                  }}
                  value={sectionValues[key] ?? ''}
                  onChange={(value) => onChange(sectionName, key, value)}
                />
              ))}
            </div>
          )}

          {knownOptions.length === 0 && unknownKeys.length === 0 && (
            <p className="shell__empty">This section is empty in the loaded file.</p>
          )}
        </div>
      </section>
    </div>
  )
}
