export function setGameState(updatedState) {
  localStorage.setItem('gwentGameState', JSON.stringify(updatedState))
}
