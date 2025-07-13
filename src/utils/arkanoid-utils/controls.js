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

      const scaleX = canvas.width / rect.width
      const relativeX = (touch.clientX - rect.left) * scaleX

      let newX = relativeX - state.barWidth / 2

      if (newX < 0) newX = 0
      if (newX > canvas.width - state.barWidth)
        newX = canvas.width - state.barWidth

      state.barPositionX = newX

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
