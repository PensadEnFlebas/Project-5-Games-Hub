//* IMPORTS

import { createElement } from '../../utils/create-elements'
import { clearLoserBoxes } from '../../utils/ticTacToe-utils/reset-loser-boxes-styles'

export function renderResetBtn({ container, onClick, ...attributes }) {
  const button = createElement('button', attributes)

  button.addEventListener('click', onClick)

  container.appendChild(button)

  clearLoserBoxes()

  return button
}
