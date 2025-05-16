//* IMPORTS

import { createElement } from '../utils/create-elements'
import { adjustMainBottomMargin } from '../utils/margin-adjustments/margin-bottom-adjustment'
import { adjustMainHeight } from '../utils/margin-adjustments/main-height-adjustment'

export function footer() {
  const footer = document.querySelector('footer')

  const pFooter = createElement('p', {
    className: 'pFooter',
    innerHTML:
      '© 2025 Project by <span>Goblin</span> for <span>RockTheCode</span>'
  })

  footer.append(pFooter)

  adjustMainBottomMargin()

  window.addEventListener('load', () => {
    adjustMainHeight()
    window.addEventListener('resize', adjustMainHeight)
  })
}
