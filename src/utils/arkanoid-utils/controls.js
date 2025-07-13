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

export function touchControls() {
  const canvas = state.canvas
  if (!canvas) return

  canvas.addEventListener(
    'touchmove',
    (e) => {
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const relativeX = touch.clientX - rect.left

      if (relativeX > 0 && relativeX < canvas.width) {
        state.barPositionX = relativeX - state.barWidth / 2
      }

      e.preventDefault()
    },
    { passive: false }
  )
}

export function handleSpacebarPause(e) {
  if (e.code === 'Space' || e.key === ' ') {
    e.preventDefault()
    togglePause()
  }
}

export function togglePause() {
  const arkanoidSection = document.getElementById('arkanoid')
  const isArkanoidVisible = arkanoidSection?.classList.contains('visualized')

  if (!isArkanoidVisible) return

  if (state.isGameOver) return
  state.gameStarted = !state.gameStarted
  state.pauseStartBtn.innerText = state.gameStarted ? 'PAUSE' : 'START'

  if (state.gameStarted && state.initPosition) {
    state.initPosition = false
  }
}
