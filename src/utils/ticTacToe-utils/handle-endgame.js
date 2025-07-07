//* IMPORTS

import { getWinnerCombo } from './check-winner'
import { highlightForWinner } from '../../components/ticTacToe-components/highlight-for-winner'
import { playWinnerSound } from './sounds/play-winnerSound'
import { updateScores } from './scores/update-scores'
import { getScores } from './scores/get-scores'
import { saveScores } from './scores/save-scores'
import { printScores } from './scores/print-scores'
import { gameStatus } from '../../layouts/main/tic-tac-toe'

export function handleEndGame(winner) {
  const combo = winner === 'draw' ? [] : getWinnerCombo()
  highlightForWinner(combo)

  if (combo.length) playWinnerSound()

  updateScores(winner)
  saveScores(getScores())

  const playerScore = document.querySelector('.tttScorePlayer')
  const computerScore = document.querySelector('.tttScoreComputer')
  const drawScore = document.querySelector('.tttScoreDraw')
  printScores({ playerScore, computerScore, drawScore })

  gameStatus.gameOver = true
}
