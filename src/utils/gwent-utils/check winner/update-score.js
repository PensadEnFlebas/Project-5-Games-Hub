//* IMPORTS

import { getGameState } from '../gameState/get-gameState'
import { setGameState } from '../gameState/set-gameState'

export function updateScore(location, strength, gameState) {
  if (typeof strength !== 'number' || isNaN(strength)) {
    return
  }

  const isPlayer = location.includes('p1')
  const isComputer = location.includes('pc')

  let playerKey
  let rowClass

  if (isPlayer) {
    gameState.player.score += strength
    playerKey = 'player'
    rowClass = 'p1-range'
  } else if (isComputer) {
    gameState.computer.score += strength
    playerKey = 'computer'
    rowClass = 'pc-range'
  } else {
    return
  }

  const cell = document.querySelector(`.cell.${rowClass}.special-cards`)
  const playerText = cell.querySelector('.playerText')

  if (playerText) {
    const name = playerKey === 'player' ? 'PLAYER' : 'COMPUTER'
    playerText.textContent = `${name}: ${gameState[playerKey].score}`
  }
}
