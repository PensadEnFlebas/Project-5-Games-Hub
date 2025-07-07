//* IMPORTS

import { state } from '../../components/arkanoid-components/arkanoid-state'

export function updateScore() {
  state.currentGameScore.innerHTML = `<span>CURRENT GAME SCORE:</span> ${state.score}`
}
