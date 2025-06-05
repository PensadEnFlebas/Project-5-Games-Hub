//*IMPORTS

import { createElement } from '../../utils/create-elements'
import { getRandomItem } from '../../utils/gwent-utils/get-random-item'
import {
  generateDeck,
  getInitialHand
} from '../../utils/gwent-utils/card decks/generate-deck'
import { northernRealmBosses, monstersBosses } from '../../data/gwent-lists'
import { renderCard } from './render-card'
import { updateTurnIcon } from '../../utils/gwent-utils/update-turn-icon'
import { createGameState } from '../../utils/gwent-utils/gameState/create-gameState'
import { renderPlayerHand } from '../../utils/gwent-utils/card decks/render-player-hand'
import { renderMulligan } from './render-mulligan'
import { renderRemainingCardsDeck } from '../gwent-components/render-and-update-remainingCards'
import { setGameState } from '../../utils/gwent-utils/gameState/set-gameState'

export function startGame(playerFaction) {
  document.querySelector('.gwentOverlay').remove()

  const computerFaction =
    playerFaction === 'Northern Realms' ? 'Monsters' : 'Northern Realms'

  const playerDeck = generateDeck(playerFaction)
  const computerDeck = generateDeck(computerFaction)

  const playerHand = getInitialHand(playerDeck)
  const computerHand = getInitialHand(computerDeck)

  const playerRemaining = playerDeck.filter(
    (card) => !playerHand.includes(card)
  )
  const computerRemaining = computerDeck.filter(
    (card) => !computerHand.includes(card)
  )

  renderPlayerHand(playerHand)

  const currentTurn = Math.random() < 0.5 ? 'player' : 'computer'
  console.log(`${currentTurn} begins!`)

  const initialGameState = {
    playerFaction,
    computerFaction,
    playerDeck,
    computerDeck,
    playerHand,
    computerHand,
    playerRemaining,
    computerRemaining,
    currentTurn
  }

  const gameState = createGameState(initialGameState)

  starterBosses(gameState)
  starterGameData(gameState)
  renderRemainingCardsDeck(gameState)
  updateTurnIcon(currentTurn, gameState)
  setGameState(gameState)

  setTimeout(() => {
    renderMulligan(gameState)
  }, 1000)
}

function starterBosses(gameState) {
  const { player, computer } = gameState

  const playerBossPool =
    player.faction === 'Northern Realms' ? northernRealmBosses : monstersBosses

  const computerBossPool =
    computer.faction === 'Northern Realms'
      ? northernRealmBosses
      : monstersBosses

  const playerBoss = getRandomItem(playerBossPool)
  const computerBoss = getRandomItem(computerBossPool)

  const playerBossCard = renderCard(playerBoss, {
    location: 'p1-siege:special-cards'
  })

  playerBossCard.classList.add('bossCard')
  playerBossCard.classList.add('playerBossCard')

  const computerBossCard = renderCard(computerBoss, {
    location: 'pc-siege:special-cards'
  })

  computerBossCard.classList.add('bossCard')
  computerBossCard.classList.add('computerBossCard')

  gameState.playerBoss = playerBoss
  gameState.computerBoss = computerBoss
}

function starterGameData(gameState) {
  const playerCardsLeft = gameState.player.hand.length
  const computerCardsLeft = gameState.computer.hand.length

  renderGemsAndCardsLeft(
    'p1-range',
    playerCardsLeft,
    'PLAYER',
    gameState.player.score
  )
  renderGemsAndCardsLeft(
    'pc-range',
    computerCardsLeft,
    'COMPUTER',
    gameState.computer.score
  )
}

function renderGemsAndCardsLeft(rowClass, cardsLeft, player, score) {
  const cell = document.querySelector(`.cell.${rowClass}.special-cards`)

  const gameDataDiv = createElement('div', { className: 'gameDataDiv' })

  const gemsContainer = createElement('div', { className: 'gemsContainer' })
  for (let i = 0; i < 2; i++) {
    const gem = createElement('img', {
      className: 'gem',
      src: '/assets/gwentUtils/red_gem.webp',
      alt: 'Round Gem left',
      title: 'Round Gem left',
      loading: 'lazy'
    })
    gemsContainer.appendChild(gem)
  }

  const playerText = createElement('h5', {
    className: 'playerText',
    textContent: `${player}: ${score}`
  })

  const cardsLeftText = createElement('p', {
    className: 'cardsLeftText',
    textContent: `Cards left: ${cardsLeft}`
  })

  gameDataDiv.append(gemsContainer, playerText, cardsLeftText)
  cell.appendChild(gameDataDiv)

  if (rowClass === 'p1-range') {
    gameDataDiv.classList.add('reverseDirection')
  }
}
