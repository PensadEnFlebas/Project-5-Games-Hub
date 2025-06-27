//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { renderCard } from './render-card'
import { renderGwentBtn } from './render-gwentBtn'
import { getCardsForMulligan } from '../../utils/gwent-utils/card decks/get-cards-for-mulligan'
import { renderPlayerHand } from '../../utils/gwent-utils/card decks/render-player-hand'
import { handleTurn } from '../../utils/gwent-utils/turns and playing cards/handle-turns'
import { playCard } from '../../utils/gwent-utils/sounds/play-card'
import { playRevivedCard } from '../../utils/gwent-utils/turns and playing cards/play-revived-card'
import { updateScore } from '../../utils/gwent-utils/check winner/update-score'
import { applyAbilitiesToPlayedCards } from '../../utils/gwent-utils/card manager/apply-abilities-to-played-card'

export function renderMedicMulligan(deadCards, player) {
  if (document.querySelector('.medicMulliganOverlay')) return

  const selectedCard = { id: null }

  const medicMulliganOverlay = createElement('div', {
    className: 'medicMulliganOverlay'
  })

  const medicMulliganContainer = createElement('div', {
    className: 'medicMulliganContainer'
  })

  const medicMulliganText = createElement('h4', {
    className: 'medicMulliganText',
    textContent: 'Choose up 1 card to swap'
  })

  const medicMulliganCardsDiv = createElement('div', {
    className: 'medicMulliganCardsDiv'
  })

  deadCards.forEach((card) => {
    const cardEl = renderCard(card, { target: medicMulliganCardsDiv })
    cardEl.classList.add('medicMulliganCard')

    cardEl.addEventListener('click', () => {
      const alreadySelected = selectedCard.id === card.id
      selectedCard.id = alreadySelected ? null : card.id

      document
        .querySelectorAll('.medicMulliganCard')
        .forEach((el) => el.classList.remove('selectedForSwap'))
      if (!alreadySelected) {
        cardEl.classList.add('selectedForSwap')
      }
    })
  })

  const confirmSwapBtn = renderGwentBtn({
    className: 'gwentPassBtn confirmSwapBtn',
    textContent: 'Confirm choice',
    onClick: () => {
      if (!selectedCard.id) return

      const revivedCard = deadCards.find((c) => c.id === selectedCard.id)
      if (revivedCard) {
        playRevivedCard(revivedCard, player)
        applyAbilitiesToPlayedCards()
        updateScore(player)
      }

      gameState.updateState((state) => {
        return { ...state, medicMulliganActive: false }
      })

      document.body.removeChild(medicMulliganOverlay)
      playCard()
      handleTurn()
    }
  })

  medicMulliganContainer.append(
    medicMulliganText,
    medicMulliganCardsDiv,
    confirmSwapBtn
  )
  medicMulliganOverlay.appendChild(medicMulliganContainer)
  document.body.appendChild(medicMulliganOverlay)
}
