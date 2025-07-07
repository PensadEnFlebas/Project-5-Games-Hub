//* IMPORTS

import { state } from '../../components/arkanoid-components/arkanoid-state'
import { playBarAndWallCollisionSound } from './sounds/play-bar-and-wall-collision-sound'
import { checkBarCollision } from './check-collisions'
import { gameOver } from '../../components/arkanoid-components/game-over'

export function ballMovement() {
  state.ballPositionX += state.ballDirectionX
  state.ballPositionY += state.ballDirectionY

  if (
    state.ballPositionX + state.ballDirectionX >
      state.canvas.width - state.ballSize ||
    state.ballPositionX + state.ballDirectionX < state.ballSize
  ) {
    state.ballDirectionX = -state.ballDirectionX
    playBarAndWallCollisionSound()
  }

  if (state.ballPositionY + state.ballDirectionY < state.ballSize) {
    state.ballDirectionY = -state.ballDirectionY
    playBarAndWallCollisionSound()
  }

  const isBallAndBarInTheSameRow =
    state.ballPositionX > state.barPositionX &&
    state.ballPositionX < state.barPositionX + state.barWidth
  const isBallAndBarInTheSameColumn =
    state.ballPositionY + state.ballDirectionY > state.barPositionY

  if (isBallAndBarInTheSameRow && isBallAndBarInTheSameColumn) {
    checkBarCollision()
  } else if (
    state.ballPositionY + state.ballDirectionY >
    state.canvas.height - state.ballSize
  ) {
    gameOver()
    return
  }
}

export function barMovement() {
  if (!state.gameStarted && !state.initPosition) return

  if (
    state.rightPressed &&
    state.barPositionX < state.canvas.width - state.barWidth
  ) {
    state.barPositionX += 5
  } else if (state.leftPressed && state.barPositionX > 0) {
    state.barPositionX -= 5
  }
}
