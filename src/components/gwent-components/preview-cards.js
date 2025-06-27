import { createElement } from '../../utils/create-elements'
import { renderGwentBtn } from '../../components/gwent-components/render-gwentBtn'
import {
  northernRealmsList,
  northernRealmBosses,
  monstersList,
  monstersBosses,
  neutralCardsList,
  cardBackList
} from '../../data/gwent-lists'
import { handleTurn } from '../../utils/gwent-utils/turns and playing cards/handle-turns'
import { updateTurnIcon } from '../../utils/gwent-utils/update-turn-icon'
import { gameState } from '../../utils/gwent-utils/gameState/gameState-manager'
import {
  highlightValidLocations,
  removeHighlights
} from './highlight-locations'

export function previewCard(target, options = {}) {
  const { onUse = null } = options

  if (target.closest('.discards')) {
    return
  }

  const existingOverlay = document.querySelector('.previewCardOverlay')
  if (existingOverlay) {
    existingOverlay.remove()
  }

  const allCards = [
    ...northernRealmsList,
    ...northernRealmBosses,
    ...monstersList,
    ...monstersBosses,
    ...neutralCardsList,
    ...cardBackList
  ]
  const cardId = target.id
  const cardData = allCards.find((card) => card.id === cardId)
  const abilityDescription = cardData.abilityDescription
  const power = cardData.power

  const previewCardOverlay = createElement('div', {
    className: 'previewCardOverlay'
  })

  const previewCardDiv = createElement('div', {
    className: 'previewCardDiv'
  })
  const clonedCard = target.cloneNode(true)
  clonedCard.style.transform = 'none'
  previewCardDiv.appendChild(clonedCard)

  const cardInfoContainer = createElement('div', {
    className: 'cardInfoContainer'
  })

  const cardInfo = createElement('h4', {
    className: 'cardInfo',
    textContent: abilityDescription || power || ''
  })

  const buttonsDiv = createElement('div', { className: 'buttonsDiv' })

  const isSelectable = target.classList.contains('selectable')
  const isBoss = target.classList.contains('bossCard')
  const currentState = gameState.getState()
  const bossPowerUsed = isBoss && currentState?.player?.bossUsed

  if (
    isSelectable &&
    typeof onUse === 'function' &&
    (!isBoss || (isBoss && !bossPowerUsed))
  ) {
    const useCardBtn = renderGwentBtn({
      className: 'gwentPassBtn',
      textContent: 'Use card',
      onClick: () => {
        if (isBoss && currentState) {
          gameState.updateState((state) => ({
            ...state,
            player: {
              ...state.player,
              bossUsed: true
            },
            currentTurn: 'computer'
          }))

          target.classList.add('bossAlreadyUsed')

          const prevLastCard = document.querySelector('.lastCardPlayed')
          if (prevLastCard) {
            prevLastCard.classList.remove('lastCardPlayed')
          }

          updateTurnIcon('computer')
          handleTurn()

          closeOverlay()
          return
        }

        const hasMultipleLocations =
          cardData.ability.includes('agile') ||
          cardData.ability.includes('horn')

        if (hasMultipleLocations) {
          closeOverlay()

          highlightValidLocations(cardData, (cell) => {
            removeHighlights()
            onUse(cell)
          })
          return
        } else {
          onUse()
          closeOverlay()
        }
      }
    })
    buttonsDiv.appendChild(useCardBtn)
  }

  const closeCardBtn = renderGwentBtn({
    className: 'closeGwentBtn',
    textContent: '✖︎ close',
    onClick: () => {
      document.body.removeChild(previewCardOverlay)
    }
  })
  buttonsDiv.appendChild(closeCardBtn)

  cardInfoContainer.appendChild(cardInfo)
  previewCardDiv.append(cardInfoContainer, buttonsDiv)
  previewCardOverlay.appendChild(previewCardDiv)
  document.body.appendChild(previewCardOverlay)

  function closeOverlay() {
    if (document.body.contains(previewCardOverlay)) {
      document.body.removeChild(previewCardOverlay)
    }
    removeHighlights()
    document.removeEventListener('keydown', handleEscape)
  }

  function handleEscape(e) {
    if (e.key === 'Escape') {
      closeOverlay()
    }
  }

  document.addEventListener('keydown', handleEscape)
}
