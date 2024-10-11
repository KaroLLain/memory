import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import '../styles/Stats.scss'

interface GameHistory {
  attempts: number
  duration: number
  date: string
}

const Stats: React.FC = () => {
  const { attempts, timer, gameHistory } = useStore()
  const [bestAttempts, setBestAttempts] = useState<number>(0)
  const [bestTime, setBestTime] = useState<number>(0)

  useEffect(() => {
    const history = localStorage.getItem('gameHistory')
    if (history) {
      const parsedHistory: GameHistory[] = JSON.parse(history)
      const bestAttempts = Math.min(...parsedHistory.map(game => game.attempts))
      const bestTime = Math.min(...parsedHistory.map(game => game.duration))
      setBestAttempts(bestAttempts)
      setBestTime(bestTime)
    }
  }, [gameHistory])

  return (
    <div className='stats'>
      <div className='stat'>
        <span className='label'>Attempts:</span>
        <span className='value'>{attempts}</span>
      </div>
      <div className='stat'>
        <span className='label'>Time Elapsed:</span>
        <span className='value'>{timer} sec</span>
      </div>
      <div className='stat'>
        <span className='label'>Best Attempts:</span>
        <span className='value'>{bestAttempts}</span>
      </div>
      <div className='stat'>
        <span className='label'>Best Time:</span>
        <span className='value'>{bestTime} sec</span>
      </div>
    </div>
  )
}

export default Stats
