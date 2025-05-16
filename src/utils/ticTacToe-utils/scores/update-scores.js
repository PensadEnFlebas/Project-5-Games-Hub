//*IMPORTS

import { getScores } from './get-scores'
import { saveScores } from './save-scores'

export function updateScores(winner) {
  const scores = getScores()

  if (winner === 'x') scores.player++
  else if (winner === 'o') scores.computer++
  else if (winner === 'draw') scores.draw++

  saveScores(scores)
}
