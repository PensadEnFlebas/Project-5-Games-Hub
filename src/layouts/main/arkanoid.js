//* IMPORTS
import { createElement } from '../../utils/create-elements'

//? CANVAS SETUP
const canvas = createElement('canvas', {
  width: 606,
  height: 530
})
const ctx = canvas.getContext('2d')

const canvasContainer = createElement('div', { className: 'canvasContainer' })
const arkanoidOverlay = createElement('div', {
  className: 'arkanoidOverlay hidden'
})
const arkanoidShadowedLogo = createElement('img', {
  id: 'arkanoidShadowedLogo',
  src: '/assets/Arkanoid-logo.png',
  alt: 'Arkanoid logo',
  title: 'Arkanoid logo',
  loading: 'lazy'
})
const pauseStartBtn = renderArkanoidBtn({
  className: 'pauseStartBtn',
  innerText: 'START',
  onClick: togglePause
})

//? GAME STATE
let isGameOver = false
let score = 0
let bestScoreValue = localStorage.getItem('arkanoidBestScore') || 0
let gameStarted = false
let initPosition = true

let currentGameScore = createElement('h3', {
  className: 'currentGameScore',
  innerHTML: `<span>CURRENT GAME SCORE:</span> 0`
})

//? BAR
const barWidth = 100
const barHeight = 24
let barPositionX = (canvas.width - barWidth) / 2
const barPositionY = canvas.height - barHeight - 30
const barImage = new Image()
barImage.src = '/assets/arkanoid_bar.png'

let rightPressed = false
let leftPressed = false

//? BALL
const ball = createElement('img', {
  id: 'ball',
  src: '/assets/arkanoid_ball.webp',
  width: 18,
  height: 18
})
const ballSize = 9
let ballPositionX = canvas.width / 2
let ballPositionY = canvas.height - barHeight - ballSize - 30
let ballDirectionX = 2
let ballDirectionY = -2

//? BRICKS
const brickRows = 8
const brickColumns = 15
const brickWidth = 35
const brickHeight = 12
const brickPadding = 1.1
const brickDistanceFromTop = 30
const brickDistanceFromLeft = 33

const bricks = []
let allBricksDestroyed = bricks.flat().every((brick) => !brick.isBrickOnScreen)

//? ENTRY POINT
export function arkanoid() {
  const arkanoidSection = document.querySelector('#arkanoid')

  const logoContainer = createElement('div', { className: 'logoContainer' })

  const scoreContainer = createElement('div', { className: 'scoreContainer' })
  const bestScore = createElement('h4', {
    className: 'bestScore',
    innerHTML: `<span>Best score:</span> ${bestScoreValue}`
  })

  const lastScore = createElement('h4', {
    className: 'lastScore',
    innerHTML: `<span>Last game score:</span> ${
      localStorage.getItem('arkanoidLastScore') || 0
    }`
  })

  logoContainer.append(arkanoidShadowedLogo, pauseStartBtn)
  scoreContainer.append(bestScore, currentGameScore, lastScore)
  canvasContainer.append(canvas, ball)
  arkanoidSection.append(logoContainer, canvasContainer, scoreContainer)

  startGame()
}

