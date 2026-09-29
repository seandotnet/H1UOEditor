# H1UO Editor

Modern desktop editor for H1Z1 `UserOptions.ini` files.

Built for two common clients:

- **ROTK** — `C:\Games\ROTK\UserOptions.ini`
- **ZEmu** — `C:\Program Files (x86)\Steam\steamapps\content\app_433850\depot_433851\UserOptions.ini`

You can also browse to any other `UserOptions.ini`.

## Why UserOptions matter

H1Z1 exposes a lot of graphics, audio, input, and HUD behaviour through `UserOptions.ini`. Many competitive and performance tweaks (render scale, shadows, particle LOD, FOV, input lag) are clearer here than in the in-game menus — and the game will often rewrite the file on exit unless you mark it **read-only**.

H1UO Editor makes those keys readable, grouped by category, and safe to edit with backup + read-only lock support.

## Features

- Client picker for ROTK / ZEmu (plus custom path)
- Categorized settings with plain-English labels and tips
- Toggles, sliders, selects, and raw key editing for unknown options
- Save, reload, backup, and read-only lock
- Dark Aether-inspired UI

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Windows installers land under `release/` when using:

```bash
npm run electron:build
```
