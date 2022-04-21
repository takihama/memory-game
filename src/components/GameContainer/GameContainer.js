import { useState, useEffect } from 'react';
import useInterval from '../../utils/utils'

import './GameContainer.css'
import cards from './cards.json'
import Card from '../Card/Card'

const StartButton = ({ text, clickHandler }) => {
  return (
    <button onClick={clickHandler} className='start-button'>{text}</button>
  )
}

const GameOver = ({ score, clickHandler }) => {
  if (score > 0) {
    return (
      <div className='game-over'>
        <p className='score'>You won</p>
        <p className='score'>{score}</p>
        <StartButton text={'Play again'} clickHandler={clickHandler} />
      </div>
    )
  }

  return (
    <div className='game-over'>
      <p className='score'>You lost</p>
      <StartButton text='Try again' clickHandler={clickHandler} />
    </div>
  )
}

const GameContainer = () => {
  const INITIAL_SCORE = 180
  const ERROR_PUNISHMENT = 5
  const MATCH_GOAL = 2

  const [gameState, setGameState] = useState({
    newGame: true,
    score: INITIAL_SCORE,
    cards: cards,
    flippedCards: [],
    matchedCards: []
  })

  const startNewGame = () => {
    let cards = gameState.cards.map(card => ({ ...card, isFlipped: false }))
    cards = shuffleCards(cards)

    setGameState({
      newGame: false,
      score: INITIAL_SCORE,
      cards: cards,
      flippedCards: [],
      matchedCards: []
    })
  }

  const gameFinished = () => {
    return (gameState.score === 0 || gameState.newGame || gameState.matchedCards.length === gameState.cards.length)
  }

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

  const canFlipCard = (id) => {
    // If the card is already flipped, return
    if (gameState.flippedCards.find(card => card.id === id)) return false

    // If the card is already matched, return
    if (gameState.matchedCards.find(card => card.id === id)) return false

    // If limit of cards flipped is reached, return
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
      setGameState(gameState => ({
        ...gameState,
        cards: gameState.cards.map(card => gameState.flippedCards.includes(card, 0) ? { ...card, isFlipped: false } : card),
        flippedCards: [],
        score: (gameState.score - ERROR_PUNISHMENT) < 0 ? 0 : (gameState.score - ERROR_PUNISHMENT)
      }))
    }
  }

  const renderCards = (cards) => {
    return cards.map(card => (
      <Card key={card.id} isFlipped={card.isFlipped} clickHandler={() => flipCard(card.id)} color={card.color} />
    ))
  }

  // Stop timer if game ended or game didn't started
  const delay = gameFinished() ? null : 1000
  useInterval(() => {
    setGameState(gameState => ({
      ...gameState,
      score: gameState.score === 0 ? 0 : gameState.score - 1
    }))
  }, delay)

  // After render and some time, check if the selected cards match
  useEffect(() => {
    setTimeout(() => {
      checkMatchingCards(gameState.flippedCards)
    }, 900)
  }, [gameState.flippedCards])

  if (gameState.newGame) {
    return (
      <div className='game-container'>
        <StartButton text='New game' clickHandler={startNewGame} />
      </div>
    )
  }
  
  if (gameFinished()) {
    return (
      <div className='game-container'>
        <GameOver score={gameState.score} clickHandler={startNewGame} /> :
      </div>
    )
  }

  return (
    <div className='game-container'>
      <div className='statistics-container'>
        <div className='score'>
          Score: {gameState.score}
        </div>
      </div>
      <div className='card-container'>
        {renderCards(gameState.cards)}
      </div>
    </div>
  )
}

export default GameContainer