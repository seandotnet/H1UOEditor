export type OptionControl =
  | { kind: 'toggle' }
  | { kind: 'number'; min?: number; max?: number; step?: number }
  | { kind: 'slider'; min: number; max: number; step: number }
  | { kind: 'select'; options: { value: string; label: string }[] }
  | { kind: 'text' }
  | { kind: 'colorInt' }

export type OptionMeta = {
  section: string
  key: string
  label: string
  description: string
  control: OptionControl
  /** quality scales that are inverted (0 = ultra, 3 = low) */
  invertedQuality?: boolean
  tip?: string
}

export type CategoryMeta = {
  id: string
  title: string
  description: string
  section: string
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'display',
    title: 'Display',
    description: 'Resolution, window mode, and pixel scale',
    section: 'Display',
  },
  {
    id: 'rendering',
    title: 'Rendering',
    description: 'Graphics quality, FOV, shadows, and FPS limits',
    section: 'Rendering',
  },
  {
    id: 'controls',
    title: 'Controls',
    description: 'Camera and click-to-move behaviour',
    section: 'Controls',
  },
  {
    id: 'sound',
    title: 'Sound',
    description: 'Master volume and audio channels',
    section: 'Sound',
  },
  {
    id: 'voice',
    title: 'Voice',
    description: 'Proximity and group voice chat levels',
    section: 'Voice',
  },
  {
    id: 'voicechat',
    title: 'Voice Chat',
    description: 'Per-channel voice chat toggles and devices',
    section: 'VoiceChat',
  },
  {
    id: 'ui',
    title: 'Interface',
    description: 'HUD, reticles, compass, and nameplates',
    section: 'UI',
  },
  {
    id: 'general',
    title: 'General',
    description: 'Sensitivity, input lag, and gameplay prefs',
    section: 'General',
  },
  {
    id: 'autorefuse',
    title: 'Auto Refuse',
    description: 'Automatically decline invites and requests',
    section: 'AutoRefuse',
  },
  {
    id: 'videostreamer',
    title: 'Streamer',
    description: 'Built-in video streamer settings',
    section: 'VideoStreamer',
  },
]

const quality0to3 = {
  kind: 'select' as const,
  options: [
    { value: '0', label: '0 - Ultra' },
    { value: '1', label: '1 - High' },
    { value: '2', label: '2 - Medium' },
    { value: '3', label: '3 - Low' },
  ],
}

const quality0to3Normal = {
  kind: 'select' as const,
  options: [
    { value: '0', label: '0 - Off / Low' },
    { value: '1', label: '1 - Medium' },
    { value: '2', label: '2 - High' },
    { value: '3', label: '3 - Ultra' },
  ],
}

const onOff = {
  kind: 'toggle' as const,
}

