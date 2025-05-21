export function openCloseSection(linkItem) {
  const allSections = [...document.querySelectorAll('section')]
  const hero = document.getElementById('hero')

  linkItem.addEventListener('click', (event) => {
    allSections.forEach((section) => {
      section.classList.remove('visualized')
    })

    if (linkItem.id === 'logo' || linkItem.classList.contains('h1Name')) {
      hero.classList.add('visualized')
      hero.classList.remove('unblur')
      setTimeout(() => {
        hero.classList.add('unblur')
      }, 500)
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
