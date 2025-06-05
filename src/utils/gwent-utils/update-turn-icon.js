export function updateTurnIcon(currentTurn, gameState) {
  const icon = document.querySelector('.turnCounterIcon')

  const faction =
    currentTurn === 'player'
      ? gameState.player.faction
      : gameState.computer.faction

  const factionIcon =
    faction === 'Northern Realms'
      ? '/assets/gwentUtils/northern_realms_icon.png'
      : '/assets/gwentUtils/monsters_icon.png'

  icon.src = factionIcon
  icon.title = `${faction} turn`
  icon.alt = `${faction} icon`
}
