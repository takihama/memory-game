import './GameContainer.css'
import Card from '../Card/Card'

import { useState } from 'react';

const GameContainer = () => {
  const [gameState, setGameState] = useState({
    cards: [{
      id: 1,
      isFlipped: false
    },
    {
      id: 2,
      isFlipped: true
    },
    {
      id: 3,
      isFlipped: false
    }]
  })

  const flipCard = (id) => {
    setGameState({
      ...gameState,
      cards: gameState.cards.map(card => (card.id === id ? { id: id, isFlipped: !card.isFlipped } : card
      ))
    })
  }

  const renderCards = (cards) => {
    return cards.map(card => {
      return <Card key={card.id} text={card.id} isFlipped={card.isFlipped} clickHandler={() => flipCard(card.id)} />
    })
  }

  return (
    <div className='game-container'>
      {renderCards(gameState.cards)}
    </div>
  )
}

export default GameContainer