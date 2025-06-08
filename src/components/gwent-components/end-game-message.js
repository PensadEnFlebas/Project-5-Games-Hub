//* IMPORT

import { createElement } from '../../utils/create-elements'
import { openCloseSection } from '../../utils/open-close-sections'
import { restartGame } from '../../utils/gwent-utils/restart-game'
import { renderGwentBtn } from './render-gwentBtn'
import { gameState } from '../../utils/gwent-utils/gameState/gameState-manager'

export function endGameMessage(winner) {
  const endGameOverlay = createElement('div', {
    className: 'endGameOverlay'
  })

  const endGameContainer = createElement('div', {
    className: 'endGameContainer'
  })

  const endGameWinnerFaction = createElement('img', {
    className: 'endGameWinnerFaction',
    src: '/assets/gwentUtils/gwent_icon.png',
    alt: 'Winner Faction icon',
    title: 'Winner faction icon',
    loading: 'lazy'
  })

  const state = gameState.getState()

  const faction =
    state.player.gems > 0 ? state.player.faction : state.computer.faction

  const factionIcon =
    faction === 'Northern Realms'
      ? '/assets/gwentUtils/northern_realms_icon.png'
      : '/assets/gwentUtils/monsters_icon.png'

  endGameWinnerFaction.src = factionIcon
  endGameWinnerFaction.title = `${faction} icon`
  endGameWinnerFaction.alt = `${faction} icon`

  const endGameText = createElement('h3', {
    className: 'endGameText',
    textContent: `${winner} is the WINNER of this game. Congratulations!`
  })

  const endGameImg = createElement('img', {
    className: 'endGameWinnerImg',
    src: '/assets/gwentUtils/northern_realms_endgame.jpg',
    alt: 'Winner Faction image',
    title: 'Winner faction image',
    loading: 'lazy'
  })

  const factionEndImg =
    faction === 'Northern Realms'
      ? '/assets/northern_realms_endgame.jpg'
      : '/assets/monsters_endgame.avif'

  endGameImg.src = factionEndImg
  endGameImg.title = `${faction} victory image`
  endGameImg.alt = `${faction} victory image`

  const buttonsDiv = createElement('div', { className: 'buttonsDiv' })

  const endGameResetBtn = renderGwentBtn({
    className: 'gwentResetBtn closeGwentBtn endGameResetBtn',
    textContent: 'Restart game',
    onClick: () => {
      document.body.removeChild(endGameOverlay)
      restartGame()
    }
  })

  const endGwentBtn = renderGwentBtn({
    className: 'closeGwentBtn endGwentBtn',
    textContent: '✖︎ Exit game',
    onClick: () => {
      document.body.removeChild(endGameOverlay)
      localStorage.removeItem('gwentStartScreenAlreadyShown')
      localStorage.removeItem('gwentGameState')
      const gwentBoard = document.querySelector('.gwentBoard')
      if (gwentBoard) {
        const cells = gwentBoard.querySelectorAll('.cell')
        cells.forEach((cell) => (cell.innerHTML = ''))
      }
    }
  })

  openCloseSection(endGwentBtn)

  buttonsDiv.append(endGwentBtn, endGameResetBtn)
  endGameContainer.append(
    endGameWinnerFaction,
    endGameText,
    endGameImg,
    buttonsDiv
  )
  endGameOverlay.appendChild(endGameContainer)
  document.body.appendChild(endGameOverlay)
}
