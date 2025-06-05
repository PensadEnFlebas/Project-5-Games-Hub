export function cleanScores(player, computer) {
  const playerScoreText = document.querySelector('.p1-range .playerText')
  const computerScoreText = document.querySelector('.pc-range .playerText')

  if (playerScoreText) playerScoreText.textContent = `Player: ${player.score}`
  if (computerScoreText)
    computerScoreText.textContent = `Computer: ${computer.score}`
}
