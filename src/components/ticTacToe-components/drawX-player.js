//*IMPORTS

import { gameStatus } from '../../layouts/main/tic-tac-toe'
import { checkWinner } from '../../utils/ticTacToe-utils/check-winner'
import { playMarkSound } from '../../utils/ticTacToe-utils/sounds/play-markSound'
import { handleEndGame } from '../../utils/ticTacToe-utils/handle-endgame'
import { toggleBoxes } from '../../utils/ticTacToe-utils/enable-and-disable-board-pointer-events'

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
          handleEndGame(winner)
          return
        }

        turn.isMyTurn = !turn.isMyTurn
        document.body.style.cursor = 'wait'
        toggleBoxes(true)
        // document.querySelectorAll('.tttBox').forEach((box) => {
        //   box.style.cursor = 'wait'
        // })

        setTimeout(() => {
          if (!gameStatus.gameOver) {
            computerMove()
          }
          document.body.style.cursor = 'default'
          toggleBoxes(false)
          // document.querySelectorAll('.tttBox').forEach((box) => {
          //   box.style.cursor = 'pointer'
          // })
        }, 1000)
      }
    },
    { once: true }
  )
}
