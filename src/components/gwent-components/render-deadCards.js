//* IMPORTS

import { renderCard } from './render-card'
import { cardBackList } from '../../data/gwent-lists'

export function renderDeadCardsDeck(gameState) {
  const { player, computer } = gameState

  player.deadCards.forEach((card) => {
    if (!card.originalBaseStrength) {
      card.originalBaseStrength = card.baseStrength
      card.strength = card.originalBaseStrength
    } else {
      card.baseStrength = card.originalBaseStrength
      card.strength = card.originalBaseStrength
    }

    if (card.decoyUsed) delete card.decoyUsed
    if (card.medicUsed) delete card.medicUsed
    if (card.spyApplied) delete card.spyApplied
  })

  computer.deadCards.forEach((card) => {
    if (!card.originalBaseStrength) {
      card.originalBaseStrength = card.baseStrength
      card.strength = card.originalBaseStrength
    } else {
      card.baseStrength = card.originalBaseStrength
      card.strength = card.originalBaseStrength
    }

    if (card.decoyUsed) delete card.decoyUsed

    if (card.spyApplied) delete card.spyApplied
  })

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
