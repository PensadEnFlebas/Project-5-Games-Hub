export function createGameState(gameState) {
  const {
    playerDeck,
    computerDeck,
    playerHand,
    computerHand,
    currentTurn,
    playerFaction,
    computerFaction,
    playerBoss,
    computerBoss,
    playerRemaining,
    computerRemaining,
    playerDeadCards,
    computerDeadCards
  } = gameState

  return {
    round: 1,
    currentTurn,
    player: {
      faction: playerFaction,
      deck: [...playerDeck],
      hand: [...playerHand],
      remainingCards: playerRemaining || [],
      deadCards: playerDeadCards || [],
      playedCards: { unit: [], special: [], boss: [] },
      bossUsed: false,
      score: 0,
      gems: 2,
      passed: false,
      boss: playerBoss
    },
    computer: {
      faction: computerFaction,
      deck: [...computerDeck],
      hand: [...computerHand],
      remainingCards: computerRemaining || [],
      deadCards: computerDeadCards || [],
      playedCards: { unit: [], special: [], boss: [] },
      bossUsed: false,
      score: 0,
      gems: 2,
      passed: false,
      boss: computerBoss
    },
    battlefieldEffects: {
      frost: false,
      fog: false,
      rain: false
    },
    moraleRows: [],
    usedSpecials: []
  }
}
