//* IMPORTS

import { state } from './arkanoid-state'

export function drawBall() {
  state.ball.style.left = `${state.ballPositionX - 6}px`
  state.ball.style.top = `${state.ballPositionY - 6}px`
}

export function drawBar() {
  state.ctx.drawImage(
    state.barImage,
    24,
    46,
    state.barWidth,
    state.barHeight,
    state.barPositionX,
    state.barPositionY,
    state.barWidth,
    state.barHeight
  )
}

export function drawBricks() {
  for (let c = 0; c < state.brickColumns; c++) {
    for (let r = 0; r < state.brickRows; r++) {
      const b = state.bricks[c][r]
      if (b.isBrickOnScreen) {
        const brickX =
          c * (state.brickWidth + state.brickPadding) +
          state.brickDistanceFromLeft
        const brickY =
          r * (state.brickHeight + state.brickPadding) +
          state.brickDistanceFromTop
        b.x = brickX
        b.y = brickY
        state.ctx.beginPath()
        state.ctx.rect(brickX, brickY, state.brickWidth, state.brickHeight)

        let gradient
        if (r === 0) {
          gradient = state.ctx.createLinearGradient(
            brickX,
            brickY,
            brickX + state.brickWidth,
            brickY + state.brickHeight
          )
          gradient.addColorStop(0, 'rgb(73, 1, 92)')
          gradient.addColorStop(0.35, 'rgb(119, 40, 104)')
          gradient.addColorStop(1, 'rgba(255, 0, 106, 1)')
        } else {
          gradient = state.ctx.createLinearGradient(
            brickX,
            brickY,
            brickX + state.brickWidth,
            brickY + state.brickHeight
          )
          gradient.addColorStop(0, 'rgb(7, 1, 135)')
          gradient.addColorStop(0.35, 'rgb(36, 36, 120)')
          gradient.addColorStop(1, 'rgba(0, 212, 255, 1)')
        }

        state.ctx.fillStyle = gradient
        state.ctx.fill()

        state.ctx.lineWidth = 0.5
        state.ctx.strokeStyle = 'whitesmoke'
        state.ctx.stroke()

        state.ctx.closePath()
      }
    }
  }
}
