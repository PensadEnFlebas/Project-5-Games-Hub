//* IMPORTS

import { renderStartScreen } from '../../components/gwent-components/render-start-screen'

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

  renderStartScreen()
}
