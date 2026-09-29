/// <reference types="vite/client" />

export {}

declare global {
  interface Window {
    h1uo: import('../../electron/preload').H1uoApi
  }
}
