import { create } from 'zustand'
import { CardType } from '../components/Setup'

interface GameHistory {
  attempts: number
  duration: number
  date: string
}

interface GameState {
  cards: CardType[]
  gameWon: boolean
  matchedPairs: number
  clickedCard: CardType | undefined
  attempts: number
  timer: number
  timerInterval: number | null
  clickLock: boolean
  gameHistory: GameHistory[]
  difficulty: string
  bestAttempts: number
  bestTime: number
  setDifficulty: (difficulty: string) => void
  setCards: (cards: CardType[]) => void
  setGameWon: (won: boolean) => void
  setMatchedPairs: (pairs: number) => void
  setClickedCard: (card: CardType | undefined) => void
  incrementAttempts: () => void
  startTimer: () => void
  stopTimer: () => void
  handleCardClick: (currentClickedCard: CardType) => void
  saveGameHistory: () => void
  loadGameHistory: () => void
  setAttempts: (attempts: number) => void
  setTimer: (timer: number) => void
  setClickLock: (clickLock: boolean) => void
}

export const useStore = create<GameState>((set, get) => ({
  cards: [],
  gameWon: false,
  matchedPairs: 0,
  clickedCard: undefined,
  attempts: 0,
  timer: 0,
  timerInterval: null,
  clickLock: false,
  gameHistory: [],
  difficulty: 'easy', // Default value
  bestAttempts: 0,
  bestTime: 0,
  setDifficulty: (difficulty: string) => set({ difficulty }),
  setCards: cards => set({ cards }),
  setGameWon: won => set({ gameWon: won }),
  setMatchedPairs: pairs => set({ matchedPairs: pairs }),
  setClickedCard: card => set({ clickedCard: card }),
  incrementAttempts: () => set(state => ({ attempts: state.attempts + 1 })),
  startTimer: () => {
    const { timerInterval } = get()
    if (timerInterval !== null) {
      clearInterval(timerInterval)
    }
    const interval = setInterval(() => {
      set(state => ({ timer: state.timer + 1 }))
    }, 1000)
    set({ timerInterval: interval })
  },
  stopTimer: () => {
    const { timerInterval } = get()
    if (timerInterval !== null) {
      clearInterval(timerInterval)
      set({ timerInterval: null })
    }
  },
  handleCardClick: (currentClickedCard: CardType) => {
    const {
      cards,
      clickedCard,
      matchedPairs,
      setCards,
      setMatchedPairs,
      setClickedCard,
      setGameWon,
      incrementAttempts,
      timerInterval,
      clickLock,
      saveGameHistory,
      startTimer,
      timer
    } = get()

    if (
      !currentClickedCard.clickable ||
      currentClickedCard.flipped ||
      clickLock
    )
      return

    if (timer === 0) {
      startTimer()
    }

    incrementAttempts()

    setCards(
      cards.map(card =>
        card.id === currentClickedCard.id
          ? { ...card, flipped: true, clickable: false }
          : card
      )
    )

    if (!clickedCard) {
      setClickedCard({ ...currentClickedCard })
      return
    }

    set({ clickLock: true })

    if (clickedCard.matchingCardId === currentClickedCard.id) {
      setMatchedPairs(matchedPairs + 1)
      setCards(
        cards.map(card =>
          card.id === clickedCard.id || card.id === currentClickedCard.id
            ? { ...card, flipped: true, clickable: false }
            : card
        )
      )
      setClickedCard(undefined)
      set({ clickLock: false })
      if (matchedPairs + 1 === cards.length / 2) {
        setGameWon(true)
        if (timerInterval !== null) clearInterval(timerInterval)
        saveGameHistory()
      }
      return
    }

    setTimeout(() => {
      setCards(
        cards.map(card =>
          card.id === clickedCard.id || card.id === currentClickedCard.id
            ? { ...card, flipped: false, clickable: true }
            : card
        )
      )
      setClickedCard(undefined)
      set({ clickLock: false })
    }, 1000)
  },
  saveGameHistory: () => {
    const { attempts, timer, gameHistory } = get()
    const newHistory = {
      attempts,
      duration: timer,
      date: new Date().toLocaleString()
    }
    const updatedHistory = [...gameHistory, newHistory]
    set({ gameHistory: updatedHistory })
    localStorage.setItem('gameHistory', JSON.stringify(updatedHistory))
  },
  loadGameHistory: () => {
    const history = localStorage.getItem('gameHistory')
    if (history) {
      set({ gameHistory: JSON.parse(history) })
    }
  },
  setAttempts: (attempts: number) => set({ attempts }),
  setTimer: (timer: number) => set({ timer }),
  setClickLock: (clickLock: boolean) => set({ clickLock })
}))
