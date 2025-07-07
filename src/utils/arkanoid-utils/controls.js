//* IMPORTS

import { state } from '../../components/arkanoid-components/arkanoid-state'

export function handleKeyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') state.rightPressed = true
  if (e.key === 'ArrowLeft' || e.key === 'Left') state.leftPressed = true
}

export function handleKeyUp(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') state.rightPressed = false
  if (e.key === 'ArrowLeft' || e.key === 'Left') state.leftPressed = false
}

export function handleSpacebarPause(e) {
  if (e.code === 'Space' || e.key === ' ') {
    e.preventDefault()
    togglePause()
  }
}

export function togglePause() {
  if (state.isGameOver) return
  state.gameStarted = !state.gameStarted
  state.pauseStartBtn.innerText = state.gameStarted ? 'PAUSE' : 'START'

  if (state.gameStarted && state.initPosition) {
    state.initPosition = false
  }
}
