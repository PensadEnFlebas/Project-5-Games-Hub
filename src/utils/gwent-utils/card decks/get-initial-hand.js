export function getInitialHand(deck, handSize = 10) {
  const shuffledDeck = [...deck].sort(() => 0.5 - Math.random())

  return shuffledDeck.slice(0, handSize)
}
