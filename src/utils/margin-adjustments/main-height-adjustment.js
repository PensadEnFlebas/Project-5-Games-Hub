//* IMPORTS

import { getHeaderHeight, getFooterHeight } from './get-header-footer-height'

export function adjustMainHeight() {
  const main = document.querySelector('main')
  const totalHeight = window.innerHeight
  const headerHeight = getHeaderHeight()
  const footerHeight = getFooterHeight()

  const availableHeight = totalHeight - headerHeight - footerHeight
  main.style.height = `${availableHeight}px`
}
