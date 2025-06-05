//* IMPORTS

import { updateTurnIcon } from '../update-turn-icon.js'
import { getRandomItem } from '../get-random-item.js'
import { previewCard } from '../../../components/gwent-components/preview-cards.js'
import { playingCard } from '../turns and playing cards/playing-card.js'
import { getBattlefieldStrength } from '../check winner/get-battlefield-strength.js'
import { checkWinner } from '../check winner/check-winner.js'
import { computerShouldPass } from '../computer game logic/computer-should-pass.js'
import { updateScore } from '../check winner/update-score.js'
import { getGameState } from '../gameState/get-gameState.js'
import { setGameState } from '../gameState/set-gameState.js'

export function handleTurn() {
  const gameState = getGameState()
  console.log('handleTurn gameState: ', gameState)

  if (gameState.player.passed && gameState.computer.passed) {
    console.log('🔚 Ambos jugadores pasaron. Se valida ganador de la ronda.')
    checkWinner(gameState)
    return
  }

  const { currentTurn } = gameState

  if (currentTurn === 'player') {
    enablePlayerTurn(gameState)
  } else {
    handleComputerTurn(gameState)
  }
}

function enablePlayerTurn(gameState) {
  if (gameState.player.passed) {
    console.log('❌ Ya has pasado esta ronda. Espera a la siguiente.')
    gameState.currentTurn = 'computer'
    updateTurnIcon('computer', gameState)
    handleTurn(gameState)

    return
  }

  const handContainer = document.querySelector('.playerCardsContainer')
  const playerbossDiv = document.querySelector('.cell.p1-siege.special-cards')
  const computerBossDiv = document.querySelector('.cell.pc-siege.special-cards')

  const handCards = handContainer.querySelectorAll('.gwentCard')
  const playerBossCard = playerbossDiv.querySelectorAll('.bossCard')
  const computerBossCard = computerBossDiv.querySelectorAll('.bossCard')
  const boardCards = document.querySelectorAll('.gwentBoard .gwentCard')

  const totalCardsOnBoard = [
    ...handCards,
    ...playerBossCard,
    ...computerBossCard,
    ...boardCards
  ]

  totalCardsOnBoard.forEach((cardItem) => {
    if (handContainer.contains(cardItem) || playerbossDiv.contains(cardItem)) {
      cardItem.classList.add('selectable')
    }

    cardItem.addEventListener('click', () => {
      previewCard(cardItem, {
        gameState,
        onUse: (cell) => {
          const cardId = cardItem.id
          const selectedCard = gameState.player.hand.find(
            (c) => c.id === cardId
          )
          if (!selectedCard) return

          const indexCardInHand = gameState.player.hand.findIndex(
            (c) => c.id === cardId
          )
          if (indexCardInHand === -1) return

          playingCard(selectedCard, indexCardInHand, gameState, cell)

          handCards.forEach((c) => c.replaceWith(c.cloneNode(true)))

          gameState.currentTurn = 'computer'
          updateTurnIcon('computer', gameState)
          handleTurn(gameState)
        }
      })
    })
  })

  const passButton = document.querySelector('.gwentPassBtn')
  passButton.disabled = false
}

function handleComputerTurn(gameState) {
  if (gameState.computer.passed) {
    console.log('✅ La computadora ya ha pasado. Turno del jugador.')
    gameState.currentTurn = 'player'
    updateTurnIcon('player', gameState)
    handleTurn(gameState)

    return
  }

  const hand = gameState.computer.hand
  const shouldPass = computerShouldPass(gameState)

  setTimeout(() => {
    if (shouldPass) {
      gameState.computer.passed = true
      gameState.currentTurn = 'player'
      updateTurnIcon('player', gameState)
      handleTurn(gameState)

      console.log('COMPUTER HA PASADO')

      return
    }

    const card = getRandomItem(hand)
    const indexCardInHand = hand.findIndex((c) => c.id === card.id)
    if (indexCardInHand === -1) return

    const validLocations = card.boardLocations.filter((location) => {
      const [row, column] = location.split(':')
      const cell = document.querySelector(`.cell.${row}.${column}`)

      if (column !== 'horn') return true
      if (!row.includes('p1')) return true

      const battlefieldCell = document.querySelector(`.cell.${row}.battlefield`)
      const hasBattlefieldCards = battlefieldCell?.querySelector('.gwentCard')
      const hornIsEmpty = !cell?.querySelector('.gwentCard')

      return hasBattlefieldCards && hornIsEmpty
    })

    let targetCell = null
    if (validLocations.some((loc) => loc.includes(':horn'))) {
      const hornLocations = validLocations.filter((loc) =>
        loc.includes(':horn')
      )

      const strengths = hornLocations.map((loc) => {
        const [row, column] = loc.split(':')

        return {
          location: loc,
          strength: getBattlefieldStrength(row, gameState)
        }
      })

      strengths.sort((a, b) => b.strength - a.strength)
      const bestLocation = strengths[0].location

      targetCell = document.querySelector(
        `.cell.${bestLocation.replace(':', '.')}`
      )
    }

    playingCard(card, indexCardInHand, gameState, targetCell)

    gameState.currentTurn = 'player'
    updateTurnIcon('player', gameState)
    handleTurn(gameState)
  }, 3000)
}
