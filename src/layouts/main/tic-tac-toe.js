//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { drawX } from '../../components/ticTacToe-components/drawX-player'
import { drawO } from '../../components/ticTacToe-components/drawO-computer'
import { renderResetBtn } from '../../components/ticTacToe-components/reset-button'
import { printScores } from '../../utils/ticTacToe-utils/scores/print-scores'
import { clearLoserBoxes } from '../../utils/ticTacToe-utils/reset-loser-boxes-styles'

const boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8]
export const whichTurn = { isMyTurn: true }
export const gameStatus = {
  gameOver: false
}
export const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export function ticTacToe() {
  const tttSection = document.getElementById('ticTacToe')

  const tttLogo = createElement('img', {
    className: 'tttLogo',
    src: '/assets/ticTacToe_logo.gif',
    alt: 'Tic Tac Toe Logo',
    title: 'Tic Tac Toe',
    loading: 'lazy'
  })

  const tttContainer = createElement('div', {
    className: 'tttContainer'
  })

  const tttScoreContainer = createElement('div', {
    className: 'tttScoreContainer'
  })

  const tttScorePlayer = createElement('p', {
    className: 'scoreP tttScorePlayer',
    innerHTML: 'PLAYER score: <span> </span>'
  })

  const tttScoreComputer = createElement('p', {
    className: 'scoreP tttScoreComputer',
    innerHTML: 'COMPUTER score: <span> </span>'
  })

  const tttScoreDraw = createElement('p', {
    className: 'scoreP tttScoreDraw',
    innerHTML: 'DRAWS score: <span> </span>'
  })

  printScores({
    playerScore: tttScorePlayer,
    computerScore: tttScoreComputer,
    drawScore: tttScoreDraw
  })

  const tttBoard = createElement('div', {
    className: 'tttBoard'
  })

  boxes.forEach((box) => {
    const tttBox = createElement('div', {
      className: 'tttBox'
    })

    drawX(tttBox, whichTurn, () => drawO(null, whichTurn, drawX))

    tttBoard.appendChild(tttBox)
  })

  tttScoreContainer.append(tttScorePlayer, tttScoreComputer, tttScoreDraw)
  tttContainer.append(tttScoreContainer, tttBoard)

  const tttResetBtn = renderResetBtn({
    container: tttContainer,
    className: 'tttResetBtn',
    textContent: 'Reset Game',

    onClick: () => {
      clearLoserBoxes()
      gameStatus.gameOver = false
      whichTurn.isMyTurn = !whichTurn.isMyTurn

      const allBoxes = document.querySelectorAll('.tttBox')

      allBoxes.forEach((box) => {
        box.classList.remove('xMark', 'oMark')
        if (
          !box.classList.contains('xMark') &&
          !box.classList.contains('oMark')
        ) {
          drawX(box, whichTurn, () => drawO(null, whichTurn, drawX))
        }
      })

      if (!whichTurn.isMyTurn) {
        drawO(allBoxes[4], whichTurn, drawX)
      }
    }
  })

  tttSection.append(tttLogo, tttContainer)
}
