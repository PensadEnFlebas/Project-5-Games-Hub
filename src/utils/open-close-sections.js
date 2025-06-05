//* IMPORTS

import { renderStartScreen } from '../components/gwent-components/render-start-screen'

export function openCloseSection(linkItem) {
  const allSections = [...document.querySelectorAll('section')]
  const hero = document.getElementById('hero')

  linkItem.addEventListener('click', (event) => {
    allSections.forEach((section) => {
      section.classList.remove('visualized')
    })

    const gwentStartScreenAlreadyShown = localStorage.getItem(
      'gwentStartScreenAlreadyShown'
    )

    if (
      linkItem.id === 'logo' ||
      linkItem.classList.contains('h1Name') ||
      linkItem.classList.contains('closeGwentBtn')
    ) {
      hero.classList.add('visualized')
      hero.classList.remove('unblur')
      const gwentOverlay = document.querySelector('.gwentOverlay')
      if (gwentOverlay) {
        gwentOverlay.remove()
      }
      setTimeout(() => {
        hero.classList.add('unblur')
      }, 500)
    } else if (
      linkItem.classList.contains('gwent') &&
      !gwentStartScreenAlreadyShown
    ) {
      renderStartScreen()
      localStorage.setItem('gwentStartScreenAlreadyShown', 'true')
    } else {
      const classList = [...event.currentTarget.classList]
      const matchedSection = allSections.find((section) =>
        classList.includes(section.id)
      )

      if (matchedSection) {
        matchedSection.classList.add('visualized')
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
