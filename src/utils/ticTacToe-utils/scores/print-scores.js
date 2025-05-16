//*IMPORTS

import { getScores } from './get-scores'

export function printScores({ playerScore, computerScore, drawScore }) {
  const scores = getScores()
  playerScore.querySelector('span').textContent = scores.player
  computerScore.querySelector('span').textContent = scores.computer
  drawScore.querySelector('span').textContent = scores.draw
}
