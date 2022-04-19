import './GameContainer.css'
import Card from '../Card/Card'
import cards from './cards.json'

import { useState } from 'react';

const GameContainer = () => {
  const MATCH_GOAL = 2

  // Fisher-Yates shuffle algorithm
  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    return cards
  }

  const [gameState, setGameState] = useState(
    {
      cards: shuffleCards(cards),
      canFlipCard: true,
      flippedCards: [],
      matchedCards: []
    })

  const canFlipCard = (id) => {
    // IF the game doesn't allow to click, return
    if (!gameState.canFlipCard) return false

    // If the card is already flipped, return
    if (gameState.flippedCards.find(card => card.id === id)) return false

    // If the card is already matched, return
    if (gameState.matchedCards.find(card => card.id === id)) return false

    if (gameState.flippedCards.length === MATCH_GOAL) return false

    return true
  }

  const flipCard = (id) => {
    if (!canFlipCard(id)) return

    // Find card to flip
    const cardToFlip = gameState.cards.find(card => card.id === id)
    cardToFlip.isFlipped = !cardToFlip.isFlipped

    setGameState({
      ...gameState,
      cards: gameState.cards.map(card => (card.id === cardToFlip.id ? cardToFlip : card)),
      flippedCards: gameState.flippedCards.concat(cardToFlip)
    })
  }

  const checkMatchingCards = (cards) => {
    if (!cards) return

    const cardsMatch = cards.every(card => card.color === cards[0].color)

    // If cards match and reach number of cards to match
    if (cardsMatch && cards.length === MATCH_GOAL) {
      setGameState({
        ...gameState,
        flippedCards: [],
        matchedCards: gameState.matchedCards.concat(cards),
      })
    }
    // If cards doesn't match, clean flippedCards
    else if (!cardsMatch && cards.length >= 2) {
      setGameState({
        ...gameState,
        cards: gameState.cards.map(card => gameState.flippedCards.includes(card, 0) ? { ...card, isFlipped: false } : card),
        flippedCards: [],
      })
      console.log(cards)
    }
  }

  const renderCards = (cards) => {
    return cards.map(card => (
      <Card key={card.id} text={card.id} isFlipped={card.isFlipped} clickHandler={() => flipCard(card.id)} color={card.color} />
    ))
  }

  setTimeout(() => {
    checkMatchingCards(gameState.flippedCards)
  }, 1000)

  return (
    <div className='game-container'>
      {renderCards(gameState.cards)}
    </div>
  )
}

export default GameContainer