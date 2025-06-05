//* IMPORTS

// FALTA EL UPDATE. SI NO SE PUEDE IMPLEMENTAR AQUÍ ENTONCES BORRARLA, PORQUE ESTÁ REPETIDO EN start-game.js DE MOMENTO, QUE ES DESDE DONDE SE EJECUTA AHORA.

import { renderCard } from './render-card'
import { cardBackList } from '../../data/gwent-lists'

export function renderRemainingCardsDeck(gameState) {
  const { player, computer } = gameState

  const playerRemainingCards = player.remainingCards.length
  const computerRemainingCards = computer.remainingCards.length

  const playerCardBack =
    cardBackList.find((card) =>
      card.name.toLowerCase().includes(player.faction.toLowerCase())
    ) || cardBackList[0]

  const computerCardBack =
    cardBackList.find((card) =>
      card.name.toLowerCase().includes(computer.faction.toLowerCase())
    ) || cardBackList[0]

  const playerCards = renderCard(playerCardBack, {
    location: 'p1-melee:discards',
    cardCount: playerRemainingCards
  })
  if (playerCards) {
    playerCards.classList.add('relocatePlayerRemainingCards')
  }

  renderCard(computerCardBack, {
    location: 'pc-melee:discards',
    cardCount: computerRemainingCards
  })
}