//? START GAME
function startGame() {
  bricks.length = 0

  for (let c = 0; c < brickColumns; c++) {
    bricks[c] = []
    for (let r = 0; r < brickRows; r++) {
      // bricks[c][r] = { x: 0, y: 0, isBrickOnScreen: true }
      if (r === 0) {
        bricks[c][r] = {
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
        bricks[c][r] = {
          x: 0,
          y: 0,
          isBrickOnScreen: false,
          hitsLeft: 0,
          score: 0,
          background: []
        }
      } else {
        bricks[c][r] = {
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
  barImage.onload = checkAllLoaded
  ball.onload = checkAllLoaded
}

//? CONTROLES
function handleKeyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') rightPressed = true
  if (e.key === 'ArrowLeft' || e.key === 'Left') leftPressed = true
}

function handleKeyUp(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') rightPressed = false
  if (e.key === 'ArrowLeft' || e.key === 'Left') leftPressed = false
}

function handleSpacebarPause(e) {
  if (e.code === 'Space' || e.key === ' ') {
    e.preventDefault()
    togglePause()
  }
}

function togglePause() {
  if (isGameOver) return
  gameStarted = !gameStarted
  pauseStartBtn.innerText = gameStarted ? 'PAUSE' : 'START'

  if (gameStarted && initPosition) {
    initPosition = false
  }
}

//? DIBUJAR ELEMENTOS

function drawBall() {
  ball.style.left = `${ballPositionX - 6}px`
  ball.style.top = `${ballPositionY - 6}px`
}

function drawBar() {
  ctx.drawImage(
    barImage,
    24,
    46,
    barWidth,
    barHeight,
    barPositionX,
    barPositionY,
    barWidth,
    barHeight
  )
}

function drawBricks() {
  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      const b = bricks[c][r]
      if (b.isBrickOnScreen) {
        const brickX = c * (brickWidth + brickPadding) + brickDistanceFromLeft
        const brickY = r * (brickHeight + brickPadding) + brickDistanceFromTop
        b.x = brickX
        b.y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)

        let gradient
        if (r === 0) {
          gradient = ctx.createLinearGradient(
            brickX,
            brickY,
            brickX + brickWidth,
            brickY + brickHeight
          )
          gradient.addColorStop(0, 'rgb(73, 1, 92)')
          gradient.addColorStop(0.35, 'rgb(119, 40, 104)')
          gradient.addColorStop(1, 'rgba(255, 0, 106, 1)')
        } else {
          gradient = ctx.createLinearGradient(
            brickX,
            brickY,
            brickX + brickWidth,
            brickY + brickHeight
          )
          gradient.addColorStop(0, 'rgb(7, 1, 135)')
          gradient.addColorStop(0.35, 'rgb(36, 36, 120)')
          gradient.addColorStop(1, 'rgba(0, 212, 255, 1)')
        }

        ctx.fillStyle = gradient
        ctx.fill()

        ctx.lineWidth = 0.5
        ctx.strokeStyle = 'whitesmoke'
        ctx.stroke()

        ctx.closePath()
      }
    }
  }
}

//? DETECCIÓN DE COLISIONES

function collisionDetection() {
  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      const b = bricks[c][r]
      if (b.isBrickOnScreen) {
        if (
          ballPositionX > b.x &&
          ballPositionX < b.x + brickWidth &&
          ballPositionY > b.y &&
          ballPositionY < b.y + brickHeight
        ) {
          ballDirectionY = -ballDirectionY
          b.hitsLeft--
          if (b.hitsLeft <= 0) {
            b.isBrickOnScreen = false
            score += b.score
          }
          updateScore()
          playBricksCollisionSound()
        }
      }
    }
  }

  const bricksRemaining = bricks
    .flat()
    .filter((brick) => brick.isBrickOnScreen).length
  if (bricksRemaining === 0) {
    gameOver()
  }

  if (bricksRemaining === 20) {
    ballDirectionX = ballDirectionX > 0 ? 2.5 : -2.5
    ballDirectionY = ballDirectionY > 0 ? 2.5 : -2.5
  }
}

function checkBarCollision() {
  const barTop = barPositionY
  const barLeft = barPositionX
  const barRight = barPositionX + barWidth
  const ballBottom = ballPositionY + ballSize

  const withinBarWidth =
    ballPositionX + ballSize > barLeft && ballPositionX - ballSize < barRight

  const hitsTopOfBar =
    ballBottom >= barTop && ballPositionY < barTop + barHeight

  if (withinBarWidth && hitsTopOfBar) {
    ballDirectionY = -ballDirectionY

    const hitPoint = ballPositionX - (barPositionX + barWidth / 2)
    ballDirectionX = hitPoint * 0.05

    playBarAndWallCollisionSound()
  }
}

//? BUCLE PRINCIPAL

function draw() {
  if (isGameOver) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBricks()
  drawBall()
  drawBar()

  if (!gameStarted) {
    if (initPosition) {
      ballPositionX = barPositionX + barWidth / 2
      ballPositionY = canvas.height - barHeight - ballSize - 20
    }
  } else {
    ballPositionX += ballDirectionX
    ballPositionY += ballDirectionY
  }

  collisionDetection()
  barMovement()

  if (gameStarted) {
    ballMovement()
  }

  requestAnimationFrame(draw)
}

//? MOVEMENTS

function ballMovement() {
  ballPositionX += ballDirectionX
  ballPositionY += ballDirectionY

  if (
    ballPositionX + ballDirectionX > canvas.width - ballSize ||
    ballPositionX + ballDirectionX < ballSize
  ) {
    ballDirectionX = -ballDirectionX
    playBarAndWallCollisionSound()
  }

  if (ballPositionY + ballDirectionY < ballSize) {
    ballDirectionY = -ballDirectionY
    playBarAndWallCollisionSound()
  }

  const isBallAndBarInTheSameRow =
    ballPositionX > barPositionX && ballPositionX < barPositionX + barWidth
  const isBallAndBarInTheSameColumn =
    ballPositionY + ballDirectionY > barPositionY

  if (isBallAndBarInTheSameRow && isBallAndBarInTheSameColumn) {
    checkBarCollision()
  } else if (ballPositionY + ballDirectionY > canvas.height - ballSize) {
    gameOver()
    return
  }
}

