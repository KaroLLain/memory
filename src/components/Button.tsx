import React from 'react'
import '../styles/Button.scss'

interface ButtonProps {
  startNewGame: () => void
}

const Button: React.FC<ButtonProps> = ({ startNewGame }) => {
  return (
    <div className='pixel' onClick={startNewGame}>
      <p>New Game</p>
    </div>
  )
}

export default Button
