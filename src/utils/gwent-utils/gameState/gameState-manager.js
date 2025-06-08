class GameStateManager {
  constructor() {
    this._state = null

    // Set to store callback functions that want to be notified when state changes
    // Using Set instead of Array for better performance and automatic deduplication
    this._listeners = new Set()
  }

  // Get current state (always fresh)
  getState() {
    // Lazy loading pattern: only load from localStorage when needed
    if (!this._state) {
      const saved = localStorage.getItem('gwentGameState')
      this._state = saved ? JSON.parse(saved) : null
    }
    return this._state
  }

  // Update state and notify listeners
  setState(newState) {
    // Update the in-memory state with a complete new state object
    // Using spread operator to create a new object (prevents mutation issues)
    this._state = { ...newState }

    // Persist to localStorage immediately
    localStorage.setItem('gwentGameState', JSON.stringify(this._state))

    // Tell all subscribers that state has changed
    this._notifyListeners()
  }

  // Update specific parts of state
  updateState(updater) {
    // The updater can be either:
    // 1. A function that receives current state and returns new state
    // 2. An object that gets merged with current state
    const currentState = this.getState()
    const newState =
      typeof updater === 'function'
        ? updater(currentState) // Function: updater(currentState) => newState
        : { ...currentState, ...updater } // Object: merge with current

    this.setState(newState)
  }

  // === OBSERVER PATTERN (for UI updates) ===

  // Subscribe to state changes
  subscribe(listener) {
    // Add a callback function to be called whenever state changes

    this._listeners.add(listener)
    // Return an "unsubscribe" function for cleanup
    // This is a closure that remembers the specific listener to remove
    return () => this._listeners.delete(listener) // Return unsubscribe function
  }

  // Clear state
  clearState() {
    // Reset everything - useful for "New Game" or logout
    this._state = null
    localStorage.removeItem('gwentGameState')
    // Notify everyone that state is now empty
    this._notifyListeners()
  }

  // Force refresh from localStorage (useful after external changes)
  refresh() {
    // Force reload from localStorage (useful if another tab modified it)
    this._state = null

    // Next getState() call will reload from localStorage
    // Notify listeners of potential change
    this._notifyListeners()
  }

  // Private method to notify all listeners
  _notifyListeners() {
    // Private method (underscore convention) to call all subscriber functions
    const currentState = this.getState()

    // Call each listener function with the current state
    this._listeners.forEach((listener) => {
      try {
        // Wrap in try-catch so one broken listener doesn't break others
        listener(currentState)
      } catch (error) {
        console.error('Error in state listener:', error)
      }
    })
  }

  // Convenient getters for common state parts
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

  // Specific game actions
  switchTurn() {
    this.updateState((state) => ({
      ...state,
      currentTurn: state.currentTurn === 'player' ? 'computer' : 'player'
    }))
  }

  updateScore(isPlayer, points) {
    this.updateState((state) => ({
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
      player: { ...state.player, score: 0, passed: false },
      computer: { ...state.computer, score: 0, passed: false },
      round: state.round + 1
    }))
  }
}

// === SINGLETON PATTERN ===

// Create ONE instance that the entire app shares
export const gameState = new GameStateManager()

// For debugging
window.gameState = gameState

// === USAGE EXAMPLES FOR YOUR GWENT GAME ===

/*
// 1. READING STATE (replaces your getGameState() calls)
const state = gameState.getState();
console.log('Current turn:', state.currentTurn);
console.log('Player score:', state.player.score);

// Or use the convenient getters:
console.log('Current turn:', gameState.currentTurn);
console.log('Player score:', gameState.player.score);

// 2. UPDATING STATE (replaces your setGameState() calls)

// Simple property updates:
gameState.updateState({ round: 2 });

// Complex updates with functions:
gameState.updateState(state => ({
  ...state,
  player: {
    ...state.player,
    hand: state.player.hand.filter(card => card.id !== 'card-to-remove')
  }
}));

// 3. SPECIALIZED GAME ACTIONS
gameState.switchTurn();                    // Switch between player/computer
gameState.updateScore(true, 5);           // Add 5 points to player
gameState.updateScore(false, 3);          // Add 3 points to computer
gameState.resetRoundScores();             // End of round cleanup

// 4. LISTENING TO CHANGES (for UI updates)
const unsubscribe = gameState.subscribe((state) => {
  console.log('State changed!', state);
  updateUI(); // Update your DOM elements
});

// When component is destroyed or no longer needed:
unsubscribe(); // Stop listening to prevent memory leaks

// 5. GAME LIFECYCLE
gameState.clearState();  // Start fresh game
gameState.refresh();     // Reload from localStorage (if another tab changed it)
*/
