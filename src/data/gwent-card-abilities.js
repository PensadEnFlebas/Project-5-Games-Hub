//* IMPORTS

import { gameState } from '../utils/gwent-utils/gameState/gameState-manager'
import {
  northernRealmsList,
  monstersList,
  neutralCardsList
} from './gwent-lists'
import { updateScore } from '../utils/gwent-utils/check winner/update-score'
import { getPlayedCards } from '../utils/gwent-utils/card manager/get-played-cards'
import { drawCards } from '../utils/gwent-utils/card decks/draw-cards'
import { renderPlayerHand } from '../utils/gwent-utils/card decks/render-player-hand'
import { renderCard } from '../components/gwent-components/render-card'
import { updateCardsLeft } from '../utils/gwent-utils/card decks/update-cardsLeft'
import { adjustCardStack } from '../utils/gwent-utils/card decks/adjust-card-stack'
import { getCellLocation } from '../utils/gwent-utils/get-cell-location'
import { renderDeadCardsDeck } from '../components/gwent-components/render-deadCards'
import { renderRemainingCardsDeck } from '../components/gwent-components/render-and-update-remainingCards'
import { renderMedicMulligan } from '../components/gwent-components/render-medic-mulligan'
import { renderDecoyMulligan } from '../components/gwent-components/render-decoy-mulligan'
import { playRevivedCard } from '../utils/gwent-utils/turns and playing cards/play-revived-card'
import { playCard } from '../utils/gwent-utils/sounds/play-card'
import { playBurning } from '../utils/gwent-utils/sounds/play-burning'
import { playWeatherEffect } from '../utils/gwent-utils/sounds/play-weather-effect'
import { playBird } from '../utils/gwent-utils/sounds/play-bird'

export const cardAbilities = {
  morale,
  bond,
  spy,
  medic,
  muster,
  agile,
  decoy,
  horn,
  dandelionHorn,
  scorch,
  dragonScorch,
  frost,
  fog,
  rain,
  sun
}

export function agile() {
  console.log('🚫 agile ability already implemented')
}

export function morale(card) {
  const row = card.cellLocation.split(':')[0]

  const cardsInRow = getPlayedCards().filter((rowCard) =>
    rowCard.cellLocation.includes(row)
  )

  const types = ['unit', 'boss', 'special']

  cardsInRow.forEach((rowCard) => {
    const alreadyAffected = rowCard.affectedBy.includes(card.id)
    const isHero = rowCard.type.includes('hero')
    const isSameCard = rowCard.id === card.id

    if (!alreadyAffected && !isHero && !isSameCard) {
      rowCard.strength += 1
      rowCard.affectedBy.push(card.id)

      const rowCardType = rowCard.type.find((el) => types.includes(el))

      gameState.updateCard(rowCard, rowCard.owner, rowCardType)
    }
  })

  updateScore(card.owner)
}

export function bond(card) {
  const row = card.cellLocation.split(':')[0]

  const cardsInRow = getPlayedCards().filter(
    (rowCard) =>
      rowCard.cellLocation.includes(row) &&
      rowCard.name === card.name &&
      rowCard.ability?.includes('bond')
  )

  if (cardsInRow.length > 1) {
    const multiplier = 2 ** (cardsInRow.length - 1)

    cardsInRow.forEach((bondCard) => {
      const alreadyAffected = bondCard.affectedBy.includes(card.id)
      const isHero = bondCard.type.includes('hero')

      if (!alreadyAffected && !isHero) {
        bondCard.strength = bondCard.baseStrength * multiplier
        bondCard.affectedBy.push(card.id)

        const cardType = bondCard.type.find((t) =>
          ['unit', 'boss', 'special'].includes(t)
        )

        gameState.updateCard(bondCard, bondCard.owner, cardType)
      }
    })

    updateScore(card.owner)
  }
}

export function spy(card) {
  const state = gameState.getState()
  const currentTurn = state.currentTurn
  const cardType = card.type[0]

  const opponent = currentTurn === 'player' ? 'computer' : 'player'

  if (card.spyApplied) return

  const locationIndex = card.boardLocations.findIndex((_, i) =>
    currentTurn === 'player' ? i % 2 !== 0 : i % 2 === 0
  )
  const location = card.boardLocations[locationIndex]

  const boardCell = document.querySelector(`.${location.replace(':', '.')}`)
  if (boardCell) {
    const rendered = renderCard(card)
    boardCell.appendChild(rendered)
    adjustCardStack(boardCell)
  }

  const updatedCard = { ...card, spyApplied: true }

  // gameState.updateCard(updatedCard, currentTurn, cardType)
  gameState.updateState((state) => {
    const toOpponentPlayedCards = state[opponent].playedCards.unit
    const newState = {
      ...state,
      [opponent]: {
        ...state[opponent],
        playedCards: {
          ...state[opponent].playedCards,
          unit: [...toOpponentPlayedCards, updatedCard]
        }
      }
    }

    return newState
  })

  drawCards(currentTurn, 2)
  renderRemainingCardsDeck(gameState.getState())
  updateScore(opponent)
}

