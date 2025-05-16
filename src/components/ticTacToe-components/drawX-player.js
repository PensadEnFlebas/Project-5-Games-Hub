//*IMPORTS

import { gameStatus } from '../../layouts/main/tic-tac-toe'
import {
  checkWinner,
  getWinnerCombo
} from '../../utils/ticTacToe-utils/check-winner'
import { getScores } from '../../utils/ticTacToe-utils/scores/get-scores'
import { printScores } from '../../utils/ticTacToe-utils/scores/print-scores'
import { saveScores } from '../../utils/ticTacToe-utils/scores/save-scores'
import { updateScores } from '../../utils/ticTacToe-utils/scores/update-scores'
import { highlightForWinner } from './highlight-for-winner'
import { playMarkSound } from '../../utils/ticTacToe-utils/sounds/play-markSound'
import { playWinnerSound } from '../../utils/ticTacToe-utils/sounds/play-winnerSound'

export function drawX(target, turn, computerMove) {
  target.addEventListener(
    'click',
    () => {
      if (
        !gameStatus.gameOver &&
        !target.classList.contains('xMark') &&
        !target.classList.contains('oMark')
      ) {
        target.classList.add('xMark')
        playMarkSound()

        const winner = checkWinner()

        if (winner) {
          const combo = winner === 'draw' ? [] : getWinnerCombo()
          highlightForWinner(combo)

          if (combo.length) {
            playWinnerSound()
          }
          updateScores(winner)
          saveScores(getScores())

          const playerScore = document.querySelector('.tttScorePlayer')
          const computerScore = document.querySelector('.tttScoreComputer')
          const drawScore = document.querySelector('.tttScoreDraw')
          printScores({ playerScore, computerScore, drawScore })

          gameStatus.gameOver = true
          return
        }

        turn.isMyTurn = !turn.isMyTurn
        document.body.style.cursor = 'wait'
        document.querySelectorAll('.tttBox').forEach((box) => {
          box.style.cursor = 'wait'
        })

        setTimeout(() => {
          if (!gameStatus.gameOver) {
            computerMove()
          }
          document.body.style.cursor = 'default'
          document.querySelectorAll('.tttBox').forEach((box) => {
            box.style.cursor = 'pointer'
          })
        }, 1000)
      }
    },
    { once: true }
  )
}
