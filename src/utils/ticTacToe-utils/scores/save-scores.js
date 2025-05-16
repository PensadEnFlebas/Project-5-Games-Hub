export function saveScores(scores) {
  localStorage.setItem('tttScores', JSON.stringify(scores))
}
