//* IMPORTS

import { draw } from './draw-game'
import {
  handleKeyDown,
  handleKeyUp,
  handleSpacebarPause
} from '../../utils/arkanoid-utils/controls'
import { state } from './arkanoid-state'

export function startGame() {
  state.bricks.length = 0

  for (let c = 0; c < state.brickColumns; c++) {
    state.bricks[c] = []
    for (let r = 0; r < state.brickRows; r++) {
      // bricks[c][r] = { x: 0, y: 0, isBrickOnScreen: true }
      if (r === 0) {
        state.bricks[c][r] = {
          x: 0,
          y: 0,
          isBrickOnScreen: true,
          hitsLeft: 2,
          score: 2,
          background: [
            { offset: 0, color: 'rgba(2, 0, 36, 1)' },
            { offset: 0.35, color: 'rgba(102, 9, 121, 1)' },
            { offset: 1, color: 'rgba(255, 0, 106, 1)' }
          ]
        }
      } else if (r === 1) {
        state.bricks[c][r] = {
          x: 0,
          y: 0,
          isBrickOnScreen: false,
          hitsLeft: 0,
          score: 0,
          background: []
        }
      } else {
        state.bricks[c][r] = {
          x: 0,
          y: 0,
          isBrickOnScreen: true,
          hitsLeft: 1,
          score: 1,
          background: [
            { offset: 0, color: 'rgba(2, 0, 36, 1)' },
            { offset: 0.35, color: 'rgba(9, 9, 121, 1)' },
            { offset: 1, color: 'rgba(0, 212, 255, 1)' }
          ]
        }
      }
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('keydown', handleSpacebarPause)

  let imagesLoaded = 0
  function checkAllLoaded() {
    imagesLoaded++
    if (imagesLoaded === 2) {
      draw()
    }
  }
  state.barImage.onload = checkAllLoaded
  state.ball.onload = checkAllLoaded
}
