//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { renderArkanoidBtn } from './arkanoid-button'
import { togglePause } from '../../utils/arkanoid-utils/controls'

export const state = {
  //? CANVAS SETUP
  canvas: createElement('canvas', {
    width: 606,
    height: 530
  }),
  ctx: null,

  canvasContainer: createElement('div', {
    className: 'canvasContainer'
  }),
  arkanoidOverlay: createElement('div', {
    className: 'arkanoidOverlay hidden'
  }),
  arkanoidShadowedLogo: createElement('img', {
    id: 'arkanoidShadowedLogo',
    src: '/assets/Arkanoid-logo.png',
    alt: 'Arkanoid logo',
    title: 'Arkanoid logo',
    loading: 'lazy'
  }),
  pauseStartBtn: renderArkanoidBtn({
    className: 'pauseStartBtn',
    innerText: 'START',
    onClick: togglePause
  }),

  //? GAME STATE
  isGameOver: false,
  score: 0,
  bestScoreValue: localStorage.getItem('arkanoidBestScore') || 0,
  gameStarted: false,
  initPosition: true,

  currentGameScore: createElement('h3', {
    className: 'currentGameScore',
    innerHTML: `<span>CURRENT GAME SCORE:</span> 0`
  }),

  //? BAR
  barWidth: 100,
  barHeight: 24,
  barPositionX: 0,
  barPositionY: 0,
  barImage: (() => {
    const img = new Image()
    img.src = '/assets/arkanoid_bar.png'
    return img
  })(),
  rightPressed: false,
  leftPressed: false,

  //? BALL
  ball: createElement('img', {
    id: 'ball',
    src: '/assets/arkanoid_ball.webp',
    width: 18,
    height: 18
  }),
  ballSize: 9,
  ballPositionX: 0,
  ballPositionY: 0,
  ballDirectionX: 2,
  ballDirectionY: -2,

  //? BRICKS
  brickRows: 8,
  brickColumns: 15,
  brickWidth: 35,
  brickHeight: 12,
  brickPadding: 1.1,
  brickDistanceFromTop: 30,
  brickDistanceFromLeft: 33,
  bricks: [],
  get allBricksDestroyed() {
    return this.bricks.flat().every((brick) => !brick.isBrickOnScreen)
  }
}

state.ctx = state.canvas.getContext('2d')
state.barPositionX = (state.canvas.width - state.barWidth) / 2
state.barPositionY = state.canvas.height - state.barHeight - 30
state.ballPositionX = state.canvas.width / 2
state.ballPositionY =
  state.canvas.height - state.barHeight - state.ballSize - 30
