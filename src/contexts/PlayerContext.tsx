import { createContext, ReactNode, useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodeList: Episode[]
  currentEpisodeIndex: number
  play: (episode: Episode) => void
  isPlaying: boolean
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
  playList: (episode: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
  toggleLoop: () => void
  isLooping: boolean
  toggleShuffle: () => void
  isShuffling: boolean
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
  children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
  }

  function togglePlay() {
    setIsPlaying(o => !o)
  }

  function toggleLoop() {
    setIsLooping(o => !o)
  }

  function toggleShuffle() {
    setIsShuffling(o => !o)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || currentEpisodeIndex < episodeList.length - 1

  function playNext() {
    if (isShuffling) {
      const nextRandomIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomIndex)
    } else if (hasNext) setCurrentEpisodeIndex(o => o + 1)
    else {
      setEpisodeList([])
      setIsPlaying(false)
      setCurrentEpisodeIndex(0)
    }
  }

  function playPrevious() {
    if (hasPrevious) setCurrentEpisodeIndex(o => o - 1)
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      play,
      isPlaying,
      togglePlay,
      setPlayingState,
      playList,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      toggleLoop,
      isLooping,
      toggleShuffle,
      isShuffling,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}