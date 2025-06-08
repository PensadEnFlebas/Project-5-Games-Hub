import { gameState } from '../gameState/gameState-manager'

export function computerShouldPass() {
  const state = gameState.getState()
  const { player, computer } = state
  const cardsLeft = computer.hand.length
  const scoreDifference = player.score - computer.score

  const shouldPass =
    cardsLeft === 0 ||
    (player.passed && computer.score > player.score) ||
    (scoreDifference >= 16 && computer.gems === 2)
  return shouldPass
}
