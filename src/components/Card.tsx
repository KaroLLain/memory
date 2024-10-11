import React from 'react'
import { CardType } from './Setup'
import '../styles/Card.scss'

type Props = {
  card: CardType
  callback: (card: CardType) => void
}

const Card: React.FC<Props> = ({ card, callback }) => {
  const handleClick = () => {
    if (card.clickable) callback(card)
  }

  return (
    <div
      className={`wrapper ${card.flipped ? 'flipped' : 'initial'}`}
      onClick={handleClick}
    >
      <div className='card__content'>
        <div className='card__face front'>
          <img className='card__image' src={card.frontImage} alt='card-front' />
        </div>
        <div className='card__face back'>
          <img className='card__image' src={card.backImage} alt='card-back' />
        </div>
      </div>
    </div>
  )
}

export default Card
