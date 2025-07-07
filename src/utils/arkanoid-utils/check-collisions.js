//* IMPORTS

import { state } from '../../components/arkanoid-components/arkanoid-state'
import { updateScore } from './update-score'
import { gameOver } from '../../components/arkanoid-components/game-over'
import { playBarAndWallCollisionSound } from './sounds/play-bar-and-wall-collision-sound'
import { playBricksCollisionSound } from './sounds/play-bricks-collision-sound'

export function collisionDetection() {
  for (let c = 0; c < state.brickColumns; c++) {
    for (let r = 0; r < state.brickRows; r++) {
      const b = state.bricks[c][r]
      if (b.isBrickOnScreen) {
        if (
          state.ballPositionX > b.x &&
          state.ballPositionX < b.x + state.brickWidth &&
          state.ballPositionY > b.y &&
          state.ballPositionY < b.y + state.brickHeight
        ) {
          state.ballDirectionY = -state.ballDirectionY
          b.hitsLeft--
          if (b.hitsLeft <= 0) {
            b.isBrickOnScreen = false
            state.score += b.score
          }
          updateScore()
          playBricksCollisionSound()
        }
      }
    }
  }

  const bricksRemaining = state.bricks
    .flat()
    .filter((brick) => brick.isBrickOnScreen).length
  if (bricksRemaining === 0) {
    gameOver()
  }

  if (bricksRemaining === 20) {
    state.ballDirectionX = state.ballDirectionX > 0 ? 2.5 : -2.5
    state.ballDirectionY = state.ballDirectionY > 0 ? 2.5 : -2.5
  }
}

export function checkBarCollision() {
  const barTop = state.barPositionY
  const barLeft = state.barPositionX
  const barRight = state.barPositionX + state.barWidth
  const ballBottom = state.ballPositionY + state.ballSize

  const withinBarWidth =
    state.ballPositionX + state.ballSize > barLeft &&
    state.ballPositionX - state.ballSize < barRight

  const hitsTopOfBar =
    ballBottom >= barTop && state.ballPositionY < barTop + state.barHeight

  if (withinBarWidth && hitsTopOfBar) {
    state.ballDirectionY = -state.ballDirectionY

    const hitPoint =
      state.ballPositionX - (state.barPositionX + state.barWidth / 2)
    state.ballDirectionX = hitPoint * 0.05

    playBarAndWallCollisionSound()
  }
}
