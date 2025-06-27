//* IMPORTS

import { cardAbilities } from '../../../data/gwent-card-abilities'
import { getPlayedCards } from './get-played-cards'

export function applyAbilitiesToPlayedCards() {
  const allCards = getPlayedCards()

  console.log('allCards: ', allCards)

  const hornCards = []

  allCards.forEach((card) => {
    card.ability.forEach((ability) => {
      if (ability === 'horn') {
        hornCards.push({ card, ability })
      } else {
        executeAbility(card, ability)
      }
    })

    hornCards.forEach(({ card, ability }) => {
      executeAbility(card, ability)
    })
  })
}

function executeAbility(card, ability) {
  if (ability && cardAbilities[ability]) {
    console.log(`✨ Se va a ejecutar el power de la card: ${ability}`)

    cardAbilities[ability](card)
  }
}
