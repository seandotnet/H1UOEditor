import type { ClientDefinition } from '../lib/clients'
import { CLIENTS } from '../lib/clients'
import './ClientPicker.css'

type Props = {
  availability: Record<string, boolean>
  loading: boolean
  error: string | null
  onPick: (client: ClientDefinition) => void
  onBrowse: () => void
}

export function ClientPicker({ availability, loading, error, onPick, onBrowse }: Props) {
  return (
    <div className="picker">
      <div className="picker__atmosphere" aria-hidden />
      <div className="picker__grid" aria-hidden />

      <main className="picker__content">
        <p className="picker__label">H1UO EDITOR</p>
        <h1 className="picker__title">
          UserOptions
          <br />
          editor
        </h1>
        <p className="picker__subtitle">
          Choose which client to edit. Settings are grouped and labeled so you don't have to dig
          through the raw .ini.
        </p>

        <div className="picker__actions">
          {CLIENTS.map((client, index) => {
            const found = availability[client.id]
            return (
              <button
                key={client.id}
                className="picker__card"
                style={{ animationDelay: `${120 + index * 80}ms` }}
                disabled={loading}
                onClick={() => onPick(client)}
              >
                <span className="picker__card-kicker">{client.shortName}</span>
                <span className="picker__card-title">{client.name}</span>
                <span className="picker__card-desc">{client.description}</span>
                <span className={`picker__badge ${found ? 'is-ok' : 'is-miss'}`}>
                  {found === undefined ? 'CHECKING' : found ? 'FOUND' : 'NOT FOUND'}
                </span>
              </button>
            )
          })}
        </div>

        <button className="picker__browse" disabled={loading} onClick={onBrowse}>
          Browse for UserOptions.ini
        </button>

        {error && <p className="picker__error">{error}</p>}
      </main>
    </div>
  )
}
