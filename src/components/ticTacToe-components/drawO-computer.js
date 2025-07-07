//* IMPORTS

import { winnerCombos, gameStatus } from '../../layouts/main/tic-tac-toe'
import { getMark } from '../../utils/ticTacToe-utils/get-marks'
import { checkWinner } from '../../utils/ticTacToe-utils/check-winner'
import { playMarkSound } from '../../utils/ticTacToe-utils/sounds/play-markSound'
import { handleEndGame } from '../../utils/ticTacToe-utils/handle-endgame'

export function drawO(initialBox = null, turn) {
  if (gameStatus.gameOver) return

  const allBoxes = [...document.querySelectorAll('.tttBox')]

  const drawMark = (i) => {
    const box = allBoxes[i]
    if (box.classList.contains('xMark') || box.classList.contains('oMark'))
      return

    allBoxes[i].classList.add('oMark')
    playMarkSound()

    const winner = checkWinner()

    if (winner) {
      handleEndGame(winner)
      return
    }

    turn.isMyTurn = true
  }

  if (initialBox) {
    const i = allBoxes.indexOf(initialBox)
    if (i !== -1 && getMark(allBoxes[i]) === '') {
      return setTimeout(() => drawMark(i), 1000)
    }
    return
  }

  for (const combo of winnerCombos) {
    const [a, b, c] = combo
    const marks = [
      getMark(allBoxes[a]),
      getMark(allBoxes[b]),
      getMark(allBoxes[c])
    ]
    if (marks.filter((m) => m === 'o').length === 2 && marks.includes('')) {
      return drawMark(combo[marks.indexOf('')])
    }
  }

  for (const combo of winnerCombos) {
    const [a, b, c] = combo
    const marks = [
      getMark(allBoxes[a]),
      getMark(allBoxes[b]),
      getMark(allBoxes[c])
    ]
    if (marks.filter((m) => m === 'x').length === 2 && marks.includes('')) {
      return drawMark(combo[marks.indexOf('')])
    }
  }

  if (getMark(allBoxes[4]) === '') {
    return drawMark(4)
  }

  const emptyBoxes = allBoxes
    .map((box, i) => (getMark(box) === '' ? i : null))
    .filter((i) => i !== null)

  if (emptyBoxes.length > 0) {
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]
    return drawMark(randomBox)
  }
}
