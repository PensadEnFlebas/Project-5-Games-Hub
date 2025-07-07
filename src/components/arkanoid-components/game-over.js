//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { state } from './arkanoid-state'
import { renderArkanoidBtn } from './arkanoid-button'
import { resetGame } from '../../utils/arkanoid-utils/reset-game'
import { playEndImpactSound } from '../../utils/arkanoid-utils/sounds/play-end-impact-sound'
import { playFireworksSound } from '../../utils/arkanoid-utils/sounds/play-fireworks-sound'

export function gameOver() {
  state.isGameOver = true

  if (!state.allBricksDestroyed) {
    state.ball.src = '/assets/skull.gif'
    state.ball.width = 40
    state.ball.height = 40

    playEndImpactSound()
  } else {
    state.ball.src = '/assets/fireworks.gif'
    state.ball.width = 80
    state.ball.height = 80

    playFireworksSound()
  }

  localStorage.setItem('arkanoidLastScore', state.score)

  if (state.score > state.bestScoreValue) {
    state.bestScoreValue = state.score
    localStorage.setItem('arkanoidBestScore', bestScoreValue)
  }

  const bestScore = document.querySelector('.bestScore')
  const lastScore = document.querySelector('.lastScore')

  if (bestScore) {
    bestScore.innerHTML = `<span>Best score:</span> ${state.bestScoreValue}`
  }

  if (lastScore) {
    lastScore.innerHTML = `<span>Last game score:</span> ${state.score}`
  }

  setTimeout(() => {
    renderArkanoidOverlay()
  }, 2000)
}

export function renderArkanoidOverlay() {
  state.arkanoidOverlay.classList.remove('hidden')
  state.arkanoidOverlay.innerHTML = ''

  const arkanoidOverlayContainer = createElement('div', {
    className: 'arkanoidOverlayContainer'
  })

  const arkanoidOverlayLogo = createElement('img', {
    className: 'arkanoidOverlayLogo',
    src: '/assets/Arkanoid-logo.png',
    alt: 'Arkanoid logo',
    title: 'Arkanoid logo',
    loading: 'lazy'
  })

  const arkanoidOverlayText = createElement('h3', {
    className: 'arkanoidOverlayText',
    textContent: state.allBricksDestroyed ? 'VICTORY! 🚀' : 'GAME OVER ☠️'
  })

  const arkanoidOverlayScore = createElement('h4', {
    className: 'arkanoidOverlayScoresDiv',
    textContent: `YOUR SCORE: ${state.score}`
  })

  const arkanoidOverlayBtn = renderArkanoidBtn({
    className: 'arkanoidOverlayBtn',
    textContent: 'Play again',

    onClick: () => {
      resetGame()
      state.arkanoidOverlay.classList.add('hidden')
    }
  })

  arkanoidOverlayContainer.append(
    arkanoidOverlayLogo,
    arkanoidOverlayText,
    state.barImage,
    arkanoidOverlayScore,
    arkanoidOverlayBtn
  )
  state.arkanoidOverlay.appendChild(arkanoidOverlayContainer)
  document.body.appendChild(state.arkanoidOverlay)
}
