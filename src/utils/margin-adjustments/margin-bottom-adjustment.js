//* IMPORTS

import { getFooterHeight } from './get-header-footer-height'

export function adjustMainBottomMargin() {
  const footer = document.querySelector('footer')
  const main = document.querySelector('main')

  const resizeObserver = new ResizeObserver(() => {
    const footerHeight = getFooterHeight()
    main.style.marginBottom = `${footerHeight}px`
  })

  resizeObserver.observe(footer)
}
