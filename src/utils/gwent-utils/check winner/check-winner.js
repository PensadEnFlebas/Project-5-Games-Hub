//* IMPORTS

import { setGameState } from '../gameState/set-gameState'
import { cleanGems } from './clean-gems'
import { cleanScores } from './clean-scores'
import { renderDeadCardsDeck } from '../../../components/gwent-components/render-deadCards'
import { cleanBoardgame } from './clean-boardgame'
import { updateTurnIcon } from '../update-turn-icon'
import { getGameState } from '../gameState/get-gameState'

export function checkWinner() {
  const gameState = getGameState()
  console.log('checkWinner gameState: ', gameState)

  document.getElementById('gwent').classList.remove('blockedCard')

  const { player, computer } = gameState

  if (!player.passed || !computer.passed) return

  if (player.score > computer.score) {
    computer.gems -= 1
    console.log('🟦 El jugador gana la ronda')
    gameState.currentTurn = 'player'
    updateTurnIcon('player', gameState)
  } else if (computer.score > player.score) {
    player.gems -= 1
    console.log('🟥 La IA gana la ronda')
    gameState.currentTurn = 'computer'
    updateTurnIcon('computer', gameState)
  } else {
    player.gems -= 1
    computer.gems -= 1
    console.log('⚪ Ronda empatada')
  }

  for (const side of ['player', 'computer']) {
    const playerSide = gameState[side]

    for (const type of ['unit', 'special', 'boss']) {
      const played = playerSide.playedCards[type]
      playerSide.deadCards.push(...played)
      playerSide.playedCards[type] = []
    }
  }

  player.passed = false
  computer.passed = false
  player.score = 0
  computer.score = 0
  player.bossUsed = false
  computer.bossUsed = false

  gameState.battlefieldEffects = { frost: false, fog: false, rain: false }

  gameState.round += 1

  console.log(
    `🔁 Ronda ${gameState.round - 1} finalizada. Iniciando ronda ${
      gameState.round
    }`
  )

  cleanGems(player, computer)
  cleanScores(player, computer)
  renderDeadCardsDeck(gameState)
  cleanBoardgame()

  console.log('🎯 Nuevo estado guardado:', gameState)
}
