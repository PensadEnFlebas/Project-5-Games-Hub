//* IMPORTS

import { renderCard } from './render-card'
import { cardBackList } from '../../data/gwent-lists'

export function renderDeadCardsDeck(gameState) {
  const { player, computer } = gameState

  const playerDeadCards = player.deadCards.length
  const computerDeadCards = computer.deadCards.length

  const playerCardBack = cardBackList[2]
  const computerCardBack = cardBackList[2]

  function updateOrRenderDeadCard({
    locationSelector,
    locationKey,
    cardBack,
    cardCount,
    extraClass
  }) {
    const cell = document.querySelector(locationSelector)
    if (!cell) return

    const existingCard = cell.querySelector('.deadCard')

    if (existingCard) {
      const counter = existingCard.querySelector('.cardsCounter')
      if (counter) counter.textContent = cardCount
    } else {
      const card = renderCard(cardBack, {
        location: locationKey,
        cardCount
      })

      if (card) {
        card.classList.add('deadCard')
        if (extraClass) card.classList.add(extraClass)
      }
    }
  }

  updateOrRenderDeadCard({
    locationSelector: '.p1-siege.discards',
    locationKey: 'p1-siege:discards',
    cardBack: playerCardBack,
    cardCount: playerDeadCards,
    extraClass: 'relocatePlayerDeadCards'
  })

  updateOrRenderDeadCard({
    locationSelector: '.pc-siege.discards',
    locationKey: 'pc-siege:discards',
    cardBack: computerCardBack,
    cardCount: computerDeadCards
  })
}
