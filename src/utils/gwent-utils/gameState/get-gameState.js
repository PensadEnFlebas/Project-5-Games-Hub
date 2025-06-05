export function getGameState() {
  const savedState = localStorage.getItem('gwentGameState')
  return savedState ? JSON.parse(savedState) : null
}
