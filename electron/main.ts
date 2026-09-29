import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import path from 'node:path'
import fs from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

async function setWindowsReadOnly(filePath: string, readOnly: boolean) {
  if (process.platform !== 'win32') {
    await fs.chmod(filePath, readOnly ? 0o444 : 0o666)
    return
  }
  await execFileAsync('attrib', [readOnly ? '+R' : '-R', filePath])
}

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#000000',
    title: 'H1UO Editor',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })

  win.once('ready-to-show', () => win.show())

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

async function pathExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function isReadOnly(filePath: string) {
  try {
    await fs.access(filePath, fsConstants.W_OK)
    return false
  } catch {
    return true
  }
}

ipcMain.handle('fs:exists', async (_event, filePath: string) => pathExists(filePath))

ipcMain.handle('fs:readText', async (_event, filePath: string) => {
  const text = await fs.readFile(filePath, 'utf8')
  const readOnly = await isReadOnly(filePath)
  return { text, readOnly }
})

ipcMain.handle(
  'fs:writeText',
  async (_event, filePath: string, text: string, makeReadOnly: boolean) => {
    // clear read-only so we can write, then optionally re-apply
    try {
      await setWindowsReadOnly(filePath, false)
    } catch {
      // file may not exist yet
    }

    await fs.writeFile(filePath, text, 'utf8')

    if (makeReadOnly) {
      await setWindowsReadOnly(filePath, true)
    }

    return { ok: true, readOnly: makeReadOnly }
  },
)

ipcMain.handle('fs:backup', async (_event, filePath: string) => {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = `${filePath}.bak-${stamp}`
  await fs.copyFile(filePath, backupPath)
  return backupPath
})

ipcMain.handle('fs:setReadOnly', async (_event, filePath: string, readOnly: boolean) => {
  await setWindowsReadOnly(filePath, readOnly)
  return { readOnly }
})

ipcMain.handle('dialog:pickIni', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select UserOptions.ini',
    properties: ['openFile'],
    filters: [{ name: 'INI files', extensions: ['ini'] }],
  })
  if (result.canceled || result.filePaths.length === 0) return null
  return result.filePaths[0]
})

ipcMain.handle('shell:showItem', async (_event, filePath: string) => {
  shell.showItemInFolder(filePath)
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
