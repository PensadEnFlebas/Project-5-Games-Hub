export function getMark(box) {
  if (box.classList.contains('xMark')) return 'x'
  if (box.classList.contains('oMark')) return 'o'
  return ''
}
