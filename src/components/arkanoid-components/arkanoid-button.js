//* IMPORTS

import { createElement } from '../../utils/create-elements'

export function renderArkanoidBtn({ onClick, ...attributes }) {
  const arkanoidBtn = createElement('button', attributes)

  arkanoidBtn.addEventListener('click', onClick)

  return arkanoidBtn
}
