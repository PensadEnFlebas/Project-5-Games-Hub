import { renderCard } from '../../../components/gwent-components/render-card'
import { renderPlayerHand } from '../card decks/render-player-hand'
import { playCard } from '../sounds/play-card'
import { updateScore } from '../check winner/update-score'
import { updateCardsLeft } from '../card decks/update-cardsLeft'
import { adjustCardStack } from '../card decks/adjust-card-stack'
import { gameState } from '../gameState/gameState-manager'

export function playingCard(cardData, indexCardInHand, targetCell = null) {
  const state = gameState.getState()

  console.log(state.computer.score)
  console.log(state.player.score)

  const currentTurn = state.currentTurn
  const currentPlayer = state[currentTurn]
  const isPlayer = currentTurn === 'player'

  if (cardData.boardLocations.length === 0) {
    // CONSOLE.LOG PARA ELIMINAR AL FINAL, CUANDO SE COMPLETE ESTA PARTE
    console.info(
      `La carta "${cardData.name}" no tiene ubicación. Es una carta especial.`
    )

    // PONER AQUÍ LA LÓGICA DE LAS SPECIAL-cardDataS QUE SE ELIMINAN TRAS JUGARLAS: por ejemplo: if (cardData.effect === 'clearWeather') { ... }

    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentTurn].hand.splice(indexCardInHand, 1)
      newState.lastCardPlayed = cardData
      return newState
    })

    if (isPlayer) {
      renderPlayerHand(gameState.player.hand)
    }

    return
  }

  let location = null
  if (!targetCell) {
    const locationIndex = cardData.boardLocations.findIndex((_, i) =>
      isPlayer ? i % 2 === 0 : i % 2 !== 0
    )

    location = cardData.boardLocations[locationIndex]
  }

  gameState.updateState((state) => {
    const newState = { ...state }
    newState[currentTurn].hand.splice(indexCardInHand, 1)
    return newState
  })

  if (isPlayer) {
    const updatedState = gameState.getState()
    renderPlayerHand(updatedState.player.hand)
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

  updateScore(location, cardData.strength)
  updateCardsLeft(location)

  const typeKey = cardData.type.includes('boss')
    ? 'boss'
    : cardData.type.includes('special')
    ? 'special'
    : 'unit'

  gameState.updateState((state) => {
    const newState = { ...state }
    newState[currentTurn].playedCards[typeKey].push(cardData)
    newState.lastCardPlayed = cardData
    return newState
  })
}
