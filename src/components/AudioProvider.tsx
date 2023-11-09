'use client'

import { createContext } from 'react'
import { type Episode } from '@/lib/episodes'

interface PlayerState {
  playing: boolean
  muted: boolean
  duration: number
  currentTime: number
  episode: Episode | null
}

interface PublicPlayerAction {
  play: (episode?: Episode) => void
  pause: () => void
  toggle: (episode?: Episode) => void
  seekBy: (amount: number) => void
  seek: (time: number) => void
  playBackRate: (rate: number) => void
  toggleMute: () => void
  isPlaying: (episode?: Episode) => boolean
}

export type PlayerAPI = PlayerState & PublicPlayerAction

const enum ActionKind {
  SET_META = 'SET_META',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  TOGGLE_MUTE = 'TOGGLE_MUTE',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_DURATION = 'SET_DURATION',
}

type Action =
  | { type: ActionKind.SET_META; playload: Episode }
  | { type: ActionKind.PLAY }
  | { type: ActionKind.PAUSE }
  | { type: ActionKind.TOGGLE_MUTE }
  | { type: ActionKind.SET_CURRENT_TIME; playload: number }
  | { type: ActionKind.SET_DURATION; playload: number }

const AudioPlayerContext = createContext<PlayerAPI | null>(null)

function audioReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case ActionKind.SET_META:
      return { ...state, episode: action.playload }
    case ActionKind.PLAY:
      return { ...state, playing: true }
    case ActionKind.PAUSE:
      return { ...state, playing: false }
    case ActionKind.TOGGLE_MUTE:
      return { ...state, muted: !state.muted }
    case ActionKind.SET_CURRENT_TIME:
      return { ...state, currentTime: action.playload }
    case ActionKind.SET_DURATION:
      return { ...state, duration: action.playload }
  }
}

export default function AudioProvider() {
  return <div>AudioProvider</div>
}
