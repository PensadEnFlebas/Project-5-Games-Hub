//* IMPORTS

import { renderCard } from '../../../components/gwent-components/render-card'

export function renderPlayerHand(playerHand) {
  const container = document.querySelector('.playerCardsContainer')

  container.innerHTML = ''

  playerHand.forEach((card) => {
    renderCard(card, { target: container })
  })
}
