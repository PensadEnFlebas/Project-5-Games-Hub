export function cleanBoardgame() {
  console.log('🧹 Clearing board...')

  const rows = [
    '.p1-melee',
    '.p1-range',
    '.p1-siege',
    '.pc-melee',
    '.pc-range',
    '.pc-siege'
  ]

  rows.forEach((rowSelector) => {
    const rowElements = document.querySelectorAll(rowSelector)

    rowElements.forEach((row) => {
      const cards = row.querySelectorAll('.gwentCard')
      cards.forEach((card) => {
        if (
          !card.classList.contains('bossCard') &&
          !card.classList.contains('cardBack')
        ) {
          card.remove()
        }
      })
    })
  })
}
