export function getHeaderHeight() {
  const header = document.querySelector('header')
  return header.getBoundingClientRect().height
}

export function getFooterHeight() {
  const footer = document.querySelector('footer')
  return footer.getBoundingClientRect().height
}
