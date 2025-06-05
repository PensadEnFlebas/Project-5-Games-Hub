//* IMPORTS

import { renderCard } from '../../../components/gwent-components/render-card'
import { renderPlayerHand } from '../card decks/render-player-hand'
import { playCard } from '../sounds/play-card'
import { updateScore } from '../check winner/update-score'
import { updateCardsLeft } from '../card decks/update-cardsLeft'
import { adjustCardStack } from '../card decks/adjust-card-stack'
import { getGameState } from '../gameState/get-gameState'
import { setGameState } from '../gameState/set-gameState'

export function playingCard(
  cardData,
  indexCardInHand,
  gameState,
  targetCell = null
) {
  console.log(gameState.computer.score)
  console.log(gameState.player.score)

  const currentTurn = gameState.currentTurn
  const currentPlayer = gameState[currentTurn]
  const isPlayer = currentTurn === 'player'

  if (cardData.boardLocations.length === 0) {
    // CONSOLE.LOG PARA ELIMINAR AL FINAL, CUANDO SE COMPLETE ESTA PARTE
    console.info(
      `La carta "${cardData.name}" no tiene ubicación. Es una carta especial.`
    )

    // PONER AQUÍ LA LÓGICA DE LAS SPECIAL-cardDataS QUE SE ELIMINAN TRAS JUGARLAS: por ejemplo: if (cardData.effect === 'clearWeather') { ... }

    currentPlayer.hand.splice(indexCardInHand, 1)

    if (isPlayer) {
      renderPlayerHand(gameState.player.hand)
    }

    gameState.lastCardPlayed = cardData

    return
  }

  let location = null
  if (!targetCell) {
    const locationIndex = cardData.boardLocations.findIndex((_, i) =>
      isPlayer ? i % 2 === 0 : i % 2 !== 0
    )

    location = cardData.boardLocations[locationIndex]
  }

  currentPlayer.hand.splice(indexCardInHand, 1)

  if (isPlayer) {
    renderPlayerHand(gameState.player.hand)
  }

  if (targetCell) {
    const rendered = renderCard(cardData)
    targetCell.appendChild(rendered)

    adjustCardStack(targetCell)

    location = [...targetCell.classList].find(
      (cls) => cls.includes('p1') || cls.includes('pc')
    )
  } else {
    renderCard(cardData, { location })
  }

  playCard()

  const prevLastCard = document.querySelector('.lastCardPlayed')
  if (prevLastCard) {
    prevLastCard.classList.remove('lastCardPlayed')
  }

  if (!cardData.type.includes('boss')) {
    const justPlayed = document.getElementById(cardData.id)
    if (justPlayed) {
      justPlayed.classList.add('lastCardPlayed')
    }
  }

  updateScore(location, cardData.strength, gameState)
  updateCardsLeft(location, gameState)

  const typeKey = cardData.type.includes('boss')
    ? 'boss'
    : cardData.type.includes('special')
    ? 'special'
    : 'unit'

  currentPlayer.playedCards[typeKey].push(cardData)

  gameState.lastCardPlayed = cardData

  setGameState(gameState)
}
