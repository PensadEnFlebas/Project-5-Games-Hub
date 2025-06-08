import { gameState } from '../gameState/gameState-manager'

export function updateScore(location, strength) {
  if (typeof strength !== 'number' || isNaN(strength)) {
    return
  }

  const isPlayer = location.includes('p1')
  const isComputer = location.includes('pc')

  let playerKey
  let rowClass

  if (isPlayer) {
    gameState.updateState((state) => ({
      ...state,
      player: {
        ...state.player,
        score: state.player.score + strength
      }
    }))
    playerKey = 'player'
    rowClass = 'p1-range'
  } else if (isComputer) {
    gameState.updateState((state) => ({
      ...state,
      computer: {
        ...state.computer,
        score: state.computer.score + strength
      }
    }))
    playerKey = 'computer'
    rowClass = 'pc-range'
  } else {
    return
  }

  const cell = document.querySelector(`.cell.${rowClass}.special-cards`)
  const playerText = cell.querySelector('.playerText')

  if (playerText) {
    const name = playerKey === 'player' ? 'PLAYER' : 'COMPUTER'
    const currentState = gameState.getState()
    playerText.textContent = `${name}: ${currentState[playerKey].score}`
  }
}
