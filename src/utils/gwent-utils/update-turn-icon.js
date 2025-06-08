import { gameState } from './gameState/gameState-manager'

export function updateTurnIcon(currentTurn) {
  const icon = document.querySelector('.turnCounterIcon')
  const state = gameState.getState()

  const faction =
    currentTurn === 'player' ? state.player.faction : state.computer.faction

  const factionIcon =
    faction === 'Northern Realms'
      ? '/assets/gwentUtils/northern_realms_icon.png'
      : '/assets/gwentUtils/monsters_icon.png'

  icon.src = factionIcon
  icon.title = `${faction} turn`
  icon.alt = `${faction} icon`
}
