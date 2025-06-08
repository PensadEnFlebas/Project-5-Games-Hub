import {
  northernRealmsList,
  monstersList,
  neutralCardsList
} from '../../../data/gwent-lists'

export function generateDeck(faction) {
  let factionCards

  if (faction === 'Northern Realms') {
    factionCards = northernRealmsList
  } else if (faction === 'Monsters') {
    factionCards = monstersList
  } else {
    throw new Error('Facción no válida')
  }

  const fullDeck = [...factionCards, ...neutralCardsList]

  const shuffledDeck = fullDeck.sort(() => 0.5 - Math.random()).slice(0, 35)

  return shuffledDeck
}

export function getInitialHand(deck, handSize = 10) {
  const shuffledDeck = [...deck].sort(() => 0.5 - Math.random())

  return shuffledDeck.slice(0, handSize)
}
