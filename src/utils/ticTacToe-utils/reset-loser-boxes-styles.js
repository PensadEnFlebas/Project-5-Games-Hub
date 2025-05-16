export function clearLoserBoxes() {
  document.querySelectorAll('.tttBox').forEach((box) => {
    box.classList.remove('loserBox')
  })
}
