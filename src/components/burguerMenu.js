//* IMPORTS

import { createElement } from '../utils/create-elements'
import { gamesList } from '../data/games-list'
import { openCloseSection } from '../utils/open-close-sections'

export function burgerMenu() {
  const body = document.querySelector('body')

  const burgerBtn = createElement('button', {
    className: 'burgerBtn',
    textContent: '☰',
    'aria-label': 'Desplegar menú'
  })

  const overlay = createElement('div', {
    className: 'burgerOverlay hidden'
  })

  const burgerMenuDiv = createElement('nav', {
    className: 'burgerMenuDiv'
  })

  const burgerMenuList = createElement('ul', {
    className: 'burgerMenuList'
  })

  gamesList.forEach((game) => {
    const burgerMenuItem = createElement('li', {
      className: 'burgerMenuItem'
    })

    const burgerMenuLink = createElement('a', {
      className: `burgerMenuLink ${game.name
        .toLowerCase()
        .replace(/\s+/g, '')}`,
      'aria-label': `Open ${game.name}`,
      rel: 'noopener noreferrer'
    })

    openCloseSection(burgerMenuLink)

    const gameLogoBurgerMenu = createElement('img', {
      className: 'gameLogoBurgerMenu',
      src: game.src,
      alt: `${game.name} Logo`,
      title: `${game.name}`,
      loading: 'lazy'
    })

    burgerMenuLink.addEventListener('click', (e) => {
      e.preventDefault()

      overlay.classList.add('hidden')
      overlay.classList.remove('visible')
      burgerBtn.textContent = '☰'
    })

    burgerMenuLink.appendChild(gameLogoBurgerMenu)
    burgerMenuItem.appendChild(burgerMenuLink)
    burgerMenuList.appendChild(burgerMenuItem)
  })

  burgerMenuDiv.appendChild(burgerMenuList)
  overlay.appendChild(burgerMenuDiv)
  body.append(burgerBtn, overlay)

  burgerBtn.addEventListener('click', () => {
    const isOpen = !overlay.classList.contains('hidden')
    overlay.classList.toggle('hidden')
    overlay.classList.toggle('visible')
    burgerBtn.textContent = isOpen ? '☰' : '✖︎'
  })

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.add('hidden')
      overlay.classList.remove('visible')
      burgerBtn.textContent = '☰'
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) {
      overlay.classList.add('hidden')
      overlay.classList.remove('visible')
      burgerBtn.textContent = '☰'
    }
  })
}
