// 1. cada vez que se juega una carta: playingCard() --> buscar el lugar donde ejecutar los siguientes puntos.
// 2. hacer get de todas las cards sobre el gameBoard(column = battlefield) => coger id y el row/column (battlefield)
// --> cartas que se están jugando en ese momento incluyendo la última (array objetos)
// 3. por cada card que se encuentre buscar en el gwent-lists el/los id que coincida/n con los del array del paso 2
// 4. hacer map del array del paso 3 para compararlo con gwentCardAbilities
// 5. Ejecutar las abilities => se le pasa (card, targetCell = null)
// 6. Actualizar objetc gwentCard con prop affectedBy = array con los id de las cards que aplican buffs a esa card y otra prop buff para contabilizar los points de buff totales que recibe esa cards.

//? 1. afectan a las cards de una celda
//? 2. afectan a 1 celda de cada jugador (cartas clima)
//* 2.1 limpia los efectos de las cards de clima (2) y borra las cards
//? 3. afectan a cards concretas: las de mayor strength (+ buff) de ese momento en el boardGame (eliminan esas cards)
//? 4. intercambian una card de la mano por una card del boardGame
//? 5. se ubican en las celdas del contrario y te dan 2 cards del remainingDeck
//? 6. afectan a las cards iguales (sólo cambia el id) que ella y doblan strength.
//? 7. busca cards en el remainingDeck con el mismo name (keyword en el name) y si existen las juega en ese momento.
//? 8. eliges una card del deadCardDeck y la juega.

morale, //? 1. afectan a las cards de una celda ✓
  bond, //? 6. afectan a las cards iguales que ella. ✓
  spy, //? 5. se ubican en las celdas del contrario y te dan 2 cards del remainingDeck ✓
  medic, //? 8. eliges una card del deadCardDeck y la juega. ✓
  muster, //? 7. busca cards en el remainingDeck con el mismo name (keyword en el name) y si existen las juega en ese momento. ✓
  agile, //* son cards que se pueden ubicar en 2 celdas y hay que elegir (YA IMPLEMENTADO)
  decoy, //? 4. intercambian una card de la mano por una card del boardGame ✓
  horn, //? 1. afectan a las cards de una celda ✓
  dandelionHorn, //? 1. afectan a las cards de una celda ✓
  scorch, //? 3. afectan a cards concretas: las de mayor strength (+ buff) de ese momento en el boardGame (eliminan esas cards) ✓
  dragonScorch, //? 3. afecta a cards concretas: las de mayor strength (+ buff) de ese momento en el boardGame (eliminan esas cards) ✓
  frost, //? 2. afectan a 1 celda de cada jugador (cartas clima) ✓
  fog, //? 2. afectan a 1 celda de cada jugador (cartas clima) ✓
  rain, //? 2. afectan a 1 celda de cada jugador (cartas clima) ✓
  sun //? 2.1 limpia los efectos de las cards de clima (2) ✓
