//* IMPORTS

import { endGameMessage } from '../../../components/gwent-components/end-game-message'
import { gameState } from '../gameState/gameState-manager'

export function endGame() {
  const state = gameState.getState()

  if (state.computer.gems === 0) {
    console.log('🟦 El jugador GANA LA PARTIDA')
    endGameMessage('PLAYER')
    return
  } else if (state.player.gems === 0) {
    console.log('🟥 La computer GANA LA PARTIDA')
    endGameMessage('COMPUTER')
    return
  }
}