function barMovement() {
  if (!gameStarted && !initPosition) return

  if (rightPressed && barPositionX < canvas.width - barWidth) {
    barPositionX += 5
  } else if (leftPressed && barPositionX > 0) {
    barPositionX -= 5
  }
}

//? GAME OVER

function gameOver() {
  isGameOver = true

  allBricksDestroyed = bricks
    .flat()
    .every((brick) => brick && !brick.isBrickOnScreen)

  if (!allBricksDestroyed) {
    ball.src = '/assets/skull.gif'
    ball.width = 40
    ball.height = 40

    playEndImpactSound()
  } else {
    ball.src = '/assets/fireworks.gif'
    ball.width = 80
    ball.height = 80

    playFireworksSound()
  }

  localStorage.setItem('arkanoidLastScore', score)

  if (score > bestScoreValue) {
    bestScoreValue = score
    localStorage.setItem('arkanoidBestScore', bestScoreValue)
  }

  const bestScore = document.querySelector('.bestScore')
  const lastScore = document.querySelector('.lastScore')

  if (bestScore) {
    bestScore.innerHTML = `<span>Best score:</span> ${bestScoreValue}`
  }

  if (lastScore) {
    lastScore.innerHTML = `<span>Last game score:</span> ${score}`
  }

  setTimeout(() => {
    renderArkanoidOverlay()
  }, 2000)
}

//? GAME OVER OVERLAY

function renderArkanoidOverlay() {
  arkanoidOverlay.classList.remove('hidden')
  arkanoidOverlay.innerHTML = ''

  const arkanoidOverlayContainer = createElement('div', {
    className: 'arkanoidOverlayContainer'
  })

  const arkanoidOverlayLogo = createElement('img', {
    className: 'arkanoidOverlayLogo',
    src: '/assets/Arkanoid-logo.png',
    alt: 'Arkanoid logo',
    title: 'Arkanoid logo',
    loading: 'lazy'
  })

  const arkanoidOverlayText = createElement('h3', {
    className: 'arkanoidOverlayText',
    textContent: allBricksDestroyed ? 'VICTORY! 🚀' : 'GAME OVER ☠️'
  })

  const arkanoidOverlayScore = createElement('h4', {
    className: 'arkanoidOverlayScoresDiv',
    textContent: `YOUR SCORE: ${score}`
  })

  const arkanoidOverlayBtn = renderArkanoidBtn({
    className: 'arkanoidOverlayBtn',
    textContent: 'Play again',

    onClick: () => {
      resetGame()
      arkanoidOverlay.classList.add('hidden')
    }
  })

  arkanoidOverlayContainer.append(
    arkanoidOverlayLogo,
    arkanoidOverlayText,
    barImage,
    arkanoidOverlayScore,
    arkanoidOverlayBtn
  )
  arkanoidOverlay.appendChild(arkanoidOverlayContainer)
  document.body.appendChild(arkanoidOverlay)
}

//? RESET GAME

function resetGame() {
  isGameOver = false
  gameStarted = false
  initPosition = true
  score = 0
  ball.src = '/assets/arkanoid_ball.webp'
  pauseStartBtn.innerText = 'START'
  updateScore()

  barPositionX = (canvas.width - barWidth) / 2

  ball.width = 18
  ball.height = 18
  ballPositionX = canvas.width / 2
  ballPositionY = canvas.height - barHeight - ballSize - 30
  ballDirectionX = 2
  ballDirectionY = -2

  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      bricks[c][r].isBrickOnScreen = r !== 1
    }
  }

  arkanoidOverlay.classList.add('hidden')

  draw()
}

//? UPDATE SCORE

function updateScore() {
  currentGameScore.innerHTML = `<span>CURRENT GAME SCORE:</span> ${score}`
}

//? BUTTONS

function renderArkanoidBtn({ onClick, ...attributes }) {
  const arkanoidBtn = createElement('button', attributes)

  arkanoidBtn.addEventListener('click', onClick)

  return arkanoidBtn
}

//? SOUNDS

function playBarAndWallCollisionSound() {
  const audio = new Audio('/sounds/pong.mp3')
  audio.play()
}

function playBricksCollisionSound() {
  const audio = new Audio('/sounds/notification1.mp3')
  audio.play()
}

function playEndImpactSound() {
  const audio = new Audio('/sounds/impact.mp3')
  audio.play()
}

function playFireworksSound() {
  const audio = new Audio('/sounds/fireworks.mp3')
  audio.play()
}