export function medic(card) {
  const state = gameState.getState()
  const currentPlayer = card.owner
  const isComputer = currentPlayer === 'computer'

  if (card.medicUsed) return
  if (state.medicMulliganActive) return

  const validDeadCards = state[currentPlayer].deadCards.filter(
    (c) => c.type.includes('unit') && !c.type.includes('hero')
  )

  if (validDeadCards.length === 0) return

  card.medicUsed = true

  if (isComputer) {
    const randomCard =
      validDeadCards[Math.floor(Math.random() * validDeadCards.length)]
    playRevivedCard(randomCard, currentPlayer)
    return
  }

  gameState.updateState((state) => {
    return { ...state, medicMulliganActive: true }
  })

  renderMedicMulligan(validDeadCards, currentPlayer)
}

export function muster(card) {
  const state = gameState.getState()
  const currentPlayer = card.owner
  const playerData = state[currentPlayer]

  const musterKeyword = getMusterKeyword(card.name)
  if (!musterKeyword) return

  const cardsToMuster = playerData.remainingCards.filter((c) =>
    c.name.toLowerCase().includes(musterKeyword)
  )

  if (cardsToMuster.length === 0) return

  const summonedCards = []

  gameState.updateState((state) => {
    const newState = { ...state }
    newState[currentPlayer].remainingCards = newState[
      currentPlayer
    ].remainingCards.filter(
      (c) => !c.name.toLowerCase().includes(musterKeyword)
    )
    return newState
  })

  cardsToMuster.forEach((musterCard) => {
    const locationIndex = musterCard.boardLocations.findIndex((_, i) =>
      currentPlayer === 'player' ? i % 2 === 0 : i % 2 !== 0
    )

    const location = musterCard.boardLocations[locationIndex]

    if (musterCard.originalBaseStrength == null) {
      musterCard.originalBaseStrength = musterCard.baseStrength
    }

    renderCard(musterCard, { location })

    musterCard.location = location
    summonedCards.push(musterCard)

    const justRendered = document.getElementById(musterCard.id)
    if (justRendered) {
      adjustCardStack(justRendered.parentElement)
    }

    const typeKey = musterCard.type.includes('boss')
      ? 'boss'
      : musterCard.type.includes('special')
      ? 'special'
      : 'unit'

    gameState.updateState((state) => {
      const newState = { ...state }
      newState[currentPlayer].playedCards[typeKey].push(musterCard)
      return newState
    })
  })

  const battlefieldEffects = gameState.getState().battlefieldEffects
  Object.keys(battlefieldEffects).forEach((effectType) => {
    if (battlefieldEffects[effectType]) {
      applyWeatherEffectsToMusteredCards(summonedCards, effectType)
    }
  })

  updateScore(currentPlayer)
}

export function decoy(card) {
  const state = gameState.getState()
  const currentPlayer = card.owner
  const isComputer = currentPlayer === 'computer'

  if (card.decoyUsed || state.decoyMulliganActive) return false

  const validTargets = (state[currentPlayer].playedCards.unit || []).filter(
    (c) => c.type.includes('unit') && !c.type.includes('hero')
  )

  if (validTargets.length === 0) {
    if (!isComputer) {
      gameState.updateState((st) => ({
        ...st,
        decoyMulliganActive: true,
        currentTurn: !currentPlayer
      }))
      renderDecoyMulligan({ validTargets, player: currentPlayer })
    }
    return false
  }

  if (!card.decoyUsed) {
    card.decoyUsed = true
  } else {
    delete card.decoyUsed
  }

  if (isComputer) {
    const randomCard =
      validTargets[Math.floor(Math.random() * validTargets.length)]

    randomCard.strength = randomCard.baseStrength

    const oldCardEl = document.getElementById(randomCard.id)
    if (oldCardEl && oldCardEl.parentElement) {
      const parent = oldCardEl.parentElement
      const location = [...parent.classList].find(
        (cls) => cls.includes('p1') || cls.includes('pc')
      )
      oldCardEl.replaceWith(renderCard(card, { location }))
      adjustCardStack(parent)
    }

    gameState.updateState((prev) => {
      const newState = structuredClone(prev)
      newState[currentPlayer].playedCards.unit = newState[
        currentPlayer
      ].playedCards.unit.map((c) => (c.id === randomCard.id ? card : c))
      newState[currentPlayer].hand.push(randomCard)
      return newState
    })

    if (currentPlayer === 'player') {
      renderPlayerHand(gameState.getState().player.hand)
    }

    updateScore(currentPlayer)
    playCard()
    return true
  }

  gameState.updateState((prev) => ({
    ...prev,
    decoyMulliganActive: true,
    selectedDecoyCard: card
  }))

  renderDecoyMulligan({
    validTargets,
    player: currentPlayer
  })

  return true
}

