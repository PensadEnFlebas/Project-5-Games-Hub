//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { cellMap } from '../../layouts/main/gwent'
import { adjustCardStack } from '../../utils/gwent-utils/card decks/adjust-card-stack'

export function renderCard(cardData, options = {}) {
  const { target, location, cardCount } = options

  if (typeof cardCount === 'number' && cardCount === 0) return null

  const gwentCard = createElement('div', {
    className: 'gwentCard',
    title: cardData.name,
    id: cardData.id
  })

  gwentCard.style.backgroundImage = `url(${cardData.image})`

  if (cardData === 'cardBackList') {
    gwentCard.classList.add('cardBack')
  }

  if (typeof cardCount === 'number') {
    const counter = createElement('div', {
      className: 'cardsCounter',
      textContent: cardCount
    })
    gwentCard.classList.add('cardBack')
    gwentCard.appendChild(counter)
  }

  if (target) {
    target.appendChild(gwentCard)
    adjustCardStack(target)
  } else if (location && cellMap[location]) {
    const cell = cellMap[location]
    cell.appendChild(gwentCard)
    if (cellMap[location].classList.contains('battlefield')) {
      adjustCardStack(cell)
    }
  }

  if (location && location.includes('special-cards')) {
    gwentCard.classList.add('specialCard-size')
  }

  if (
    location &&
    location.includes('special-cards') &&
    location.includes('p1')
  ) {
    gwentCard.classList.add('specialCard-location')
  }

  return gwentCard
}
