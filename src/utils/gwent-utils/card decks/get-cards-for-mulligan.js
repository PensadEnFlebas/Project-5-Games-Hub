export function getCardsForMulligan(gameState) {
  const { deck: playerDeck, hand: playerHand } = gameState.player

  const cardsForMulligan = playerDeck.filter(
    (deckCard) => !playerHand.some((card) => card.id === deckCard.id)
  )

  return cardsForMulligan
}
