//* IMPORTS

import { updateTurnIcon } from '../update-turn-icon'

export function changeTurn() {
  const gameState = JSON.parse(localStorage.getItem('gwentGameState'))
  if (!gameState) return

  gameState.currentTurn =
    gameState.currentTurn === 'player' ? 'computer' : 'player'

  updateTurnIcon(gameState.currentTurn, gameState)

  localStorage.setItem('gwentGameState', JSON.stringify(gameState))
}
