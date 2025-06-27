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
import { adjustCardStack } from '../../utils/gwent-utils/card decks/adjust-card-stack'

export function renderDecoyMulligan({ validTargets, player }) {
  if (document.querySelector('.decoyMulliganOverlay')) return

  const selectedCard = { id: null }

  const overlay = createElement('div', {
    className: 'decoyMulliganOverlay'
  })

  const container = createElement('div', {
    className: 'decoyMulliganContainer'
  })

  const text = createElement('h4', {
    className: 'decoyMulliganText',
    textContent:
      validTargets.length === 0
        ? 'No valid units to swap. You cannot play Decoy card now. Please, choose another card'
        : 'Choose 1 unit to swap with Decoy'
  })

  const cardsDiv = createElement('div', {
    className: 'decoyMulliganCardsDiv'
  })

  if (validTargets.length > 0) {
    validTargets.forEach((card) => {
      const cardEl = renderCard(card, { target: cardsDiv })
      cardEl.classList.add('decoyMulliganCard')

      cardEl.addEventListener('click', () => {
        const alreadySelected = selectedCard.id === card.id
        selectedCard.id = alreadySelected ? null : card.id

        document
          .querySelectorAll('.decoyMulliganCard')
          .forEach((el) => el.classList.remove('selectedForSwap'))

        if (!alreadySelected) {
          cardEl.classList.add('selectedForSwap')
        }
      })
    })
  }

  const closeWarningBtn = renderGwentBtn({
    className: 'closeGwentBtn closeWarningBtn',
    textContent: '✖︎ close',
    onClick: () => {
      gameState.updateState((prev) => ({
        ...prev,
        decoyMulliganActive: false,
        selectedDecoyCard: null,
        [player]: {
          ...prev[player],
          hand: prev[player].hand.map((c) =>
            c.id === prev.selectedDecoyCard?.id
              ? { ...c, _decoyUsed: false }
              : c
          )
        }
      }))
      document.body.removeChild(overlay)
    }
  })

  const confirmBtn = renderGwentBtn({
    className: 'gwentPassBtn confirmSwapBtn',
    textContent: 'Confirm swap',
    onClick: () => {
      if (!selectedCard.id) return

      const state = gameState.getState()
      const decoyCard = state.selectedDecoyCard
      const playerField = state[player].playedCards.unit

      const cardToSwapIndex = playerField.findIndex(
        (card) => card.id === selectedCard.id
      )

      if (cardToSwapIndex === -1 || !decoyCard) return

      const cardToSwap = playerField[cardToSwapIndex]

      cardToSwap.strength = cardToSwap.baseStrength

      const clonedDecoy = {
        ...decoyCard,
        id: cardToSwap.id
      }

      const updatedUnit = [...playerField]
      updatedUnit[cardToSwapIndex] = clonedDecoy

      // const updatedHand = [...state[player].hand, cardToSwap]
      const updatedHand = state[player].hand
        .filter((c) => c.id !== decoyCard.id)
        .concat(cardToSwap)

      const oldCardEl = document.getElementById(cardToSwap.id)
      if (oldCardEl && oldCardEl.parentElement) {
        const location = [...oldCardEl.parentElement.classList].find(
          (cls) => cls.includes('p1') || cls.includes('pc')
        )
        oldCardEl.replaceWith(renderCard(clonedDecoy, { location }))
      }

      gameState.updateState((prev) => ({
        ...prev,
        [player]: {
          ...prev[player],
          playedCards: {
            ...prev[player].playedCards,
            unit: updatedUnit
          },
          hand: updatedHand
        },
        decoyMulliganActive: false,
        selectedDecoyCard: null
      }))

      renderPlayerHand(updatedHand)
      document.querySelectorAll('.cell.battlefield').forEach(adjustCardStack)
      updateScore(player)
      playCard()
      handleTurn()
      document.body.removeChild(overlay)
    }
  })

  container.append(text, cardsDiv)
  if (validTargets.length === 0) container.appendChild(closeWarningBtn)
  if (validTargets.length > 0) container.appendChild(confirmBtn)
  overlay.appendChild(container)
  document.body.appendChild(overlay)
}
