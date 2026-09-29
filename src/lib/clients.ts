export type ClientId = 'rotk' | 'zemu' | 'custom'

export type ClientDefinition = {
  id: ClientId
  name: string
  shortName: string
  description: string
  defaultPath: string
}

export const CLIENTS: ClientDefinition[] = [
  {
    id: 'rotk',
    name: 'ROTK',
    shortName: 'ROTK',
    description: 'Return of the Kings client UserOptions',
    defaultPath: 'C:\\Games\\ROTK\\UserOptions.ini',
  },
  {
    id: 'zemu',
    name: 'ZEmu',
    shortName: 'ZEmu',
    description: 'Steam depot / ZEmu client UserOptions',
    defaultPath:
      'C:\\Program Files (x86)\\Steam\\steamapps\\content\\app_433850\\depot_433851\\UserOptions.ini',
  },
]
