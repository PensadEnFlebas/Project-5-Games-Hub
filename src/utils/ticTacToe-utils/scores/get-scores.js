export function getScores() {
  const saved = localStorage.getItem('tttScores')

  if (!saved) {
    return {
      player: 0,
      computer: 0,
      draw: 0
    }
  }

  try {
    return JSON.parse(saved)
  } catch (error) {
    console.error('Error parsing scores from localStorage:', error)
    return {
      player: 0,
      computer: 0,
      draw: 0
    }
  }
}
