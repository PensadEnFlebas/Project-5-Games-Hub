//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { renderCard } from './render-card'
import { renderGwentBtn } from './render-gwentBtn'
import { getCardsForMulligan } from '../../utils/gwent-utils/card decks/get-cards-for-mulligan'
import { renderPlayerHand } from '../../utils/gwent-utils/card decks/render-player-hand'
import { handleTurn } from '../../utils/gwent-utils/turns and playing cards/handle-turns'
import { playCard } from '../../utils/gwent-utils/sounds/play-card'

export function renderMulligan(gameState) {
  const initialHand = [...gameState.player.hand]
  const cardsForSwap = new Set()

  const mulliganOverlay = createElement('div', {
    className: 'mulliganOverlay'
  })

  const mulliganContainer = createElement('div', {
    className: 'mulliganContainer'
  })

  const mulliganText = createElement('h4', {
    className: 'mulliganText',
    textContent: 'Choose up 2 cards to swap if you want'
  })

  const mulliganCardsDiv = createElement('div', {
    className: 'mulliganCardsDiv'
  })

  initialHand.forEach((card) => {
    const mulliganCard = renderCard(card, { target: mulliganCardsDiv })
    mulliganCard.classList.add('mulliganCard')

    mulliganCard.addEventListener('click', () => {
      if (cardsForSwap.has(card.id)) {
        cardsForSwap.delete(card.id)
        mulliganCard.classList.remove('selected')
      } else {
        if (cardsForSwap.size < 2) {
          cardsForSwap.add(card.id)
          mulliganCard.classList.add('selected')
        }
      }
    })
  })

  const confirmSwapBtn = renderGwentBtn({
    className: 'gwentPassBtn confirmSwapBtn',
    textContent: 'Confirm swap',
    onClick: () => {
      const cardsToReplace = [...cardsForSwap]
      const deckForSwap = getCardsForMulligan(gameState)

      cardsToReplace.forEach((cardId) => {
        const cardIndex = gameState.player.hand.findIndex(
          (c) => c.id === cardId
        )
        if (cardIndex !== -1) {
          const randomIndex = Math.floor(Math.random() * deckForSwap.length)
          const newCard = deckForSwap.splice(randomIndex, 1)[0]

          gameState.player.hand[cardIndex] = newCard
        }
      })

      document.body.removeChild(mulliganOverlay)
      renderPlayerHand(gameState.player.hand)

      gameState.player.remainingCards = gameState.player.deck.filter(
        (card) =>
          !gameState.player.hand.some((handCard) => handCard.id === card.id)
      )

      cardsForSwap.clear()
      playCard()
      handleTurn(gameState)
    }
  })

  mulliganContainer.append(mulliganText, mulliganCardsDiv, confirmSwapBtn)
  mulliganOverlay.appendChild(mulliganContainer)
  document.body.appendChild(mulliganOverlay)
}
