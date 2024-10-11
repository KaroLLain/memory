import React from 'react'
import '../styles/DifficultySelector.scss'

interface DifficultySelectorProps {
  difficulty: string
  setDifficulty: (difficulty: string) => void
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  setDifficulty
}) => {
  return (
    <div className='difficultySelector'>
      <label className='difficultySelector__label'>
        Level:
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
      </label>
    </div>
  )
}

export default DifficultySelector
