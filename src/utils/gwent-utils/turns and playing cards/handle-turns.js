import { updateTurnIcon } from '../update-turn-icon.js'
import { getRandomItem } from '../get-random-item.js'
import { previewCard } from '../../../components/gwent-components/preview-cards.js'
import { playingCard } from '../turns and playing cards/playing-card.js'
import { getBattlefieldStrength } from '../check winner/get-battlefield-strength.js'
import { checkWinner } from '../check winner/check-winner.js'
import { computerShouldPass } from '../computer game logic/computer-should-pass.js'
import { gameState } from '../gameState/gameState-manager.js'

export function handleTurn() {
  updateComputerPassesText()

  const state = gameState.getState()
  console.log('handleTurn gameState: ', state)

  if (state.medicMulliganActive || state.decoyMulliganActive) return

  if (state.player.passed && state.computer.passed) {
    console.log('🔚 Ambos jugadores pasaron. Se valida ganador de la ronda.')

    checkWinner()
    return
  }

  if (state.currentTurn === 'player') {
    enablePlayerTurn()
  } else {
    handleComputerTurn()
  }
}

function enablePlayerTurn() {
  const state = gameState.getState()

  if (state.player.passed) {
    console.log('❌ Ya has pasado esta ronda. Espera a la siguiente.')
    gameState.switchTurn()
    updateTurnIcon(gameState.currentTurn)
    handleTurn()
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
        onUse: (cell) => {
          const state = gameState.getState()

          const cardId = cardItem.id
          const selectedCard = state.player.hand.find((c) => c.id === cardId)

          if (!selectedCard) return

          const indexCardInHand = state.player.hand.findIndex(
            (c) => c.id === cardId
          )
          if (indexCardInHand === -1) return

          playingCard(selectedCard, indexCardInHand, cell)

          gameState.switchTurn()
          updateTurnIcon(gameState.currentTurn)
          handleTurn()
        }
      })
    })
  })

  const passButton = document.querySelector('.gwentPassBtn')
  passButton.disabled = false
}

function handleComputerTurn() {
  const state = gameState.getState()

  if (state.computer.passed) {
    console.log('✅ La computadora ya ha pasado. Turno del jugador.')
    gameState.switchTurn()
    updateTurnIcon('player')
    handleTurn()
    return
  }

  const hand = state.computer.hand
  const shouldPass = computerShouldPass()

  console.log(
    '🔍 Antes del setTimeout, decoyMulliganActive:',
    state.decoyMulliganActive
  )

  setTimeout(() => {
    const currentState = gameState.getState()

    console.log(
      '⏱️ Dentro del setTimeout, decoyMulliganActive:',
      currentState.decoyMulliganActive
    )

    if (currentState.decoyMulliganActive || currentState.medicMulliganActive)
      return

    if (shouldPass) {
      gameState.updateState((state) => ({
        ...state,
        computer: {
          ...state.computer,
          passed: true
        },
        currentTurn: 'player'
      }))

      updateTurnIcon('player')
      handleTurn()

      console.log('COMPUTER HA PASADO')
      return
    }

    const freshHand = currentState.computer.hand
    const card = getRandomItem(freshHand)
    const indexCardInHand = freshHand.findIndex((c) => c.id === card.id)

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
        const [row] = loc.split(':')
        return {
          location: loc,
          strength: getBattlefieldStrength(row)
        }
      })

      strengths.sort((a, b) => b.strength - a.strength)
      const bestLocation = strengths[0].location

      targetCell = document.querySelector(
        `.cell.${bestLocation.replace(':', '.')}`
      )
    }

    playingCard(card, indexCardInHand, targetCell)

    gameState.switchTurn()
    updateTurnIcon('player')
    handleTurn()
  }, 3000)
}

//? HELPING FUNCTIONS

function updateComputerPassesText() {
  const cardTextEl = document.querySelector('.gwentComputerPassesText')
  if (!cardTextEl) return

  const state = gameState.getState()
  if (state.computer.passed) {
    cardTextEl.innerHTML = `<span>Computer</span> has passed turn!`
  } else {
    cardTextEl.innerHTML = ''
  }
}
