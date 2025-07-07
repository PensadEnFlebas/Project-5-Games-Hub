//* IMPORTS

import { state } from '../../components/arkanoid-components/arkanoid-state'
import { updateScore } from './update-score'
import { draw } from '../../components/arkanoid-components/draw-game'

export function resetGame() {
  state.isGameOver = false
  state.gameStarted = false
  state.initPosition = true
  state.score = 0
  state.ball.src = '/assets/arkanoid_ball.webp'
  state.pauseStartBtn.innerText = 'START'
  updateScore()

  state.barPositionX = (state.canvas.width - state.barWidth) / 2

  state.ball.width = 18
  state.ball.height = 18
  state.ballPositionX = state.canvas.width / 2
  state.ballPositionY =
    state.canvas.height - state.barHeight - state.ballSize - 30
  state.ballDirectionX = 2
  state.ballDirectionY = -2

  for (let c = 0; c < state.brickColumns; c++) {
    for (let r = 0; r < state.brickRows; r++) {
      state.bricks[c][r].isBrickOnScreen = r !== 1
    }
  }

  state.arkanoidOverlay.classList.add('hidden')

  draw()
}