export function horn(card) {
  const row = card.cellLocation.split(':')[0]

  const cardsInRow = getPlayedCards().filter((rowCard) =>
    rowCard.cellLocation.includes(row)
  )

  const types = ['unit', 'boss', 'special']

  cardsInRow.forEach((rowCard) => {
    const alreadyAffected = rowCard.affectedBy.includes(card.id)
    const isHero = rowCard.type.includes('hero')

    if (!alreadyAffected && !isHero) {
      rowCard.strength *= 2
      rowCard.affectedBy.push(card.id)

      const rowCardType = rowCard.type.find((el) => types.includes(el))

      gameState.updateCard(rowCard, rowCard.owner, rowCardType)
    }
  })

  updateScore(card.owner)
}

export function dandelionHorn(card) {
  const row = card.cellLocation.split(':')[0]

  const cardsInRow = getPlayedCards().filter((rowCard) =>
    rowCard.cellLocation.includes(row)
  )

  const hornAlreadyExists = cardsInRow.some(
    (rowCard) => rowCard.ability?.includes('horn') && rowCard.id !== card.id
  )

  if (hornAlreadyExists) return

  cardsInRow.forEach((rowCard) => {
    const alreadyAffected = rowCard.affectedBy.includes(card.id)
    const isHero = rowCard.type.includes('hero')
    const isSameCard = rowCard.id === card.id

    if (!alreadyAffected && !isHero && !isSameCard) {
      rowCard.strength = rowCard.baseStrength * 2
      rowCard.affectedBy.push(card.id)

      const rowCardType = rowCard.type.find((el) =>
        ['unit', 'boss', 'special'].includes(el)
      )

      gameState.updateCard(rowCard, rowCard.owner, rowCardType)
    }
  })

  updateScore(card.owner)
}

export function scorch(cardData, currentTurn) {
  const state = gameState.getState()

  const players = ['player', 'computer']

  const allPlayedUnits = players.flatMap((player) =>
    state[player].playedCards.unit
      .filter((card) => !card.type.includes('hero'))
      .map((card) => ({ ...card, owner: player }))
  )

  if (allPlayedUnits.length === 0) return

  const maxStrength = Math.max(...allPlayedUnits.map((card) => card.strength))

  const cardsToScorch = allPlayedUnits.filter(
    (card) => card.strength === maxStrength
  )

  gameState.updateState((state) => {
    const newState = { ...state }

    cardsToScorch.forEach(({ id, owner }) => {
      const card = state[owner].playedCards.unit.find((c) => c.id === id) || {
        id
      }

      newState[owner].playedCards.unit = newState[
        owner
      ].playedCards.unit.filter((card) => card.id !== id)

      if (card) {
        newState[owner].deadCards.push({ ...card })
      }
    })

    newState[currentTurn].deadCards.push({ ...cardData })

    return newState
  })

  setTimeout(() => {
    cardsToScorch.forEach(({ id }) => {
      const cardEl = document.getElementById(id)
      if (cardEl) {
        cardEl.remove()
      }
    })
  }, 1200)

  playBurning()
}

export function dragonScorch(cardData, currentTurn) {
  const state = gameState.getState()

  const opponent = currentTurn === 'player' ? 'computer' : 'player'

  const opponentMeleeUnits = state[opponent].playedCards.unit.filter(
    (card) =>
      card.type.includes('unit') &&
      card.type.includes('melee') &&
      !card.type.includes('hero')
  )

  if (opponentMeleeUnits.length === 0) return false

  const totalStrength = opponentMeleeUnits.reduce(
    (sum, card) => sum + card.strength,
    0
  )

  if (totalStrength < 10) return false

  const maxStrength = Math.max(
    ...opponentMeleeUnits.map((card) => card.strength)
  )

  const cardsToDestroy = opponentMeleeUnits.filter(
    (card) => card.strength === maxStrength
  )

  gameState.updateState((state) => {
    const newState = { ...state }

    cardsToDestroy.forEach(({ id }) => {
      const originalCard = state[opponent].playedCards.unit.find(
        (c) => c.id === id
      )

      newState[opponent].playedCards.unit = newState[
        opponent
      ].playedCards.unit.filter((card) => card.id !== id)

      if (originalCard) {
        newState[opponent].deadCards.push({ ...originalCard })
      }
    })

    newState[currentTurn].playedCards.unit.push({ ...cardData })

    return newState
  })

  setTimeout(() => {
    cardsToDestroy.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) el.remove()
    })

    const location = cardData.boardLocations.find((loc) =>
      loc.startsWith(currentTurn === 'player' ? 'p1' : 'pc')
    )

    if (location) {
      renderCard(cardData, { location })
    }
  }, 1200)

  playBurning()

  return true
}

