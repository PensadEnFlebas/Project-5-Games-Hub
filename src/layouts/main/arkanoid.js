//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { startGame } from '../../components/arkanoid-components/start-game'
import { state } from '../../components/arkanoid-components/arkanoid-state'

//? ENTRY POINT

export function arkanoid() {
  const arkanoidSection = document.querySelector('#arkanoid')

  const logoContainer = createElement('div', { className: 'logoContainer' })

  const scoreContainer = createElement('div', { className: 'scoreContainer' })
  const bestScore = createElement('h4', {
    className: 'bestScore',
    innerHTML: `<span>Best score:</span> ${state.bestScoreValue}`
  })

  const lastScore = createElement('h4', {
    className: 'lastScore',
    innerHTML: `<span>Last game score:</span> ${
      localStorage.getItem('arkanoidLastScore') || 0
    }`
  })

  logoContainer.append(state.arkanoidShadowedLogo, state.pauseStartBtn)
  scoreContainer.append(bestScore, state.currentGameScore, lastScore)
  state.canvasContainer.append(state.canvas, state.ball)
  arkanoidSection.append(logoContainer, state.canvasContainer, scoreContainer)

  startGame()
}
