import { useEffect, useMemo, useState } from 'react'
import { CLIENTS, type ClientDefinition, type ClientId } from './lib/clients'
import { parseIni, serializeIni, setIniValue, type IniDocument } from './lib/ini'
import { CATEGORIES, SECTION_ORDER, metaFor, type OptionMeta } from './lib/optionsMeta'
import { ClientPicker } from './components/ClientPicker'
import { EditorShell } from './components/EditorShell'
import './App.css'

type Session = {
  client: ClientDefinition | { id: ClientId; name: string; shortName: string; description: string; defaultPath: string }
  path: string
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [doc, setDoc] = useState<IniDocument | null>(null)
  const [originalText, setOriginalText] = useState('')
  const [readOnly, setReadOnly] = useState(false)
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [availability, setAvailability] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!window.h1uo) return
      const next: Record<string, boolean> = {}
      for (const client of CLIENTS) {
        next[client.id] = await window.h1uo.exists(client.defaultPath)
      }
      if (!cancelled) setAvailability(next)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const dirty = useMemo(() => {
    if (!doc) return false
    return serializeIni(doc, SECTION_ORDER) !== originalText
  }, [doc, originalText])

  async function openPath(client: Session['client'], filePath: string) {
    setLoading(true)
    setError(null)
    try {
      const exists = await window.h1uo.exists(filePath)
      if (!exists) {
        setError(`File not found:\n${filePath}`)
        setLoading(false)
        return
      }
      const { text, readOnly: ro } = await window.h1uo.readText(filePath)
      const parsed = parseIni(text)
      setSession({ client, path: filePath })
      setDoc(parsed)
      setOriginalText(serializeIni(parsed, SECTION_ORDER))
      setReadOnly(ro)
      setActiveCategory(CATEGORIES[0].id)
      setStatus(`Loaded ${client.shortName}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  async function handlePickClient(client: ClientDefinition) {
    await openPath(client, client.defaultPath)
  }

  async function handleBrowse() {
    const picked = await window.h1uo.pickIni()
    if (!picked) return
    await openPath(
      {
        id: 'custom',
        name: 'Custom',
        shortName: 'Custom',
        description: 'Custom UserOptions.ini path',
        defaultPath: picked,
      },
      picked,
    )
  }

  function updateValue(section: string, key: string, value: string) {
    if (!doc) return
    setDoc(setIniValue(doc, section, key, value))
  }

  async function handleSave() {
    if (!session || !doc) return
    setLoading(true)
    setError(null)
    try {
      const text = serializeIni(doc, SECTION_ORDER)
      const result = await window.h1uo.writeText(session.path, text, readOnly)
      setOriginalText(text)
      setReadOnly(result.readOnly)
      setStatus(readOnly ? 'Saved + read-only locked' : 'Saved')
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  async function handleReload() {
    if (!session) return
    await openPath(session.client, session.path)
    setStatus('Reloaded from disk')
  }

  async function handleBackup() {
    if (!session) return
    setLoading(true)
    try {
      const backupPath = await window.h1uo.backup(session.path)
      setStatus(`Backup created: ${backupPath}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleReadOnly(next: boolean) {
    if (!session) return
    try {
      const result = await window.h1uo.setReadOnly(session.path, next)
      setReadOnly(result.readOnly)
      setStatus(next ? 'File marked read-only' : 'Read-only cleared')
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  function handleClose() {
    setSession(null)
    setDoc(null)
    setOriginalText('')
    setError(null)
    setStatus(null)
  }

  const active = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0]

  const knownOptions: OptionMeta[] = useMemo(() => {
    if (!doc) return []
    const section = doc[active.section] || {}
    return Object.keys(section)
      .map((key) => metaFor(active.section, key))
      .filter((m): m is OptionMeta => Boolean(m))
  }, [doc, active.section])

  const unknownKeys = useMemo(() => {
    if (!doc) return [] as string[]
    const section = doc[active.section] || {}
    return Object.keys(section).filter((key) => !metaFor(active.section, key))
  }, [doc, active.section])

  const presentCategories = useMemo(() => {
    if (!doc) return CATEGORIES
    const known = CATEGORIES.filter((c) => Boolean(doc[c.section]))
    const knownSections = new Set(CATEGORIES.map((c) => c.section))
    const extras = Object.keys(doc)
      .filter((section) => !knownSections.has(section))
      .map((section) => ({
        id: `extra-${section}`,
        title: section,
        description: `Additional keys from [${section}]`,
        section,
      }))
    return [...known, ...extras]
  }, [doc])

  if (!session || !doc) {
    return (
      <ClientPicker
        availability={availability}
        loading={loading}
        error={error}
        onPick={handlePickClient}
        onBrowse={handleBrowse}
      />
    )
  }

  return (
    <EditorShell
      clientName={session.client.shortName}
      filePath={session.path}
      categories={presentCategories}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      dirty={dirty}
      readOnly={readOnly}
      loading={loading}
      status={status}
      error={error}
      knownOptions={knownOptions}
      unknownKeys={unknownKeys}
      sectionValues={doc[active.section] || {}}
      sectionTitle={active.title}
      sectionDescription={active.description}
      onChange={updateValue}
      onSave={handleSave}
      onReload={handleReload}
      onBackup={handleBackup}
      onToggleReadOnly={handleToggleReadOnly}
      onClose={handleClose}
      onShowFolder={() => window.h1uo.showInFolder(session.path)}
      sectionName={active.section}
    />
  )
}
