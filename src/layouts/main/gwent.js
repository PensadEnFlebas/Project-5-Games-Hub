//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { restartGame } from '../../utils/gwent-utils/restart-game'
import { renderGwentBtn } from '../../components/gwent-components/render-gwentBtn'
import { updateTurnIcon } from '../../utils/gwent-utils/update-turn-icon'
import { handleTurn } from '../../utils/gwent-utils/turns and playing cards/handle-turns'
import { gameState } from '../../utils/gwent-utils/gameState/gameState-manager'

const rows = [
  'pc-siege',
  'pc-range',
  'pc-melee',
  'p1-melee',
  'p1-range',
  'p1-siege'
]

const columns = ['special-cards', 'horn', 'battlefield', 'discards']

export const cellMap = {}

export function gwent() {
  const gwentSection = document.getElementById('gwent')

  const gwentTurnCounterDiv = createElement('div', {
    className: 'gwentTurnCounterDiv'
  })

  const gwentLogo = createElement('img', {
    className: 'gwentLogo',
    src: '/assets/gwent_logo.png',
    alt: 'Gwent Logo',
    title: 'Gwent',
    loading: 'lazy'
  })

  const gwentPassBtn = renderGwentBtn({
    className: 'gwentPassBtn hiddenBtn',
    textContent: 'Pass round',
    onClick: () => {
      console.log('🚫 HAS PULSADO PASS ROUND BUTTON')

      gameState.updateState((state) => ({
        ...state,
        player: {
          ...state.player,
          passed: true
        },
        currentTurn: 'computer'
      }))

      document.getElementById('gwent').classList.add('blockedCard')
      updateTurnIcon('computer')
      handleTurn()
    }
  })

  const turnCounter = createElement('div', {
    className: 'turnCounter'
  })

  const turnCounterText = createElement('h3', {
    className: 'turnCounterText',
    textContent: 'Turn: '
  })

  const turnCounterIcon = createElement('img', {
    className: 'turnCounterIcon',
    src: '/assets/gwentUtils/gwent_icon.png',
    alt: 'Current turn Faction Icon',
    title: 'Current turn faction icon',
    loading: 'lazy'
  })

  const gwentResetBtn = renderGwentBtn({
    className: 'gwentResetBtn closeGwentBtn',
    textContent: 'Reset game',
    onClick: () => {
      restartGame()

      const passRoundBtn = document.querySelector('.gwentPassBtn')
      if (passRoundBtn) {
        passRoundBtn.classList.add('hiddenBtn')
      }
    }
  })

  const gwentLastCardPlayedText = createElement('h4', {
    className: 'gwentLastCardPlayedText',
    textContent: ''
  })

  const gwentComputerPassesText = createElement('h4', {
    className: 'gwentComputerPassesText',
    textContent: ''
  })

  const gwentContainer = createElement('div', {
    className: 'gwentContainer'
  })

  const gwentBoard = createElement('div', {
    className: 'gwentBoard'
  })

  rows.forEach((row) => {
    columns.forEach((column) => {
      const locationKey = `${row}:${column}`
      const cell = createElement('div', {
        className: `cell ${row} ${column}`
      })
      cellMap[locationKey] = cell
      gwentBoard.appendChild(cell)
    })
  })

  const playerCardsContainer = createElement('div', {
    className: 'playerCardsContainer'
  })

  turnCounter.append(turnCounterText, turnCounterIcon)
  gwentTurnCounterDiv.append(
    gwentLogo,
    gwentPassBtn,
    turnCounter,
    gwentResetBtn,
    gwentLastCardPlayedText,
    gwentComputerPassesText
  )
  gwentContainer.append(gwentBoard, playerCardsContainer)
  gwentSection.append(gwentTurnCounterDiv, gwentContainer)
}
