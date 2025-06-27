export function adjustCardStack(cell) {
  if (!cell || !cell.classList.contains('battlefield')) return

  const cards = [...cell.querySelectorAll('.gwentCard')]
  console.log('Cartas en cell:', cards)
  cards.forEach((card, i) => {
    card.style.setProperty(
      'transform',
      i === 0 ? 'none' : `translateX(-${i * 16}px)`,
      'important'
    )
  })
}
