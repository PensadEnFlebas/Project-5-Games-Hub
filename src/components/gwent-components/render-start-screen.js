//*IMPORTS

import { createElement } from '../../utils/create-elements'
import { openCloseSection } from '../../utils/open-close-sections'
import { renderGwentBtn } from '../../components/gwent-components/render-gwentBtn'
import { playCardShuffle } from '../../utils/gwent-utils/sounds/play-cardShuffle'
import { startGame } from './start-game'

export function renderStartScreen() {
  const gwentOverlay = createElement('div', { className: 'gwentOverlay' })

  const gwentOverlayLogo = createElement('img', {
    className: 'gwentOverlayLogo',
    src: '/assets/gwent_logo.png',
    alt: 'Gwent Logo',
    title: 'Gwent',
    loading: 'lazy'
  })

  const startScreenH3 = createElement('h4', {
    className: 'startScreenH3',
    textContent: 'Choose your Faction'
  })

  const northernRealmsBtn = renderGwentBtn({
    className: 'factionBtn',
    textContent: 'Northern Realms',
    onClick: () => {
      const gwentBoard = document.querySelector('.gwentBoard')
      if (gwentBoard) {
        const cells = gwentBoard.querySelectorAll('.cell')
        cells.forEach((cell) => (cell.innerHTML = ''))
      }
      localStorage.setItem('gwentStartScreenAlreadyShown', 'true')
      playCardShuffle()

      setTimeout(() => {
        const passRoundBtn = document.querySelector('.hiddenBtn')
        if (passRoundBtn) {
          passRoundBtn.classList.remove('hiddenBtn')
        }

        startGame('Northern Realms')
      }, 800)
    }
  })

  const monstersBtn = renderGwentBtn({
    className: 'factionBtn',
    textContent: 'Monsters',
    onClick: () => {
      const gwentBoard = document.querySelector('.gwentBoard')
      if (gwentBoard) {
        const cells = gwentBoard.querySelectorAll('.cell')
        cells.forEach((cell) => (cell.innerHTML = ''))
      }
      localStorage.setItem('gwentStartScreenAlreadyShown', 'true')
      playCardShuffle()

      setTimeout(() => {
        const passRoundBtn = document.querySelector('.hiddenBtn')
        if (passRoundBtn) {
          passRoundBtn.classList.remove('hiddenBtn')
        }

        startGame('Monsters')
      }, 800)
    }
  })

  const closeGwentBtn = renderGwentBtn({
    className: 'closeGwentBtn',
    textContent: '✖︎ close game',
    onClick: () => {
      localStorage.removeItem('gwentStartScreenAlreadyShown')
      localStorage.removeItem('gwentGameState')
      const gwentBoard = document.querySelector('.gwentBoard')
      if (gwentBoard) {
        const cells = gwentBoard.querySelectorAll('.cell')
        cells.forEach((cell) => (cell.innerHTML = ''))
      }
    }
  })

  openCloseSection(closeGwentBtn)

  gwentOverlay.append(
    gwentOverlayLogo,
    startScreenH3,
    northernRealmsBtn,
    monstersBtn,
    closeGwentBtn
  )
  document.body.appendChild(gwentOverlay)

  document.getElementById('gwent').classList.add('visualized')
}
