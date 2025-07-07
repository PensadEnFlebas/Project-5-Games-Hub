export function toggleBoxes(disable = true) {
  document.querySelectorAll('.tttBox').forEach((box) => {
    box.classList.toggle('disabled', disable)
  })
}
