import React, { useEffect, useCallback } from 'react'
import DifficultySelector from './DifficultySelector'
import Stats from './Stats'
import Card from './Card'
import { useStore } from '../store/useStore'
import { shuffleArray } from './Utils' // Adjust the path if necessary
import { createBoard } from './Setup' // Correct import for createBoard
import '../styles/App.scss'
import Button from './Button'

const App: React.FC = () => {
  const {
    cards,
    setCards,
    gameWon,
    matchedPairs,
    difficulty,
    setDifficulty,
    handleCardClick,
    setGameWon,
    setMatchedPairs,
    setClickedCard,
    setAttempts,
    setTimer,
    setClickLock,
    stopTimer
  } = useStore()

  const startNewGame = useCallback(() => {
    stopTimer()
    const boardSize =
      difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 16
    setCards(shuffleArray(createBoard(boardSize)))
    setGameWon(false)
    setMatchedPairs(0)
    setClickedCard(undefined)
    setAttempts(0)
    setTimer(0)
    setClickLock(false)
  }, [
    difficulty,
    setCards,
    setGameWon,
    setMatchedPairs,
    setClickedCard,
    setAttempts,
    setTimer,
    setClickLock,
    stopTimer
  ])

  useEffect(() => {
    startNewGame()
  }, [startNewGame])

  useEffect(() => {
    if (cards.length > 0 && matchedPairs === cards.length / 2 && !gameWon) {
      setGameWon(true)
    }
  }, [matchedPairs, cards.length, gameWon, setGameWon])

  return (
    <div className='app'>
      <div className='app__header'>
        <Stats />
      </div>
      <div className='app__menu'>
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <Button startNewGame={startNewGame} />
        {gameWon && <div className='app__message'>You Won!</div>}
      </div>
      <div className='app__grid'>
        {cards.map(card => (
          <Card key={card.id} card={card} callback={handleCardClick} />
        ))}
      </div>
    </div>
  )
}

export default App
