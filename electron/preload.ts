import { contextBridge, ipcRenderer } from 'electron'

export type FileReadResult = {
  text: string
  readOnly: boolean
}

const api = {
  exists: (filePath: string) => ipcRenderer.invoke('fs:exists', filePath) as Promise<boolean>,
  readText: (filePath: string) =>
    ipcRenderer.invoke('fs:readText', filePath) as Promise<FileReadResult>,
  writeText: (filePath: string, text: string, makeReadOnly: boolean) =>
    ipcRenderer.invoke('fs:writeText', filePath, text, makeReadOnly) as Promise<{
      ok: boolean
      readOnly: boolean
    }>,
  backup: (filePath: string) => ipcRenderer.invoke('fs:backup', filePath) as Promise<string>,
  setReadOnly: (filePath: string, readOnly: boolean) =>
    ipcRenderer.invoke('fs:setReadOnly', filePath, readOnly) as Promise<{ readOnly: boolean }>,
  pickIni: () => ipcRenderer.invoke('dialog:pickIni') as Promise<string | null>,
  showInFolder: (filePath: string) =>
    ipcRenderer.invoke('shell:showItem', filePath) as Promise<void>,
}

contextBridge.exposeInMainWorld('h1uo', api)

export type H1uoApi = typeof api
