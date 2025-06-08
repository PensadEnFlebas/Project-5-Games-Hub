import { playingCard } from '../turns and playing cards/playing-card.js'
import { getBattlefieldStrength } from '../check winner/get-battlefield-strength.js'
import { getRandomItem } from '../get-random-item.js'
import { gameState } from '../gameState/gameState-manager'

export function makeComputerMove() {
  const state = gameState.getState()
  const { computer } = state
  const hand = computer.hand

  const card = getRandomItem(hand)
  const indexCardInHand = hand.findIndex((c) => c.id === card.id)
  if (indexCardInHand === -1) return

  const validLocations = card.boardLocations.filter((location) => {
    const [row, column] = location.split(':')
    const cell = document.querySelector(`.cell.${row}.${column}`)

    if (column !== 'horn') return true
    if (!row.includes('p1')) return true

    const battlefieldCell = document.querySelector(`.cell.${row}.battlefield`)
    const hasBattlefieldCards = battlefieldCell?.querySelector('.gwentCard')
    const hornIsEmpty = !cell?.querySelector('.gwentCard')

    return hasBattlefieldCards && hornIsEmpty
  })

  let targetCell = null
  if (validLocations.some((loc) => loc.includes(':horn'))) {
    const hornLocations = validLocations.filter((loc) => loc.includes(':horn'))

    const strengths = hornLocations.map((loc) => {
      const [row] = loc.split(':')
      return {
        location: loc,
        strength: getBattlefieldStrength(row)
      }
    })

    strengths.sort((a, b) => b.strength - a.strength)
    const bestLocation = strengths[0].location

    targetCell = document.querySelector(
      `.cell.${bestLocation.replace(':', '.')}`
    )
  }

  playingCard(card, indexCardInHand, targetCell)
}
