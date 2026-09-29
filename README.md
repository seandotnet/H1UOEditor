# H1UO Editor

Windows desktop app for editing H1Z1 `UserOptions.ini` files.

Supports:

- **ROTK**: `C:\Games\ROTK\UserOptions.ini`
- **ZEmu**: `C:\Program Files (x86)\Steam\steamapps\content\app_433850\depot_433851\UserOptions.ini`
- Any other `UserOptions.ini` via browse

## Why bother

A lot of useful settings are only in `UserOptions.ini` (render scale, shadows, particle LOD, FOV, input lag, etc). The in-game menus don't expose everything, and the game can overwrite your file on exit unless it's marked read-only.

## Features

- Pick ROTK or ZEmu (or browse to a custom path)
- Settings grouped by category with labels and short descriptions
- Toggles, sliders, dropdowns, and raw editing for unknown keys
- Save, reload, backup, and read-only lock

## Develop

```bash
npm install
npm run dev
```

This launches the Electron desktop app.

## Build installer

```bash
npm run electron:build
```

Output goes to `release/`.
