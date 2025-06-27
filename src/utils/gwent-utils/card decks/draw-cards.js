//* IMPORTS

import { gameState } from '../gameState/gameState-manager'

export function drawCards(owner, count) {
  const state = gameState.getState()

  if (!state[owner]) {
    console.error(
      `drawCards: no existe el owner "${owner}" en el estado`,
      state
    )
    return []
  }

  const deck = state[owner].remainingCards
  if (!Array.isArray(deck)) {
    console.error(
      `drawCards: remainingCards no es un array para "${owner}"`,
      deck
    )
    return []
  }

  const shuffledDeck = [...deck].sort(() => Math.random() - 0.5)
  const drawn = shuffledDeck.slice(0, count)

  const updatedDeck = deck.filter((card) => !drawn.includes(card))
  const updatedHand = [...state[owner].hand, ...drawn]

  gameState.updateState((prev) => ({
    ...prev,
    [owner]: {
      ...prev[owner],
      hand: updatedHand,
      remainingCards: updatedDeck
    }
  }))

  return drawn
}
