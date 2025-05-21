//* IMPORTS

import { createElement } from '../utils/create-elements'
import { gamesList } from '../data/games-list'
import { adjustMainTopMargin } from '../utils/margin-adjustments/margin-top-adjustment'
import { openCloseSection } from '../utils/open-close-sections'

export function header() {
  const header = document.querySelector('header')

  const logo = createElement('img', {
    id: 'logo',
    src: '/assets/goblin_games_favicon.png',
    alt: 'Goblin Games Icon',
    title: 'Goblin Games',
    loading: 'lazy'
  })

  openCloseSection(logo)

  const h1Name = createElement('h1', {
    className: 'h1Name',
    textContent: 'Goblin Games'
  })

  openCloseSection(h1Name)

  const gamesListContainer = createElement('nav', {
    className: 'gamesListContainer'
  })

  const gamesUl = createElement('ul', {
    className: 'gamesUl'
  })

  gamesList.forEach((game) => {
    const gameLi = createElement('li', {
      className: 'gameLi'
    })

    const gameLink = createElement('a', {
      id: `${game.name.toLowerCase().replace(/\s+/g, '')}Link`,
      className: `gameLink ${game.name.toLowerCase().replace(/\s+/g, '')}`,
      src: game.src,
      'aria-label': `Link to ${game.name}`,
      rel: 'noopener noreferrer'
    })

    openCloseSection(gameLink)

    const gameLogo = createElement('img', {
      id: `${game.name.toLowerCase().replace(/\s+/g, '')}Logo`,
      className: 'gameLogo',
      src: game.src,
      alt: `${game.name} Logo`,
      title: `${game.name}`,
      loading: 'lazy'
    })

    gameLink.appendChild(gameLogo)
    gameLi.appendChild(gameLink)
    gamesUl.appendChild(gameLi)
  })

  gamesListContainer.appendChild(gamesUl)
  header.append(logo, h1Name, gamesListContainer)

  adjustMainTopMargin()
}
