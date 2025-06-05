//* IMPORTS

import { createElement } from '../../utils/create-elements'

export function renderGwentBtn({ onClick, ...attributes }) {
  const gwentBtn = createElement('button', attributes)

  gwentBtn.addEventListener('click', onClick)

  return gwentBtn
}