export const OPTION_META: OptionMeta[] = [
  // display
  {
    section: 'Display',
    key: 'Mode',
    label: 'Window Mode',
    description: 'How the game presents on your monitor.',
    control: {
      kind: 'select',
      options: [
        { value: 'Fullscreen', label: 'Fullscreen' },
        { value: 'WindowedFullscreen', label: 'Borderless' },
        { value: 'Windowed', label: 'Windowed' },
      ],
    },
  },
  {
    section: 'Display',
    key: 'FullscreenMode',
    label: 'Fullscreen Mode',
    description: 'Engine fullscreen mode companion to Window Mode.',
    control: {
      kind: 'select',
      options: [
        { value: 'Fullscreen', label: 'Fullscreen' },
        { value: 'Windowed', label: 'Windowed' },
      ],
    },
  },
  {
    section: 'Display',
    key: 'FullscreenWidth',
    label: 'Fullscreen Width',
    description: 'Horizontal resolution in fullscreen.',
    control: { kind: 'number', min: 640, max: 7680, step: 1 },
  },
  {
    section: 'Display',
    key: 'FullscreenHeight',
    label: 'Fullscreen Height',
    description: 'Vertical resolution in fullscreen.',
    control: { kind: 'number', min: 480, max: 4320, step: 1 },
  },
  {
    section: 'Display',
    key: 'WindowedWidth',
    label: 'Windowed Width',
    description: 'Window width when not fullscreen.',
    control: { kind: 'number', min: 640, max: 7680, step: 1 },
  },
  {
    section: 'Display',
    key: 'WindowedHeight',
    label: 'Windowed Height',
    description: 'Window height when not fullscreen.',
    control: { kind: 'number', min: 480, max: 4320, step: 1 },
  },
  {
    section: 'Display',
    key: 'HDPixelPlus',
    label: 'Render Scale (HDPixelPlus)',
    description:
      'Internal render resolution multiplier. Lower = more FPS, softer image. Stay above ~0.6.',
    control: { kind: 'slider', min: 0.5, max: 1.5, step: 0.05 },
    tip: '1.0 is native. Values around 0.8-1.0 are common for fps.',
  },
  {
    section: 'Display',
    key: 'FullscreenRefresh',
    label: 'Fullscreen Refresh',
    description: 'Refresh rate override (0 = use display default).',
    control: { kind: 'number', min: 0, max: 540, step: 1 },
  },
  {
    section: 'Display',
    key: 'Maximized',
    label: 'Maximized',
    description: 'Start the window maximized.',
    control: onOff,
  },
  {
    section: 'Display',
    key: 'FullscreenWindowedAllowTearing',
    label: 'Allow Tearing',
    description: 'Allow screen tearing in borderless for lower latency.',
    control: onOff,
  },

  // rendering
  {
    section: 'Rendering',
    key: 'EffectsQuality',
    label: 'Effects Quality',
    description: 'Visual effects fidelity. Higher helps bullet impacts stay visible.',
    control: quality0to3Normal,
    tip: '2 helps with seeing bullet impacts without going full ultra.',
  },
  {
    section: 'Rendering',
    key: 'TextureQuality',
    label: 'Texture Quality',
    description: 'Texture detail. This scale is inverted: 0 is ultra, 3 is low.',
    control: quality0to3,
    invertedQuality: true,
  },
  {
    section: 'Rendering',
    key: 'ShadowQuality',
    label: 'Shadow Quality',
    description: 'Shadow detail. 0 disables shadows for a large FPS gain.',
    control: quality0to3Normal,
  },
  {
    section: 'Rendering',
    key: 'FloraQuality',
    label: 'Flora Quality',
    description: 'Grass and foliage density.',
    control: quality0to3Normal,
  },
  {
    section: 'Rendering',
    key: 'ModelQuality',
    label: 'Model Quality',
    description: 'Character and world model detail.',
    control: quality0to3Normal,
  },
  {
    section: 'Rendering',
    key: 'LightingQuality',
    label: 'Lighting Quality',
    description: 'Dynamic lighting cost. GPU-heavy when raised.',
    control: {
      kind: 'select',
      options: [
        { value: '0', label: '0 - Off / Low' },
        { value: '1', label: '1 - Medium' },
        { value: '2', label: '2 - Ultra' },
      ],
    },
  },
  {
    section: 'Rendering',
    key: 'ParticleLOD',
    label: 'Particle LOD',
    description: 'Particle detail for bullets, smoke, and explosions.',
    control: {
      kind: 'select',
      options: [
        { value: '0', label: '0 - Low' },
        { value: '1', label: '1 - Medium' },
        { value: '2', label: '2 - High' },
        { value: '3', label: '3 - Ultra' },
      ],
    },
    tip: '2 pairs well with EffectsQuality for long-range hit feedback.',
  },
  {
    section: 'Rendering',
    key: 'OverallQuality',
    label: 'Overall Quality',
    description: 'Preset quality index. -1 usually means custom mixed settings.',
    control: { kind: 'number', min: -1, max: 5, step: 1 },
  },
  {
    section: 'Rendering',
    key: 'RenderDistance',
    label: 'Render Distance',
    description: 'How far the world draws. Higher costs FPS.',
    control: { kind: 'slider', min: 350, max: 3000, step: 50 },
  },
  {
    section: 'Rendering',
    key: 'Gamma',
    label: 'Gamma',
    description: 'Brightness curve. Adjust per monitor.',
    control: { kind: 'slider', min: 0, max: 2, step: 0.05 },
  },
  {
    section: 'Rendering',
    key: 'VerticalFOV',
    label: 'Vertical FOV',
    description: 'Field of view. Higher sees more, can cost a few FPS.',
    control: { kind: 'slider', min: 55, max: 100, step: 1 },
  },
  {
    section: 'Rendering',
    key: 'MaximumFPS',
    label: 'Maximum FPS',
    description: 'Frame cap. High values can speed loading screens.',
    control: { kind: 'number', min: 0, max: 1000, step: 1 },
  },
  {
    section: 'Rendering',
    key: 'AO',
    label: 'Ambient Occlusion',
    description: 'Soft contact shadows. Disable for FPS.',
    control: onOff,
  },
  {
    section: 'Rendering',
    key: 'FogShadowsEnable',
    label: 'Fog Shadows',
    description: 'Shadows in fog. GPU-heavy.',
    control: onOff,
  },
  {
    section: 'Rendering',
    key: 'UseLod0a',
    label: 'Aggressive LOD (UseLod0a)',
    description: 'Uses lower-poly distant models for FPS.',
    control: onOff,
  },
  {
    section: 'Rendering',
    key: 'Smoothing',
    label: 'Smoothing',
    description: 'Frame smoothing. Usually off for competitive play.',
    control: onOff,
  },
  {
    section: 'Rendering',
    key: 'MotionBlur',
    label: 'Motion Blur',
    description: 'Blurs motion. Keep off for clarity.',
    control: onOff,
  },
  {
    section: 'Rendering',
    key: 'InteriorLighting',
    label: 'Interior Lighting',
    description: 'Indoor lighting effects.',
    control: onOff,
  },
  {
    section: 'Rendering',
    key: 'ObjectOutlines',
    label: 'Object Outlines',
    description: 'Highlight outlines on interactable objects.',
    control: onOff,
  },
  {
    section: 'Rendering',
    key: 'SpeedTreeLOD',
    label: 'SpeedTree LOD',
    description: 'Tree level-of-detail bias.',
    control: { kind: 'number', min: 0, max: 3, step: 1 },
  },
  {
    section: 'Rendering',
    key: 'MaxLocalShadows',
    label: 'Max Local Shadows',
    description: 'Cap on local shadow casters.',
    control: { kind: 'number', min: 0, max: 16, step: 1 },
  },
  {
    section: 'Rendering',
    key: 'UseDepthOfField',
    label: 'Depth of Field',
    description: 'Cinematic blur. Usually leave at 0.',
    control: { kind: 'number', min: 0, max: 1, step: 0.1 },
  },
  {
    section: 'Rendering',
    key: 'VSync',
    label: 'VSync',
    description: 'Sync frames to monitor refresh. Reduces tearing, adds latency.',
    control: onOff,
  },

  // controls
  {
    section: 'Controls',
    key: 'CameraAutoAdjustment',
    label: 'Camera Auto Adjustment',
    description: 'Automatically adjusts camera behind the character.',
    control: onOff,
  },
  {
    section: 'Controls',
    key: 'ClickToMove',
    label: 'Click To Move',
    description: 'Enable click-to-move movement.',
    control: onOff,
  },
  {
    section: 'Controls',
    key: 'ClickToMoveRightButton',
    label: 'Right-Click To Move',
    description: 'Use right mouse button for click-to-move.',
    control: onOff,
  },
  {
    section: 'Controls',
    key: 'RailCamera',
    label: 'Rail Camera',
    description: 'Legacy rail-style camera behaviour.',
    control: onOff,
  },
  {
    section: 'Controls',
    key: 'CameraType',
    label: 'Camera Type',
    description: 'Camera mode index used by newer clients.',
    control: { kind: 'number', min: 0, max: 5, step: 1 },
  },

  // sound
  {
    section: 'Sound',
    key: 'Master',
    label: 'Master Volume',
    description: 'Overall game audio level.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'SoundEffects',
    label: 'Sound Effects',
    description: 'SFX channel volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'UI',
    label: 'UI Sounds',
    description: 'Menu and interface sounds.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'Dialog',
    label: 'Dialog',
    description: 'Voice / dialog channel.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'MusicMaster',
    label: 'Music Master',
    description: 'Overall music volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'MusicAmbient',
    label: 'Ambient Music',
    description: 'Ambient music layer.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'MusicEncounter',
    label: 'Encounter Music',
    description: 'Combat / encounter music layer.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'MuteAll',
    label: 'Mute All',
    description: 'Silence all game audio.',
    control: onOff,
  },
  {
    section: 'Sound',
    key: 'VehicleDegradationVolume',
    label: 'Vehicle Degradation',
    description: 'Volume for damaged vehicle audio cues.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'VehicleHitIndicator',
    label: 'Vehicle Hit Indicator',
    description: 'Volume for vehicle hit feedback.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'GasAlertVolume',
    label: 'Gas Alert',
    description: 'Gas / zone alert volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'Sound',
    key: 'PlayDeathScreams',
    label: 'Death Screams',
    description: 'Play death scream audio.',
    control: onOff,
  },

  // voice
  {
    section: 'Voice',
    key: 'Enable',
    label: 'Voice Enabled',
    description: 'Master voice chat enable.',
    control: onOff,
  },
  {
    section: 'Voice',
    key: 'ReceiveVolume',
    label: 'Receive Volume',
    description: 'Incoming voice level.',
    control: { kind: 'slider', min: 0, max: 100, step: 1 },
  },
  {
    section: 'Voice',
    key: 'MicrophoneVolume',
    label: 'Microphone Volume',
    description: 'Outgoing mic level.',
    control: { kind: 'slider', min: 0, max: 100, step: 1 },
  },
  {
    section: 'Voice',
    key: 'GuildVolume',
    label: 'Guild Volume',
    description: 'Guild voice channel level.',
    control: { kind: 'slider', min: 0, max: 100, step: 1 },
  },
  {
    section: 'Voice',
    key: 'GroupVolume',
    label: 'Group Volume',
    description: 'Group voice channel level.',
    control: { kind: 'slider', min: 0, max: 100, step: 1 },
  },
  {
    section: 'Voice',
    key: 'DisableProximityChatInTheBoxOfDestiny',
    label: 'Disable Proximity In BoD',
    description: 'Mute proximity chat inside Box of Destiny.',
    control: onOff,
  },
  {
    section: 'Voice',
    key: 'DisableSpectateChat',
    label: 'Disable Spectate Chat',
    description: 'Mute voice while spectating.',
    control: onOff,
  },

  // voicechat
  {
    section: 'VoiceChat',
    key: 'InputDevice',
    label: 'Input Device',
    description: 'Microphone device name or GUID.',
    control: { kind: 'text' },
  },
  {
    section: 'VoiceChat',
    key: 'OutputDevice',
    label: 'Output Device',
    description: 'Playback device name.',
    control: { kind: 'text' },
  },
  {
    section: 'VoiceChat',
    key: 'ProximityEnabled',
    label: 'Proximity Chat',
    description: 'Enable nearby player voice.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'ProximityVolume',
    label: 'Proximity Volume',
    description: 'Nearby voice volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VoiceChat',
    key: 'GroupEnabled',
    label: 'Group Chat',
    description: 'Enable group voice channel.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'GroupVolume',
    label: 'Group Volume',
    description: 'Group channel volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VoiceChat',
    key: 'GuildEnabled',
    label: 'Guild Chat',
    description: 'Enable guild voice channel.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'GuildVolume',
    label: 'Guild Volume',
    description: 'Guild channel volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VoiceChat',
    key: 'RaidEnabled',
    label: 'Raid Chat',
    description: 'Enable raid voice channel.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'RaidVolume',
    label: 'Raid Volume',
    description: 'Raid channel volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VoiceChat',
    key: 'RadioEnabled',
    label: 'Radio Chat',
    description: 'Enable radio voice channel.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'RadioVolume',
    label: 'Radio Volume',
    description: 'Radio channel volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VoiceChat',
    key: 'CBEnabled',
    label: 'CB Chat',
    description: 'Enable CB voice channel.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'CBVolume',
    label: 'CB Volume',
    description: 'CB channel volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VoiceChat',
    key: 'CustomEnabled',
    label: 'Custom Chat',
    description: 'Enable custom voice channel.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'CustomVolume',
    label: 'Custom Volume',
    description: 'Custom channel volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VoiceChat',
    key: 'EchoEnabled',
    label: 'Echo Test',
    description: 'Echo / mic test channel.',
    control: onOff,
  },
  {
    section: 'VoiceChat',
    key: 'EchoVolume',
    label: 'Echo Volume',
    description: 'Echo test volume.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },

  // ui
  {
    section: 'UI',
    key: 'HideNames',
    label: 'Hide Names',
    description: 'Hide player nameplates.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'HideLocations',
    label: 'Hide Locations',
    description: 'Hide location labels on the map / HUD.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'BoDNameplates',
    label: 'BoD Nameplates',
    description: 'Nameplates inside Box of Destiny.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'DiagnosticsHud',
    label: 'Diagnostics HUD',
    description: 'Show performance / debug HUD.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'LegacyHitmarker',
    label: 'Legacy Hitmarker',
    description: 'Use classic hitmarker style.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'CenterInventory',
    label: 'Center Inventory',
    description: 'Center the inventory panel.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'ScaleInventory',
    label: 'Scale Inventory',
    description: 'Scale inventory UI.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'OverheadChevrons',
    label: 'Overhead Chevrons',
    description: 'Show teammate chevrons overhead.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'ShowCompassPOIs',
    label: 'Compass POIs',
    description: 'Show points of interest on the compass.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'ShowCompassGasRing',
    label: 'Compass Gas Ring',
    description: 'Show gas ring indicator on compass.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'ShowCompassTeam',
    label: 'Compass Team',
    description: 'Show teammates on compass.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'reticleStyle',
    label: 'Reticle Style',
    description: 'Crosshair style index.',
    control: { kind: 'number', min: 0, max: 50, step: 1 },
  },
  {
    section: 'UI',
    key: 'reticle_frame',
    label: 'Reticle Frame',
    description: 'Reticle frame / shape id.',
    control: { kind: 'number', min: 0, max: 50, step: 1 },
  },
  {
    section: 'UI',
    key: 'reticle_tint',
    label: 'Reticle Tint',
    description: 'Reticle colour as an integer colour value.',
    control: { kind: 'colorInt' },
  },
  {
    section: 'UI',
    key: 'reticleClassicMode',
    label: 'Classic Reticle Mode',
    description: 'Use classic reticle behaviour.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'AllowForcedDynamicReticles',
    label: 'Dynamic Reticles',
    description: 'Allow forced dynamic reticle behaviour.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'ShotBlockIcon',
    label: 'Shot Block Icon',
    description: 'Show icon when shots are blocked.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'ShowInMatchChallengesHud',
    label: 'In-Match Challenges HUD',
    description: 'Show challenge progress during matches.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'OriginalGroupLayout',
    label: 'Original Group Layout',
    description: 'Use the original group UI layout.',
    control: onOff,
  },
  {
    section: 'UI',
    key: 'ROTKSocialLanguage',
    label: 'Social Language',
    description: 'Language code for social / ROTK UI.',
    control: { kind: 'text' },
  },

  // general
  {
    section: 'General',
    key: 'MouseSensitivity',
    label: 'Mouse Sensitivity',
    description: 'Base look sensitivity.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.005 },
  },
  {
    section: 'General',
    key: 'ADSMouseSensitivity',
    label: 'ADS Sensitivity',
    description: 'Aim-down-sights sensitivity.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.005 },
  },
  {
    section: 'General',
    key: 'ScopedMouseSensitivity',
    label: 'Scoped Sensitivity',
    description: 'Sensitivity while scoped.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.005 },
  },
  {
    section: 'General',
    key: 'VehicleMouseSensitivity',
    label: 'Vehicle Sensitivity',
    description: 'Look sensitivity in vehicles.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.005 },
  },
  {
    section: 'General',
    key: 'FlightMouseSensitivity',
    label: 'Flight Sensitivity',
    description: 'Look sensitivity while flying.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.005 },
  },
  {
    section: 'General',
    key: 'ReduceInputLag',
    label: 'Reduce Input Lag',
    description: 'Input latency reduction mode (0-2 depending on client).',
    control: { kind: 'number', min: 0, max: 2, step: 1 },
  },
  {
    section: 'General',
    key: 'MouseRawInput',
    label: 'Raw Mouse Input',
    description: 'Bypass OS mouse acceleration.',
    control: onOff,
  },
  {
    section: 'General',
    key: 'MouseSmoothing',
    label: 'Mouse Smoothing',
    description: 'Smooth mouse movement. Usually off.',
    control: onOff,
  },
  {
    section: 'General',
    key: 'GamepadInvertLook',
    label: 'Invert Gamepad Look',
    description: 'Invert vertical look on gamepad.',
    control: onOff,
  },
  {
    section: 'General',
    key: 'FirstPerson',
    label: 'First Person',
    description: 'Prefer first-person camera when available.',
    control: onOff,
  },
  {
    section: 'General',
    key: 'ToggleCrouch',
    label: 'Toggle Crouch',
    description: 'Crouch toggles instead of hold.',
    control: onOff,
  },
  {
    section: 'General',
    key: 'AutoDetectPerformanceSettings',
    label: 'Auto Detect Performance',
    description: 'Let the client auto-pick performance presets.',
    control: { kind: 'number', min: 0, max: 5, step: 1 },
  },
  {
    section: 'General',
    key: 'TracerOption',
    label: 'Tracer Option',
    description: 'Who shows bullet tracers.',
    control: {
      kind: 'select',
      options: [
        { value: 'Off', label: 'Off' },
        { value: 'EnemiesOnly', label: 'Enemies Only' },
        { value: 'All', label: 'All' },
        { value: 'SelfOnly', label: 'Self Only' },
      ],
    },
  },
  {
    section: 'General',
    key: 'Version',
    label: 'Options Version',
    description: 'Internal UserOptions schema version.',
    control: { kind: 'number', min: 0, max: 10, step: 1 },
  },

  // autorefuse
  {
    section: 'AutoRefuse',
    key: 'FriendInvitation',
    label: 'Refuse Friend Invites',
    description: 'Auto-decline friend invitations.',
    control: onOff,
  },
  {
    section: 'AutoRefuse',
    key: 'DuelInvitation',
    label: 'Refuse Duels',
    description: 'Auto-decline duel invitations.',
    control: onOff,
  },
  {
    section: 'AutoRefuse',
    key: 'GuildInvitation',
    label: 'Refuse Guild Invites',
    description: 'Auto-decline guild invitations.',
    control: onOff,
  },
  {
    section: 'AutoRefuse',
    key: 'TradeRequest',
    label: 'Refuse Trades',
    description: 'Auto-decline trade requests.',
    control: onOff,
  },
  {
    section: 'AutoRefuse',
    key: 'HousingInvitation',
    label: 'Refuse Housing Invites',
    description: 'Auto-decline housing invitations.',
    control: onOff,
  },
  {
    section: 'AutoRefuse',
    key: 'GroupInvitation',
    label: 'Refuse Group Invites',
    description: 'Auto-decline group invitations.',
    control: onOff,
  },
  {
    section: 'AutoRefuse',
    key: 'HideUi',
    label: 'Hide Refuse UI',
    description: 'Hide auto-refuse related UI prompts.',
    control: onOff,
  },

  // videostreamer
  {
    section: 'VideoStreamer',
    key: 'Resolution',
    label: 'Stream Resolution',
    description: 'Built-in streamer resolution preset index.',
    control: { kind: 'number', min: 0, max: 5, step: 1 },
  },
  {
    section: 'VideoStreamer',
    key: 'Fps',
    label: 'Stream FPS',
    description: 'Target stream frame rate.',
    control: { kind: 'number', min: 15, max: 60, step: 1 },
  },
  {
    section: 'VideoStreamer',
    key: 'Kbps',
    label: 'Stream Bitrate (Kbps)',
    description: 'Stream bitrate. 0 may mean auto / unused.',
    control: { kind: 'number', min: 0, max: 20000, step: 100 },
  },
  {
    section: 'VideoStreamer',
    key: 'MicRecordVolume',
    label: 'Mic Record Volume',
    description: 'Microphone mix into stream.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VideoStreamer',
    key: 'SpeakerRecordVolume',
    label: 'Speaker Record Volume',
    description: 'Game audio mix into stream.',
    control: { kind: 'slider', min: 0, max: 1, step: 0.01 },
  },
  {
    section: 'VideoStreamer',
    key: 'Username',
    label: 'Streamer Username',
    description: 'Account name used by the built-in streamer.',
    control: { kind: 'text' },
  },
]

export function metaFor(section: string, key: string): OptionMeta | undefined {
  return OPTION_META.find((m) => m.section === section && m.key === key)
}

export const SECTION_ORDER = CATEGORIES.map((c) => c.section)
