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

  const state = gameState.getState()

  if (state?.player && state?.computer) {
    cleanSpecialCardProps(state.player.hand)
    cleanSpecialCardProps(state.computer.hand)
    cleanSpecialCardProps(state.player.deadCards)
    cleanSpecialCardProps(state.computer.deadCards)
    cleanSpecialCardProps(state.player.remainingCards)
    cleanSpecialCardProps(state.computer.remainingCards)
    cleanSpecialCardProps(state.player.deck)
    cleanSpecialCardProps(state.computer.deck)
  }

  renderStartScreen()
}

//? HELPING FUNCTIONS

function cleanSpecialCardProps(cards) {
  cards.forEach((card) => {
    if (card._decoyUsed) delete card._decoyUsed
    if (card.spyApplied) delete card.spyApplied
  })
}
