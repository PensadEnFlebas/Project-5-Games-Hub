export function cleanGems(player, computer) {
  const playerGems = document.querySelectorAll('.p1-range .gem')
  const computerGems = document.querySelectorAll('.pc-range .gem')

  for (let i = 0; i < 2; i++) {
    if (i >= player.gems) playerGems[i]?.classList.add('hidden-gem')
    if (i >= computer.gems) computerGems[i]?.classList.add('hidden-gem')
  }
}
