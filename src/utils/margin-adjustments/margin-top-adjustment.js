//* IMPORTS

import { getHeaderHeight } from './get-header-footer-height'

export function adjustMainTopMargin() {
  const header = document.querySelector('header')
  const main = document.querySelector('main')

  const resizeObserver = new ResizeObserver(() => {
    const headerHeight = getHeaderHeight()
    main.style.marginTop = `${headerHeight}px`
  })

  resizeObserver.observe(header)
}
