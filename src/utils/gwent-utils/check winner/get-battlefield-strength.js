export function getBattlefieldStrength(row, gameState) {
  const battlefieldCell = document.querySelector(`.cell.${row}.battlefield`)
  const cardsElements = battlefieldCell.querySelectorAll('.gwentCard')

  let totalStrength = 0

  cardsElements.forEach((cardEl) => {
    const cardId = cardEl.id
    const cardData = gameState.computer.deck.find((c) => c.id === cardId)

    if (cardData) {
      totalStrength += cardData.strength
    }
  })

  return totalStrength
}