// ☁️ FOG
export function fog() {
  applyWeatherEffects('fog')
}

// ❄️ FROST
export function frost() {
  applyWeatherEffects('frost')
}

// 🌧️ RAIN
export function rain() {
  applyWeatherEffects('rain')
}

// ☀️ SUN
export function sun() {
  clearWeatherEffects()
  renderDeadCardsDeck(gameState.getState())
}

//? HELPING FUNCTIONS

function applyWeatherEffects(effectType) {
  const state = gameState.getState()

  if (state.battlefieldEffects[effectType]) return

  const effectMap = {
    frost: ['p1-melee:battlefield', 'pc-melee:battlefield'],
    fog: ['p1-range:battlefield', 'pc-range:battlefield'],
    rain: ['p1-siege:battlefield', 'pc-siege:battlefield']
  }

  const affectedCells = effectMap[effectType]
  const updatedState = { ...state }
  const owners = ['player', 'computer']

  owners.forEach((owner) => {
    updatedState[owner].playedCards.unit.forEach((card) => {
      const cell = card.location || getCellLocation(card.id)

      if (affectedCells.includes(cell) && !card.type.includes('hero')) {
        card.baseStrength = 1
        card.strength = 1
      }
    })
  })

  updateScore('player')
  updateScore('computer')
  playWeatherEffect()

  affectedCells.forEach((cellClass) => {
    const formattedClass = cellClass.split(':').join('.')
    const cell = document.querySelector(`.cell.${formattedClass}`)
    if (cell) cell.classList.add('weatherAffected')
  })

  gameState.updateState(() => ({
    ...updatedState,
    battlefieldEffects: {
      ...updatedState.battlefieldEffects,
      [effectType]: true
    }
  }))
}

function applyWeatherEffectsToMusteredCards(cards, effectType) {
  const effectMap = {
    frost: ['p1-melee:battlefield', 'pc-melee:battlefield'],
    fog: ['p1-range:battlefield', 'pc-range:battlefield'],
    rain: ['p1-siege:battlefield', 'pc-siege:battlefield']
  }

  const affectedCells = effectMap[effectType]

  cards.forEach((card) => {
    const cell = card.location || getCellLocation(card.id)
    if (affectedCells.includes(cell) && !card.type.includes('hero')) {
      card.baseStrength = 1
      card.strength = 1
    }
  })
}

export function clearWeatherEffects() {
  // const allCards = [...northernRealmsList, ...monstersList, ...neutralCardsList]
  const state = gameState.getState()

  if (state.weatherCleared) return

  const updatedState = { ...state }

  const allBattlefieldCells = document.querySelectorAll(
    '.cell.battlefield.weatherAffected'
  )
  allBattlefieldCells.forEach((cell) => {
    cell.classList.remove('weatherAffected')
  })

  const owners = ['player', 'computer']

  owners.forEach((owner) => {
    updatedState[owner].playedCards.unit.forEach((card) => {
      if (!card.type.includes('hero') && card.originalBaseStrength != null) {
        // const originalCard = allCards.find((c) => c.id === card.id)
        card.baseStrength = card.originalBaseStrength
        card.strength = card.originalBaseStrength
      }
    })
  })

  updateScore('player')
  updateScore('computer')
  playBird()

  owners.forEach((owner) => {
    const specials = updatedState[owner].playedCards.special
    const dead = updatedState[owner].deadCards

    const isWeatherCard = (card) =>
      ['frost', 'fog', 'rain'].some((effect) => card.ability?.includes(effect))

    const remainingSpecials = []
    specials.forEach((card) => {
      if (isWeatherCard(card)) {
        dead.push(card)
        const el = document.getElementById(card.id)
        if (el) el.remove()
      } else {
        remainingSpecials.push(card)
      }
    })

    updatedState[owner].playedCards.special = remainingSpecials
  })

  updatedState.battlefieldEffects = {
    frost: false,
    fog: false,
    rain: false
  }

  updatedState.weatherCleared = true

  gameState.updateState(() => updatedState)
}

function getMusterKeyword(name) {
  const lower = name.toLowerCase()
  const keywords = ['ghoul', 'nekker', 'vampire', 'arachas', 'crone']

  return keywords.find((kw) => lower.includes(kw))
}
