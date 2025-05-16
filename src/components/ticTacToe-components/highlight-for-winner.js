export function highlightForWinner(winnerCombo) {
  const allBoxes = document.querySelectorAll('.tttBox')

  if (winnerCombo.length === 0) {
    allBoxes.forEach((box) => box.classList.add('loserBox'))
  } else {
    allBoxes.forEach((box, i) => {
      if (!winnerCombo.includes(i)) {
        box.classList.add('loserBox')
      }
    })
  }
}
