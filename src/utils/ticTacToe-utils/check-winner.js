//* IMPORTS

import { winnerCombos } from '../../layouts/main/tic-tac-toe'
import { getMark } from './get-marks'

function getWinnerData() {
  const allBoxes = [...document.querySelectorAll('.tttBox')]

  for (const combo of winnerCombos) {
    const [a, b, c] = combo
    const marks = [
      getMark(allBoxes[a]),
      getMark(allBoxes[b]),
      getMark(allBoxes[c])
    ]
    if (marks[0] && marks[0] === marks[1] && marks[1] === marks[2]) {
      return { winner: marks[0], combo }
    }
  }

  const isDraw = allBoxes.every(
    (box) => box.classList.contains('xMark') || box.classList.contains('oMark')
  )

  return isDraw ? { winner: 'draw', combo: [] } : null
}

export function checkWinner() {
  const data = getWinnerData()
  return data ? data.winner : null
}

export function getWinnerCombo() {
  const data = getWinnerData()
  return data ? data.combo : []
}
