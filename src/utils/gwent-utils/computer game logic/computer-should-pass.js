export function computerShouldPass(gameState) {
  const { player, computer } = gameState
  const cardsLeft = computer.hand.length
  const scoreDifference = player.score - computer.score

  return (
    cardsLeft === 0 ||
    (player.passed && computer.score > player.score) ||
    (scoreDifference >= 16 && computer.gems === 2)
  )
}
