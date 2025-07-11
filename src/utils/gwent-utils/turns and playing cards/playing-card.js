//* IMPORTS

import { renderCard } from '../../../components/gwent-components/render-card'
import { renderPlayerHand } from '../card decks/render-player-hand'
import { playCard } from '../sounds/play-card'
import { updateTurnIcon } from '../update-turn-icon'
import { updateScore } from '../check winner/update-score'
import { updateCardsLeft } from '../card decks/update-cardsLeft'
import { adjustCardStack } from '../card decks/adjust-card-stack'
import { gameState } from '../gameState/gameState-manager'
import {
  cardAbilities,
  spy,
  medic,
  decoy,
  scorch,
  dragonScorch,
  sun,
  frost,
  fog,
  rain
} from '../../../data/gwent-card-abilities'
import { applyAbilitiesToPlayedCards } from '../card manager/apply-abilities-to-played-card'
import { renderRemainingCardsDeck } from '../../../components/gwent-components/render-and-update-remainingCards'
import { renderDeadCardsDeck } from '../../../components/gwent-components/render-deadCards'

export function playingCard(cardData, indexCardInHand, targetCell = null) {
  const state = gameState.getState()

  const currentTurn = state.currentTurn
  const currentPlayer = state[currentTurn]
  const isPlayer = currentTurn === 'player'

  //! SCORCH ABILITY

  if (cardData.ability?.includes('scorch')) {
    scorch(cardData, currentTurn)

    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentTurn].hand.splice(indexCardInHand, 1)
      newState.lastCardPlayed = cardData
      return newState
    })

    if (isPlayer) {
      renderPlayerHand(gameState.getState().player.hand)
    }

    updateScore('player')
    updateScore('computer')
    playCard()
    renderDeadCardsDeck(state)
    updateLastCardPlayedText(cardData)

    return
  }

  //! DRAGONSCORCH ABILITY

  if (cardData.ability?.includes('dragonScorch')) {
    const used = dragonScorch(cardData, currentTurn)

    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentTurn].hand.splice(indexCardInHand, 1)
      newState.lastCardPlayed = cardData
      return newState
    })

    if (isPlayer) {
      renderPlayerHand(gameState.getState().player.hand)
    }

    updateScore('player')
    updateScore('computer')
    playCard()
    renderDeadCardsDeck(state)

    if (used) {
      updateLastCardPlayedText(cardData)
      return
    }
  }

  //! SPY ABILITY

  cardData.owner = currentTurn

  if (cardData.ability?.includes('spy')) {
    spy(cardData)

    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentTurn].hand.splice(indexCardInHand, 1)
      newState.lastCardPlayed = cardData
      return newState
    })

    if (isPlayer) {
      renderPlayerHand(gameState.getState().player.hand)
      playCard()
    }

    updateLastCardPlayedText(cardData)
    return
  }

  //! DECOY ABILITY

  if (cardData.ability?.includes('decoy')) {
    const decoySuccessful = decoy(cardData)

    if (!decoySuccessful) return

    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentTurn].hand.splice(indexCardInHand, 1)
      newState.lastCardPlayed = cardData
      return newState
    })

    if (isPlayer) {
      renderPlayerHand(gameState.getState().player.hand)
    }

    updateLastCardPlayedText(cardData)
    return
  }

  //! MEDIC ABILITY

  if (cardData.ability?.includes('medic')) {
    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentTurn].hand.splice(indexCardInHand, 1)
      return newState
    })

    if (isPlayer) {
      renderPlayerHand(gameState.getState().player.hand)
      playCard()
    }

    const locationIndex = cardData.boardLocations.findIndex((_, i) =>
      isPlayer ? i % 2 === 0 : i % 2 !== 0
    )
    const location = cardData.boardLocations[locationIndex]
    renderCard(cardData, { location })

    const justRendered = document.getElementById(cardData.id)
    if (justRendered) {
      adjustCardStack(justRendered.parentElement)
    }

    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentTurn].playedCards.unit.push(cardData)
      newState.lastCardPlayed = cardData
      return newState
    })

    updateScore(currentTurn)
    updateCardsLeft(location)

    medic(cardData)
    playCard()
    updateLastCardPlayedText(cardData)
    return
  }

  //! REGULAR CARDS

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

  const typeKey = cardData.type.includes('boss')
    ? 'boss'
    : cardData.type.includes('special')
    ? 'special'
    : 'unit'

  gameState.updateState((state) => {
    const newState = { ...state }
    newState[currentTurn].playedCards[typeKey].push(cardData)
    newState.lastCardPlayed = cardData
    if (!cardData.originalBaseStrength) {
      cardData.originalBaseStrength = cardData.baseStrength
    }

    return newState
  })

  //! REST OF ABILITIES

  const weatherEffectsMap = {
    sun,
    fog,
    rain,
    frost
  }

  if (cardData.ability in weatherEffectsMap) {
    weatherEffectsMap[cardData.ability]()
  }

  const weatherEffects = gameState.getState().battlefieldEffects
  const weatherMap = {
    frost: ['p1-melee:battlefield', 'pc-melee:battlefield'],
    fog: ['p1-range:battlefield', 'pc-range:battlefield'],
    rain: ['p1-siege:battlefield', 'pc-siege:battlefield']
  }

  Object.entries(weatherMap).forEach(([effect, cells]) => {
    if (
      weatherEffects[effect] &&
      cells.includes(location) &&
      !cardData.type.includes('hero')
    ) {
      cardData.baseStrength = 1
      cardData.strength = 1
    }
  })

  if (
    !cardData.ability?.includes('spy') &&
    !cardData.ability?.includes('medic') &&
    !cardData.ability?.includes('decoy') &&
    !cardData.ability?.includes('scorch') &&
    !cardData.ability?.includes('dragonScorch')
  ) {
    applyAbilitiesToPlayedCards()
  }
  updateScore(currentTurn)
  updateCardsLeft(location)

  const fullState = gameState.getState()

  if (currentTurn === 'player') {
    renderRemainingCardsDeck({
      player: fullState.player
    })
  } else {
    renderRemainingCardsDeck({
      computer: fullState.computer
    })
  }

  updateLastCardPlayedText(cardData)
}

//? HELPING FUNCTIONS

function updateLastCardPlayedText(card) {
  const cardTextEl = document.querySelector('.gwentLastCardPlayedText')
  const playerName =
    gameState.getState().currentTurn === 'player' ? 'You' : 'Computer'
  if (card && cardTextEl) {
    cardTextEl.innerHTML = `<span>Last card played:</span> ${card.name} <span>by</span> ${playerName}`
  }
}
