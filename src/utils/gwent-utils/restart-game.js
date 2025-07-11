//* IMPORTS

import { renderStartScreen } from '../../components/gwent-components/render-start-screen'
import { gameState } from './gameState/gameState-manager'

export function restartGame() {
  localStorage.removeItem('gwentGameState')
  localStorage.removeItem('gwentStartScreenAlreadyShown')

  const playerCardsContainer = document.querySelector('.playerCardsContainer')
  if (playerCardsContainer) playerCardsContainer.innerHTML = ''

  const gwentBoard = document.querySelector('.gwentBoard')
  if (gwentBoard) {
    const cells = gwentBoard.querySelectorAll('.cell')
    cells.forEach((cell) => (cell.innerHTML = ''))
  }

  const turnCounterIcon = document.querySelector('.turnCounterIcon')
  turnCounterIcon.src = '/assets/gwentUtils/gwent_icon.png'

  gameState.clearState()

  renderStartScreen()
}

//? HELPING FUNCTIONS

function cleanSpecialCardProps(cards) {
  cards.forEach((card) => {
    if (card.decoyUsed) delete card.decoyUsed
    if (card.spyApplied) delete card.spyApplied
    if (card.medicUsed) delete card.medicUsed
  })
}
