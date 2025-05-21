//*IMPORTS

import { createElement } from '../../utils/create-elements'

export function hero() {
  const hero = document.getElementById('hero')

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      hero.classList.add('unblur')
    }, 1500)
  })

  const heroContainer = createElement('div', {
    className: 'heroContainer'
  })

  const heroLogo = createElement('img', {
    className: 'heroLogo',
    src: '/assets/goblin_games_favicon.png',
    alt: 'Goblin Games Logo',
    title: 'Goblin Games Logo',
    loading: 'lazy'
  })

  const pHero = createElement('p', {
    className: 'pHero',
    textContent: 'PLAY YOUR FAVOURITE GAMES'
  })

  const pHeroCredits = createElement('p', {
    className: 'pHeroCredits',
    innerHTML:
      '© 2025 Project by <span>Goblin</span> for <span>RockTheCode</span>'
  })

  const arcadeMachineContainer = createElement('div', {
    className: 'arcadeMachineContainer'
  })

  heroContainer.append(heroLogo, pHero, pHeroCredits)
  hero.append(heroContainer, arcadeMachineContainer)
}
