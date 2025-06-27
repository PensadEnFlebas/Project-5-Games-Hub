//* IMPORTS

import { gameState } from '../gameState/gameState-manager'
import { getCellLocation } from '../get-cell-location'

export function getPlayedCards() {
  const state = gameState.getState()

  const playerUnits =
    Object.entries(state?.player?.playedCards).reduce(
      (accumulator, [key, value]) => [...accumulator, ...value],
      []
    ) || []
  const computerUnits =
    Object.entries(state?.computer?.playedCards).reduce(
      (accumulator, [key, value]) => [...accumulator, ...value],
      []
    ) || []

  const allCards = [...playerUnits, ...computerUnits].map((card) => {
    const cellLocation = getCellLocation(card.id) || ''
    return {
      ...card,
      owner: playerUnits.some((playedCard) => playedCard.id === card.id)
        ? 'player'
        : 'computer',
      cellLocation
    }
  })

  return allCards
}
