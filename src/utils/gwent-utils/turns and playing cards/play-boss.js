//* IMPORTS

import { gameState } from '../gameState/gameState-manager'
import { playSword } from '../sounds/play-sword'
import { updateScore } from '../check winner/update-score'

export function playBoss(isPlayerTurn = true) {
  const state = gameState.getState()

  if (
    (isPlayerTurn && state.playerBossUsed) ||
    (!isPlayerTurn && state.computerBossUsed)
  )
    return

  const bossPoints = [5, 10, 15, 20][Math.floor(Math.random() * 4)]

  gameState.updateState((state) => {
    const updatedState = { ...state }

    if (isPlayerTurn) {
      const updatedBoss = {
        ...updatedState.playerBoss,
        strength: bossPoints,
        baseStrength: bossPoints
      }

      updatedState.player.score += bossPoints
      updatedState.player.playedCards.boss.push(updatedBoss)
      updatedState.lastCardPlayed = updatedBoss
    } else {
      const updatedBoss = {
        ...updatedState.computerBoss,
        strength: bossPoints,
        baseStrength: bossPoints
      }

      updatedState.computer.score += bossPoints
      updatedState.computer.playedCards.boss.push(updatedBoss)
      updatedState.lastCardPlayed = updatedBoss
    }

    if (isPlayerTurn) {
      updatedState.playerBossUsed = true
    } else {
      updatedState.computerBossUsed = true
    }

    playSword()
    updateScore('player')
    updateScore('computer')

    return updatedState
  })
}
