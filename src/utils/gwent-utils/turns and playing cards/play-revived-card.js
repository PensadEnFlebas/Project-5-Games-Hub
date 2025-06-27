//* IMPORT

import { gameState } from '../gameState/gameState-manager'
import { renderCard } from '../../../components/gwent-components/render-card'
import { adjustCardStack } from '../card decks/adjust-card-stack'
import { updateScore } from '../check winner/update-score'

export function playRevivedCard(cardData, player) {
  const locationIndex = cardData.boardLocations.findIndex((_, i) =>
    player === 'player' ? i % 2 === 0 : i % 2 !== 0
  )
  const location = cardData.boardLocations[locationIndex]

  gameState.updateState((state) => {
    const newState = { ...state }
    newState[player].deadCards = newState[player].deadCards.filter(
      (c) => c.id !== cardData.id
    )
    newState[player].playedCards.unit.push(cardData)
    return newState
  })

  if (cardData.originalBaseStrength == null) {
    cardData.originalBaseStrength = cardData.baseStrength
  }

  renderCard(cardData, { location })

  const justRendered = document.getElementById(cardData.id)
  if (justRendered) {
    adjustCardStack(justRendered.parentElement)
  }

  updateScore(player)
}
