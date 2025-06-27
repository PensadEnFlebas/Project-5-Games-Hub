import { gameState } from '../gameState/gameState-manager'

export function updateScore(owner) {
  const state = gameState.getState()
  const played = state[owner].playedCards

  const types = ['unit', 'boss', 'special']
  let totalScore = 0

  types.forEach((type) => {
    played[type].forEach((card) => {
      totalScore += card.strength
    })
  })

  gameState.updateState((state) => ({
    ...state,
    [owner]: {
      ...state[owner],
      score: totalScore
    }
  }))

  const playerText = document.querySelector(
    `.cell.${owner === 'player' ? 'p1' : 'pc'}-range .playerText`
  )

  if (playerText) {
    const name = owner === 'player' ? 'PLAYER' : 'COMPUTER'
    playerText.textContent = `${name}: ${totalScore}`
  }
}
