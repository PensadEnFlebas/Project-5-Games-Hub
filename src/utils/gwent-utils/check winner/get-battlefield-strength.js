//* IMPORTS

import { gameState } from '../gameState/gameState-manager'

export function getBattlefieldStrength(row) {
  const battlefieldCell = document.querySelector(`.cell.${row}.battlefield`)
  const cardsElements = battlefieldCell.querySelectorAll('.gwentCard')

  let totalStrength = 0
  const state = gameState.getState()

  cardsElements.forEach((cardEl) => {
    const cardId = cardEl.id
    const cardData = state.computer.deck.find((c) => c.id === cardId)

    if (cardData) {
      totalStrength += cardData.strength
    }
  })

  return totalStrength
}
