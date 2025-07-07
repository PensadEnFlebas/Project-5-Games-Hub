//* IMPORTS

import { drawBall, drawBricks, drawBar } from './draw-elements'
import { collisionDetection } from '../../utils/arkanoid-utils/check-collisions'
import { barMovement, ballMovement } from '../../utils/arkanoid-utils/movements'
import { state } from './arkanoid-state'

export function draw() {
  if (state.isGameOver) return

  state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)

  drawBricks()
  drawBall()
  drawBar()

  if (!state.gameStarted) {
    if (state.initPosition) {
      state.ballPositionX = state.barPositionX + state.barWidth / 2
      state.ballPositionY =
        state.canvas.height - state.barHeight - state.ballSize - 20
    }
  } else {
    state.ballPositionX += state.ballDirectionX
    state.ballPositionY += state.ballDirectionY
  }

  collisionDetection()
  barMovement()

  if (state.gameStarted) {
    ballMovement()
  }

  requestAnimationFrame(draw)
}
