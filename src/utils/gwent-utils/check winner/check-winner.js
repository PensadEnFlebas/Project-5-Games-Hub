import { cleanGems } from './clean-gems'
import { cleanScores } from './clean-scores'
import { renderDeadCardsDeck } from '../../../components/gwent-components/render-deadCards'
import { cleanBoardgame } from './clean-boardgame'
import { updateTurnIcon } from '../update-turn-icon'
import { gameState } from '../gameState/gameState-manager'
import { handleTurn } from '../turns and playing cards/handle-turns'
import { endGame } from './end-game'

export function checkWinner() {
  const state = gameState.getState()

  document.getElementById('gwent').classList.remove('blockedCard')

  const { player, computer } = state

  if (!player.passed || !computer.passed) return

  gameState.updateState((currentState) => {
    const newState = { ...currentState }

    if (player.score > computer.score) {
      newState.computer.gems -= 1
      console.log('🟦 El jugador gana la ronda')

      newState.currentTurn = 'player'
      updateTurnIcon('player')
    } else if (computer.score > player.score) {
      newState.player.gems -= 1
      console.log('🟥 La IA gana la ronda')
      newState.currentTurn = 'computer'
      updateTurnIcon('computer')
    } else {
      newState.player.gems -= 1
      newState.computer.gems -= 1
      console.log('⚪ Ronda empatada')

      newState.currentTurn = currentState.currentTurn || 'player'
      updateTurnIcon(newState.currentTurn)
    }

    const allBattlefieldCells = document.querySelectorAll(
      '.cell.battlefield.weatherAffected'
    )
    allBattlefieldCells.forEach((cell) => {
      cell.classList.remove('weatherAffected')
    })

    endGame()

    for (const side of ['player', 'computer']) {
      const playerSide = newState[side]

      for (const type of ['unit', 'special', 'boss']) {
        const played = playerSide.playedCards[type]
        playerSide.deadCards.push(...played)
        playerSide.playedCards[type] = []
      }
    }

    newState.player.passed = false
    newState.computer.passed = false
    newState.player.score = 0
    newState.computer.score = 0
    newState.player.bossUsed = false
    newState.computer.bossUsed = false

    newState.battlefieldEffects = { frost: false, fog: false, rain: false }
    newState.round += 1

    return newState
  })

  const updatedState = gameState.getState()
  cleanGems(updatedState.player, updatedState.computer)
  cleanScores(updatedState.player, updatedState.computer)
  renderDeadCardsDeck(updatedState)
  cleanBoardgame()

  handleTurn()
}
