import { gameState } from '../gameState/gameState-manager'

export function updateCardsLeft(location) {
  if (!location || typeof location !== 'string') return

  const isPlayer = location.includes('p1')
  const isComputer = location.includes('pc')

  let playerKey
  let rowClass

  if (isPlayer) {
    playerKey = 'player'
    rowClass = 'p1-range'
  } else if (isComputer) {
    playerKey = 'computer'
    rowClass = 'pc-range'
  } else {
    return
  }

  const currentState = gameState.getState()
  const cardsLeft = currentState[playerKey].hand.length

  const cell = document.querySelector(`.cell.${rowClass}.special-cards`)

  const cardsLeftText = cell.querySelector('.cardsLeftText')
  if (cardsLeftText) {
    cardsLeftText.textContent = `Cards left: ${cardsLeft}`
  }
}
