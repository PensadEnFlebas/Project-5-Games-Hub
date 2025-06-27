//* IMPORTS

import { renderCard } from './render-card'
import { cardBackList } from '../../data/gwent-lists'

export function renderRemainingCardsDeck(gameState) {
  if (gameState.player) {
    document
      .querySelectorAll('.relocatePlayerRemainingCards')
      .forEach((el) => el.remove())

    const { player } = gameState
    const playerFaction = player.faction?.toLowerCase?.() || ''
    const playerRemainingCards = player.remainingCards.length

    const playerCardBack =
      cardBackList.find((card) =>
        card.name.toLowerCase().includes(playerFaction)
      ) || cardBackList[0]

    const playerCards = renderCard(playerCardBack, {
      location: 'p1-melee:discards',
      cardCount: playerRemainingCards
    })

    if (playerCards) {
      playerCards.classList.add('relocatePlayerRemainingCards')
    }
  }

  if (gameState.computer) {
    document
      .querySelectorAll('.relocateComputerRemainingCards')
      .forEach((el) => el.remove())

    const { computer } = gameState
    const computerFaction = computer.faction?.toLowerCase?.() || ''
    const computerRemainingCards = computer.remainingCards.length

    const computerCardBack =
      cardBackList.find((card) =>
        card.name.toLowerCase().includes(computerFaction)
      ) || cardBackList[0]

    const computerCards = renderCard(computerCardBack, {
      location: 'pc-melee:discards',
      cardCount: computerRemainingCards
    })

    if (computerCards) {
      computerCards.classList.add('relocateComputerRemainingCards')
    }
  }
}
