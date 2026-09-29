export type IniValue = string
export type IniSection = Record<string, IniValue>
export type IniDocument = Record<string, IniSection>

export function parseIni(text: string): IniDocument {
  const doc: IniDocument = {}
  let current = 'General'

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith(';') || line.startsWith('#')) continue

    const sectionMatch = line.match(/^\[(.+)]$/)
    if (sectionMatch) {
      current = sectionMatch[1]
      if (!doc[current]) doc[current] = {}
      continue
    }

    const eq = line.indexOf('=')
    if (eq === -1) continue

    if (!doc[current]) doc[current] = {}
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim()
    doc[current][key] = value
  }

  return doc
}

export function serializeIni(doc: IniDocument, preferredOrder: string[] = []): string {
  const sections = [
    ...preferredOrder.filter((s) => s in doc),
    ...Object.keys(doc).filter((s) => !preferredOrder.includes(s)),
  ]

  const blocks: string[] = []
  for (const section of sections) {
    const entries = doc[section]
    if (!entries) continue
    const lines = Object.entries(entries).map(([k, v]) => `${k}=${v}`)
    blocks.push(`[${section}]\n${lines.join('\n')}`)
  }

  return blocks.join('\n\n') + '\n'
}

export function setIniValue(
  doc: IniDocument,
  section: string,
  key: string,
  value: string,
): IniDocument {
  const next: IniDocument = { ...doc }
  next[section] = { ...(doc[section] || {}), [key]: value }
  return next
}
