class GameStateManager {
  constructor() {
    this._state = null

    this._listeners = new Set()
  }

  getState() {
    if (!this._state) {
      const saved = localStorage.getItem('gwentGameState')
      this._state = saved ? JSON.parse(saved) : null
    }
    return this._state
  }

  setState(newState) {
    this._state = { ...newState }

    localStorage.setItem('gwentGameState', JSON.stringify(this._state))

    this._notifyListeners()
  }

  updateState(updater) {
    const currentState = this.getState()
    const newState =
      typeof updater === 'function'
        ? updater(currentState)
        : { ...currentState, ...updater }

    this.setState(newState)
  }

  subscribe(listener) {
    this._listeners.add(listener)

    return () => this._listeners.delete(listener)
  }

  clearState() {
    this._state = null
    localStorage.removeItem('gwentGameState')

    this._notifyListeners()
  }

  refresh() {
    this._state = null

    this._notifyListeners()
  }

  _notifyListeners() {
    const currentState = this.getState()

    this._listeners.forEach((listener) => {
      try {
        listener(currentState)
      } catch (error) {
        console.error('Error in state listener:', error)
      }
    })
  }

  get currentTurn() {
    return this.getState()?.currentTurn
  }

  get player() {
    return this.getState()?.player
  }

  get computer() {
    return this.getState()?.computer
  }

  get round() {
    return this.getState()?.round
  }

  switchTurn() {
    this.updateState((state) => ({
      ...state,
      currentTurn: state.currentTurn === 'player' ? 'computer' : 'player'
    }))
  }

  calculateScore(isPlayer, points) {
    this.calculateState((state) => ({
      ...state,
      player: {
        ...state.player,
        score: isPlayer ? state.player.score + points : state.player.score
      },
      computer: {
        ...state.computer,
        score: !isPlayer ? state.computer.score + points : state.computer.score
      }
    }))
  }

  resetRoundScores() {
    this.updateState((state) => ({
      ...state,
      player: {
        ...state.player,
        score: 0,
        passed: false
      },
      computer: {
        ...state.computer,
        score: 0,
        passed: false
      },
      round: state.round + 1
    }))
  }

  updateCard(card, currentPlayer, cardType) {
    this.updateState((state) => ({
      ...state,
      [currentPlayer]: {
        ...state[currentPlayer],
        playedCards: {
          ...state[currentPlayer].playedCards,
          [cardType]: state[currentPlayer].playedCards[cardType].map(
            (stateCard) => (stateCard.id === card.id ? card : stateCard)
          )
        }
      }
    }))
  }
}

export const gameState = new GameStateManager()

window.gameState = gameState
