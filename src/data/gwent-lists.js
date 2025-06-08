export const northernRealmsList = [
  {
    deck: 'Northern Realms',
    name: 'Kaedweni Siege Expert',
    id: 'kaedweni-siege-expert-1',
    image: '/assets/gwentCards/northern_realms/Kaedweni_Siege_Expert1.png',
    strength: 1,
    type: ['unit', 'siege'],
    ability: ['morale'],
    abilityDescription:
      'Adds +1 strength to all units in the row, excluding itself',
    useAbility: (location, gameState, cardData) => {
      console.log('✨ Activando morale en:', location)

      const isPlayer = location.startsWith('p1')
      const playerKey = isPlayer ? 'player' : 'computer'
      const playedUnits = gameState[playerKey].playedCards.unit

      playedUnits.forEach((unitCard) => {
        if (
          unitCard.id !== cardData.id &&
          unitCard.boardLocations.includes(location)
        ) {
          unitCard.strength += 1
          console.log(`💪 ${unitCard.name} gana +1 de fuerza (morale)`)
        }
      })
    },
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Kaedweni Siege Expert',
    id: 'kaedweni-siege-expert-2',
    image: '/assets/gwentCards/northern_realms/Kaedweni_Siege_Expert2.png',
    strength: 1,
    type: ['unit', 'siege'],
    ability: ['morale'],
    abilityDescription:
      'Adds +1 strength to all units in the row, excluding itself',
    useAbility: (location, gameState, cardData) => {
      console.log('✨ Activando morale en:', location)

      const isPlayer = location.startsWith('p1')
      const playerKey = isPlayer ? 'player' : 'computer'
      const playedUnits = gameState[playerKey].playedCards.unit

      playedUnits.forEach((unitCard) => {
        if (
          unitCard.id !== cardData.id &&
          unitCard.boardLocations.includes(location)
        ) {
          unitCard.strength += 1
          console.log(`💪 ${unitCard.name} gana +1 de fuerza (morale)`)
        }
      })
    },
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Kaedweni Siege Expert',
    id: 'kaedweni-siege-expert-3',
    image: '/assets/gwentCards/northern_realms/Kaedweni_Siege_Expert3.png',
    strength: 1,
    type: ['unit', 'siege'],
    ability: ['morale'],
    abilityDescription:
      'Adds +1 strength to all units in the row, excluding itself',
    useAbility: (location, gameState, cardData) => {
      console.log('✨ Activando morale en:', location)

      const isPlayer = location.startsWith('p1')
      const playerKey = isPlayer ? 'player' : 'computer'
      const playedUnits = gameState[playerKey].playedCards.unit

      playedUnits.forEach((unitCard) => {
        if (
          unitCard.id !== cardData.id &&
          unitCard.boardLocations.includes(location)
        ) {
          unitCard.strength += 1
          console.log(`💪 ${unitCard.name} gana +1 de fuerza (morale)`)
        }
      })
    },
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Redanian Foot Soldier',
    id: 'redanian-foot-soldier-1',
    image: '/assets/gwentCards/northern_realms/Redanian_Foot_Soldier1.png',
    strength: 1,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Redanian Foot Soldier',
    id: 'redanian-foot-soldier-2',
    image: '/assets/gwentCards/northern_realms/Redanian_Foot_Soldier2.png',
    strength: 1,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Poor Fucking Infantry',
    id: 'poor-fucking-infantry-1',
    image: '/assets/gwentCards/northern_realms/Poor_Fucking_Infantry1.png',
    strength: 1,
    type: ['unit', 'melee', 'infantry'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Poor Fucking Infantry',
    id: 'poor-fucking-infantry-2',
    image: '/assets/gwentCards/northern_realms/Poor_Fucking_Infantry2.png',
    strength: 1,
    type: ['unit', 'melee', 'infantry'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Poor Fucking Infantry',
    id: 'poor-fucking-infantry-3',
    image: '/assets/gwentCards/northern_realms/Poor_Fucking_Infantry3.png',
    strength: 1,
    type: ['unit', 'melee', 'infantry'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Thaler',
    id: 'thaler',
    image: '/assets/gwentCards/northern_realms/Thaler.png',
    strength: 1,
    type: ['unit', 'siege'],
    ability: ['spy'],
    abilityDescription:
      'Place on your opponents battlefield (counts towards their total strength) then draw two new cards from your deck',
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Yarpen Zigrin',
    id: 'yarpen-zigrin',
    image: '/assets/gwentCards/northern_realms/Yarpen_Zigrin.png',
    strength: 2,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Blue Stripes Commando',
    id: 'blue-stripes-commando-1',
    image: '/assets/gwentCards/northern_realms/Blue_Stripes_Commando1.png',
    strength: 4,
    type: ['unit', 'melee', 'commando'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Blue Stripes Commando',
    id: 'blue-stripes-commando-2',
    image: '/assets/gwentCards/northern_realms/Blue_Stripes_Commando2.png',
    strength: 4,
    type: ['unit', 'melee', 'commando'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Blue Stripes Commando',
    id: 'blue-stripes-commando-3',
    image: '/assets/gwentCards/northern_realms/Blue_Stripes_Commando3.png',
    strength: 4,
    type: ['unit', 'melee', 'commando'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Sabrina Glevissig',
    id: 'sabrina-glevissig',
    image: '/assets/gwentCards/northern_realms/Sabrina_Glevissig.png',
    strength: 4,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Sheldon Skaggs',
    id: 'sheldon-skaggs',
    image: '/assets/gwentCards/northern_realms/Sheldon_Skaggs.png',
    strength: 4,
    type: ['unit', 'range'],
    ability: [null],
    useAbility: undefined,
    abilityDescription: null,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Sigismund Dijkstra',
    id: 'sigismund-dijkstra',
    image: '/assets/gwentCards/northern_realms/Sigismund_Dijkstra.png',
    strength: 4,
    type: ['unit', 'melee'],
    ability: ['spy'],
    abilityDescription:
      'Place on your opponents battlefield (counts towards their total strength) then draw two new cards from your deck',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Crinfrid Reavers Dragon Hunter',
    id: 'crinfrid-reavers-dragon-hunter-1',
    image:
      '/assets/gwentCards/northern_realms/Crinfrid_Reavers_Dragon_Hunter1.png',
    strength: 5,
    type: ['unit', 'range', 'reavers'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Crinfrid Reavers Dragon Hunter',
    id: 'crinfrid-reavers-dragon-hunter-2',
    image:
      '/assets/gwentCards/northern_realms/Crinfrid_Reavers_Dragon_Hunter2.png',
    strength: 5,
    type: ['unit', 'range', 'reavers'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Crinfrid Reavers Dragon Hunter',
    id: 'crinfrid-reavers-dragon-hunter-3',
    image:
      '/assets/gwentCards/northern_realms/Crinfrid_Reavers_Dragon_Hunter3.png',
    strength: 5,
    type: ['unit', 'range', 'reavers'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Dun Banner Medic',
    id: 'dun-banner-medic',
    image: '/assets/gwentCards/northern_realms/Dun_Banner_Medic.png',
    strength: 5,
    type: ['unit', 'siege'],
    ability: ['medic'],
    abilityDescription:
      'Choose one card from your discard pile (excluding heroes / special cards) to play instantly',
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Keira Metz',
    id: 'keira-metz',
    image: '/assets/gwentCards/northern_realms/Keira_Metz.png',
    strength: 5,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Prince Stennis',
    id: 'prince-stennis',
    image: '/assets/gwentCards/northern_realms/Prince_Stennis.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: ['spy'],
    abilityDescription:
      'Place on your opponents battlefield (counts towards their total strength) then draw two new cards from your deck',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Siegfried of Denesle',
    id: 'siegfried-of-denesle',
    image: '/assets/gwentCards/northern_realms/Siegfried_of_Denesle.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Síle de Tansarville',
    id: 'sile-de-tansarville',
    image: '/assets/gwentCards/northern_realms/Síle_de_Tansarville.png',
    strength: 5,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Ves',
    id: 'ves',
    image: '/assets/gwentCards/northern_realms/Ves.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Ballista',
    id: 'ballista-1',
    image: '/assets/gwentCards/northern_realms/Ballista1.png',
    strength: 6,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Ballista',
    id: 'ballista-2',
    image: '/assets/gwentCards/northern_realms/Ballista2.png',
    strength: 6,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Dethmold',
    id: 'dethmold',
    image: '/assets/gwentCards/northern_realms/Dethmold.png',
    strength: 6,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Siege Tower',
    id: 'siege-tower',
    image: '/assets/gwentCards/northern_realms/Siege_Tower.png',
    strength: 6,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Trebuchet',
    id: 'trebuchet-1',
    image: '/assets/gwentCards/northern_realms/Trebuchet1.png',
    strength: 6,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Trebuchet',
    id: 'trebuchet-2',
    image: '/assets/gwentCards/northern_realms/Trebuchet2.png',
    strength: 6,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Catapult',
    id: 'catapult-1',
    image: '/assets/gwentCards/northern_realms/Catapult1.png',
    strength: 8,
    type: ['unit', 'siege', 'catapult'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Catapult',
    id: 'catapult-2',
    image: '/assets/gwentCards/northern_realms/Catapult2.png',
    strength: 8,
    type: ['unit', 'siege', 'catapult'],
    ability: ['bond'],
    abilityDescription:
      'Place next to a card with the same name to double the strength of both cards',
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Vernon Roche',
    id: 'vernor-roche',
    image: '/assets/gwentCards/northern_realms/Vernon_Roche.png',
    strength: 10,
    type: ['unit', 'hero', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by any Special Cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Esterad Thyssen',
    id: 'esterad-thyssen',
    image: '/assets/gwentCards/northern_realms/Esterad_Thyssen.png',
    strength: 10,
    type: ['unit', 'hero', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by any Special Cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'John Natalis',
    id: 'john-natalis',
    image: '/assets/gwentCards/northern_realms/John_Natalis.png',
    strength: 10,
    type: ['unit', 'hero', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by any Special Cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Northern Realms',
    name: 'Philippa Eilhart',
    id: 'philippa-eilhart',
    image: '/assets/gwentCards/northern_realms/Philippa_Eilhart.png',
    strength: 10,
    type: ['unit', 'hero', 'range'],
    ability: ['hero'],
    abilityDescription: 'Not affected by any Special Cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  }
]

export const northernRealmBosses = [
  {
    deck: 'Northern Realms Bosses',
    name: 'Foltest the Siegemaster',
    id: 'foltest-the-siegemaster',
    image:
      '/assets/gwentCards/northern_realms/northern_realms_bosses/Foltest_the_Siegemaster.png',
    strength: 0,
    type: 'boss',
    power:
      "Doubles the strength of all Siege units, unless a Commander's Horn is already in play on that row",
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  },
  {
    deck: 'Northern Realms Bosses',
    name: 'Foltest Lord Commander of the North',
    id: 'foltest-lord-commander-of-the-north',
    image:
      '/assets/gwentCards/northern_realms/northern_realms_bosses/Foltest_Lord_Commander_of_the_North.png',
    strength: 0,
    type: 'boss',
    power: 'Clear any weather effects (on both sides) currently in play',
    useAbility: undefined,
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  },
  {
    deck: 'Northern Realms Bosses',
    name: 'Foltest King of Temeria',
    id: 'foltest-king-of-temeria',
    image:
      '/assets/gwentCards/northern_realms/northern_realms_bosses/Foltest_King_of_Temeria.png',
    strength: 0,
    type: 'boss',
    power: 'Pick an Impenetrable Fog card from your deck and play it instantly',
    useAbility: undefined,
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  },
  {
    deck: 'Northern Realms Bosses',
    name: 'Foltest the Steel Forged',
    id: 'foltest-the-steel-forged',
    image:
      '/assets/gwentCards/northern_realms/northern_realms_bosses/Foltest_the_Steel_Forged.png',
    strength: 0,
    type: 'boss',
    power:
      "Destroy opponent's strongest Siege units if the strength of that row is 10 or higher",
    useAbility: undefined,
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  }
]

export const monstersList = [
  {
    deck: 'Monsters',
    name: 'Ghoul',
    id: 'ghoul-1',
    image: '/assets/gwentCards/monsters/Ghoul1.png',
    strength: 1,
    type: ['unit', 'melee', 'ghoul'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Ghoul',
    id: 'ghoul-2',
    image: '/assets/gwentCards/monsters/Ghoul2.png',
    strength: 1,
    type: ['unit', 'melee', 'ghoul'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Ghoul',
    id: 'ghoul-3',
    image: '/assets/gwentCards/monsters/Ghoul3.png',
    strength: 1,
    type: ['unit', 'melee', 'ghoul'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Nekker',
    id: 'nekker-1',
    image: '/assets/gwentCards/monsters/Nekker1.png',
    strength: 2,
    type: ['unit', 'melee', 'nekker'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Nekker',
    id: 'nekker-2',
    image: '/assets/gwentCards/monsters/Nekker2.png',
    strength: 2,
    type: ['unit', 'melee', 'nekker'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Nekker',
    id: 'nekker-3',
    image: '/assets/gwentCards/monsters/Nekker3.png',
    strength: 2,
    type: ['unit', 'melee', 'nekker'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Wyvern',
    id: 'wyvern',
    image: '/assets/gwentCards/monsters/Wyvern.png',
    strength: 2,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Foglet',
    id: 'foglet',
    image: '/assets/gwentCards/monsters/Foglet.png',
    strength: 2,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Cockatrice',
    id: 'cockatrice',
    image: '/assets/gwentCards/monsters/Cockatrice.png',
    strength: 2,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Caleano Harpy',
    id: 'caleano-harpy',
    image: '/assets/gwentCards/monsters/Caleano_Harpy.png',
    strength: 2,
    type: ['unit', 'melee', 'range'],
    ability: ['agile'],
    abilityDescription:
      'Can be placed in either the Close Combat or the Ranged Combat row. Cannot be moved once placed',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:battlefield',
      'pc-melee:battlefield',
      'p1-range:battlefield',
      'pc-range:battlefield'
    ]
  },
  {
    deck: 'Monsters',
    name: 'Harpy',
    id: 'harpy',
    image: '/assets/gwentCards/monsters/Harpy.png',
    strength: 2,
    type: ['unit', 'melee', 'range'],
    ability: ['agile'],
    abilityDescription:
      'Can be placed in either the Close Combat or the Ranged Combat row. Cannot be moved once placed',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:battlefield',
      'pc-melee:battlefield',
      'p1-range:battlefield',
      'pc-range:battlefield'
    ]
  },
  {
    deck: 'Monsters',
    name: 'Gargoyle',
    id: 'gargoyle',
    image: '/assets/gwentCards/monsters/Gargoyle.png',
    strength: 2,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Endrega',
    id: 'endrega',
    image: '/assets/gwentCards/monsters/Endrega.png',
    strength: 2,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Vampire Garkain',
    id: 'vampire-garkain',
    image: '/assets/gwentCards/monsters/Vampire_Garkain.png',
    strength: 4,
    type: ['unit', 'melee', 'vampire'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Vampire Fleder',
    id: 'vampire-fleder',
    image: '/assets/gwentCards/monsters/Vampire_Fleder.png',
    strength: 4,
    type: ['unit', 'melee', 'vampire'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Vampire Ekimmara',
    id: 'vampire-ekimmara',
    image: '/assets/gwentCards/monsters/Vampire_Ekimmara.png',
    strength: 4,
    type: ['unit', 'melee', 'vampire'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Vampire Bruxa',
    id: 'vampire-bruxa',
    image: '/assets/gwentCards/monsters/Vampire_Bruxa.png',
    strength: 4,
    type: ['unit', 'melee', 'vampire'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Arachas',
    id: 'arachas-1',
    image: '/assets/gwentCards/monsters/Arachas1.png',
    strength: 4,
    type: ['unit', 'melee', 'arachas'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Arachas',
    id: 'arachas-2',
    image: '/assets/gwentCards/monsters/Arachas2.png',
    strength: 4,
    type: ['unit', 'melee', 'arachas'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Arachas',
    id: 'arachas-3',
    image: '/assets/gwentCards/monsters/Arachas3.png',
    strength: 4,
    type: ['unit', 'melee', 'arachas'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Botchling',
    id: 'botchling',
    image: '/assets/gwentCards/monsters/Botchling.png',
    strength: 4,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Vampire Katakan',
    id: 'vampire-katakan',
    image: '/assets/gwentCards/monsters/Vampire_Katakan.png',
    strength: 5,
    type: ['unit', 'melee', 'vampire'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Grave Hag',
    id: 'grave-hag',
    image: '/assets/gwentCards/monsters/Grave_Hag.png',
    strength: 5,
    type: ['unit', 'range'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Ice Giant',
    id: 'ice-giant',
    image: '/assets/gwentCards/monsters/Ice_Giant.png',
    strength: 5,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Werewolf',
    id: 'werewolf',
    image: '/assets/gwentCards/monsters/Werewolf.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Frightener',
    id: 'frightener',
    image: '/assets/gwentCards/monsters/Frightener.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Griffin',
    id: 'griffin',
    image: '/assets/gwentCards/monsters/Griffin.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Plague Maiden',
    id: 'plague-maiden',
    image: '/assets/gwentCards/monsters/Plague_Maiden.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Forktail',
    id: 'forktail',
    image: '/assets/gwentCards/monsters/Forktail.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Fire Elemental',
    id: 'fire-elemental',
    image: '/assets/gwentCards/monsters/Fire_Elemental.png',
    strength: 6,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Arachas Behemoth',
    id: 'arachas-behemoth',
    image: '/assets/gwentCards/monsters/Arachas_Behemoth.png',
    strength: 6,
    type: ['unit', 'siege', 'arachas'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Crone Whispess',
    id: 'crone-whispess',
    image: '/assets/gwentCards/monsters/Crone_Whispess.png',
    strength: 6,
    type: ['unit', 'melee', 'crone'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Crone Weavess',
    id: 'crone-weavess',
    image: '/assets/gwentCards/monsters/Crone_Weavess.png',
    strength: 6,
    type: ['unit', 'melee', 'crone'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Crone Brewess',
    id: 'crone-brewess',
    image: '/assets/gwentCards/monsters/Crone_Brewess.png',
    strength: 6,
    type: ['unit', 'melee', 'crone'],
    ability: ['muster'],
    abilityDescription:
      'Find any cards with the same name in your deck and play them instantly',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Fiend',
    id: 'fiend',
    image: '/assets/gwentCards/monsters/Fiend.png',
    strength: 6,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Earth Elemental',
    id: 'earth-elemental',
    image: '/assets/gwentCards/monsters/Earth_Elemental.png',
    strength: 6,
    type: ['unit', 'siege'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-siege:battlefield', 'pc-siege:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Kayran',
    id: 'kayran',
    image: '/assets/gwentCards/monsters/Kayran.png',
    strength: 8,
    type: ['unit', 'melee', 'range'],
    ability: ['hero', 'agile', 'morale'],
    abilityDescription:
      'Hero - Not affected by any Special Cards or abilities; Agile - Can be placed in either the Close Combat or the Ranged Combat row. Cannot be moved once placed; Morale Boost - Adds +1 to all the units in the row (excluding itself)',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:battlefield',
      'pc-melee:battlefield',
      'p1-range:battlefield',
      'pc-range:battlefield'
    ]
  },
  {
    deck: 'Monsters',
    name: 'Leshen',
    id: 'leshen',
    image: '/assets/gwentCards/monsters/Leshen.png',
    strength: 10,
    type: ['unit', 'range'],
    ability: ['hero'],
    abilityDescription: 'Not affected by any Special Cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Imlerith',
    id: 'imlerith',
    image: '/assets/gwentCards/monsters/Imlerith.png',
    strength: 10,
    type: ['unit', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by any Special Cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Monsters',
    name: 'Draug',
    id: 'draug',
    image: '/assets/gwentCards/monsters/Draug.png',
    strength: 10,
    type: ['unit', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by any Special Cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  }
]

export const monstersBosses = [
  {
    deck: 'Monsters Bosses',
    name: 'Eredin Bringer of Death',
    id: 'eredin-bringer-of-death',
    image:
      '/assets/gwentCards/monsters/monsters_bosses/Eredin_Bringer_of_Death.png',
    strength: 0,
    type: 'boss',
    power: 'Discard 2 cards and draw 1 card of your choice from your deck',
    useAbility: undefined,
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  },
  {
    deck: 'Monsters Bosses',
    name: 'Eredin Commander of the Red Riders',
    id: 'eredin-commander-of-the-red-riders',
    image:
      '/assets/gwentCards/monsters/monsters_bosses/Eredin_Commander_of_the_Red_Riders.png',
    strength: 0,
    type: 'boss',
    power: 'Pick any weather card from your deck and play it instantly',
    useAbility: undefined,
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  },
  {
    deck: 'Monsters Bosses',
    name: 'Eredin King of the Wild Hunt',
    id: 'eredin-king-of-the-wild-hunt',
    image:
      '/assets/gwentCards/monsters/monsters_bosses/Eredin_King_of_the_Wild_Hunt.png',
    strength: 0,
    type: 'boss',
    power:
      "Double the strength of all your Close Combat units (unless a Commander's Horn is also present on that row)",
    useAbility: undefined,
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  },
  {
    deck: 'Monsters Bosses',
    name: 'Eredin Destroyer of Worlds',
    id: 'eredin-destroyer-of-worlds',
    image:
      '/assets/gwentCards/monsters/monsters_bosses/Eredin_Destroyer_of_Worlds.png',
    strength: 0,
    type: 'boss',
    power: 'Restore a card from your discard pile to your hand',
    useAbility: undefined,
    boardLocations: ['p1-siege:special-cards', 'pc-siege:special-cards']
  }
]

export const neutralCardsList = [
  {
    deck: 'Neutral',
    name: 'Decoy',
    id: 'decoy-1',
    image: '/assets/gwentCards/neutral/Decoy1.png',
    strength: 0,
    type: ['special'],
    ability: ['decoy'],
    abilityDescription:
      'Swap with a card on the battlefield to return it to your hand',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:battlefield',
      'pc-melee:battlefield',
      'p1-range:battlefield',
      'pc-range:battlefield',
      'p1-siege:battlefield',
      'pc-siege:battlefield'
    ]
  },
  {
    deck: 'Neutral',
    name: 'Decoy',
    id: 'decoy-2',
    image: '/assets/gwentCards/neutral/Decoy2.png',
    strength: 0,
    type: ['special'],
    ability: ['decoy'],
    abilityDescription:
      'Swap with a card on the battlefield to return it to your hand',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:battlefield',
      'pc-melee:battlefield',
      'p1-range:battlefield',
      'pc-range:battlefield',
      'p1-siege:battlefield',
      'pc-siege:battlefield'
    ]
  },
  {
    deck: 'Neutral',
    name: 'Decoy',
    id: 'decoy-3',
    image: '/assets/gwentCards/neutral/Decoy3.png',
    strength: 0,
    type: ['special'],
    ability: ['decoy'],
    abilityDescription:
      'Swap with a card on the battlefield to return it to your hand',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:battlefield',
      'pc-melee:battlefield',
      'p1-range:battlefield',
      'pc-range:battlefield',
      'p1-siege:battlefield',
      'pc-siege:battlefield'
    ]
  },
  {
    deck: 'Neutral',
    name: "Commander's Horn",
    id: 'commanders-horn-1',
    image: '/assets/gwentCards/neutral/Commanders_Horn1.png',
    strength: 0,
    type: ['special'],
    ability: ['horn'],
    abilityDescription:
      'Doubles the strength of all unit cards in a row. Limited to 1 per row',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:horn',
      'pc-melee:horn',
      'p1-range:horn',
      'pc-range:horn',
      'p1-siege:horn',
      'pc-siege:horn'
    ]
  },
  {
    deck: 'Neutral',
    name: "Commander's Horn",
    id: 'commanders-horn-2',
    image: '/assets/gwentCards/neutral/Commanders_Horn2.png',
    strength: 0,
    type: ['special'],
    ability: ['horn'],
    abilityDescription:
      'Doubles the strength of all unit cards in a row. Limited to 1 per row',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:horn',
      'pc-melee:horn',
      'p1-range:horn',
      'pc-range:horn',
      'p1-siege:horn',
      'pc-siege:horn'
    ]
  },
  {
    deck: 'Neutral',
    name: "Commander's Horn",
    id: 'commanders-horn-3',
    image: '/assets/gwentCards/neutral/Commanders_Horn3.png',
    strength: 0,
    type: ['special'],
    ability: ['horn'],
    abilityDescription:
      'Doubles the strength of all unit cards in a row. Limited to 1 per row',
    useAbility: undefined,
    boardLocations: [
      'p1-melee:horn',
      'pc-melee:horn',
      'p1-range:horn',
      'pc-range:horn',
      'p1-siege:horn',
      'pc-siege:horn'
    ]
  },
  {
    deck: 'Neutral',
    name: 'Scorch',
    id: 'scorch-1',
    image: '/assets/gwentCards/neutral/Scorch1.png',
    strength: 0,
    type: ['special'],
    ability: ['scorch'],
    abilityDescription:
      'Discard after playing. Kills the strongest card(s) in the battlefield',
    useAbility: undefined,
    boardLocations: []
  },
  {
    deck: 'Neutral',
    name: 'Scorch',
    id: 'scorch-2',
    image: '/assets/gwentCards/neutral/Scorch2.png',
    strength: 0,
    type: ['special'],
    ability: ['scorch'],
    abilityDescription:
      'Discard after playing. Kills the strongest card(s) in the battlefield',
    useAbility: undefined,
    boardLocations: []
  },
  {
    deck: 'Neutral',
    name: 'Scorch',
    id: 'scorch-3',
    image: '/assets/gwentCards/neutral/Scorch3.png',
    strength: 0,
    type: ['special'],
    ability: ['scorch'],
    abilityDescription:
      'Discard after playing. Kills the strongest card(s) in the battlefield',
    useAbility: undefined,
    boardLocations: []
  },
  {
    deck: 'Neutral',
    name: 'Biting Frost',
    id: 'biting-frost-1',
    image: '/assets/gwentCards/neutral/Biting_Frost1.png',
    strength: 0,
    type: ['special'],
    ability: ['frost'],
    abilityDescription:
      'Sets the strength of all Close Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Biting Frost',
    id: 'biting-frost-2',
    image: '/assets/gwentCards/neutral/Biting_Frost2.png',
    strength: 0,
    type: ['special'],
    ability: ['frost'],
    abilityDescription:
      'Sets the strength of all Close Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Biting Frost',
    id: 'biting-frost-3',
    image: '/assets/gwentCards/neutral/Biting_Frost3.png',
    strength: 0,
    type: ['special'],
    ability: ['frost'],
    abilityDescription:
      'Sets the strength of all Close Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Impenetrable Fog',
    id: 'impenetrable-fog-1',
    image: '/assets/gwentCards/neutral/Impenetrable_Fog1.png',
    strength: 0,
    type: ['special'],
    ability: ['fog'],
    abilityDescription:
      'Sets the strength of all Ranged Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Impenetrable Fog',
    id: 'impenetrable-fog-2',
    image: '/assets/gwentCards/neutral/Impenetrable_Fog2.png',
    strength: 0,
    type: ['special'],
    ability: ['fog'],
    abilityDescription:
      'Sets the strength of all Ranged Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Impenetrable Fog',
    id: 'impenetrable-fog-3',
    image: '/assets/gwentCards/neutral/Impenetrable_Fog3.png',
    strength: 0,
    type: ['special'],
    ability: ['fog'],
    abilityDescription:
      'Sets the strength of all Ranged Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Torrential Rain',
    id: 'torrential-rain-1',
    image: '/assets/gwentCards/neutral/Torrential_Rain1.png',
    strength: 0,
    type: ['special'],
    ability: ['rain'],
    abilityDescription:
      'Sets the strength of all Siege Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Torrential Rain',
    id: 'torrential-rain-2',
    image: '/assets/gwentCards/neutral/Torrential_Rain2.png',
    strength: 0,
    type: ['special'],
    ability: ['rain'],
    abilityDescription:
      'Sets the strength of all Siege Combat cards to 1 for both players',
    useAbility: undefined,
    boardLocations: ['p1-melee:special-cards', 'pc-melee:special-cards']
  },
  {
    deck: 'Neutral',
    name: 'Clear Weather',
    id: 'clear-weather-1',
    image: '/assets/gwentCards/neutral/Clear_Weather1.png',
    strength: 0,
    type: ['special'],
    ability: ['sun'],
    abilityDescription:
      'Removes all Weather Card (Biting Frost, Impenetrable Fog and Torrential Rain) effects',
    useAbility: undefined,
    boardLocations: []
  },
  {
    deck: 'Neutral',
    name: 'Clear Weather',
    id: 'clear-weather-2',
    image: '/assets/gwentCards/neutral/Clear_Weather2.png',
    strength: 0,
    type: ['special'],
    ability: ['sun'],
    abilityDescription:
      'Removes all Weather Card (Biting Frost, Impenetrable Fog and Torrential Rain) effects',
    useAbility: undefined,
    boardLocations: []
  },
  {
    deck: 'Neutral',
    name: 'Dandelion',
    id: 'dandelion',
    image: '/assets/gwentCards/neutral/Dandelion.png',
    strength: 2,
    type: ['unit', 'melee'],
    ability: ['dandelionHorn'],
    abilityDescription:
      "Doubles the strength of all unit cards in close combat row excepts itself, unless a Commander's Horn is already in play on that row",
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Zoltan Chivay',
    id: 'zoltan-chivay',
    image: '/assets/gwentCards/neutral/Zoltan_Chivay.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Emiel Regis Rohellec Terzieff',
    id: 'emiel-regis-rohellec-terzieff',
    image: '/assets/gwentCards/neutral/Emiel_Regis_Rohellec_Terzieff.png',
    strength: 5,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Vesemir',
    id: 'vesemir',
    image: '/assets/gwentCards/neutral/Vesemir.png',
    strength: 6,
    type: ['unit', 'melee'],
    ability: [null],
    abilityDescription: null,
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Villentretenmerth',
    id: 'villentretenmerth',
    image: '/assets/gwentCards/neutral/Villentretenmerth.png',
    strength: 7,
    type: ['unit', 'melee'],
    ability: ['dragonScorch'],
    abilityDescription:
      "Destroy your enemy's strongest close combat unit(s) if the combined strength of all of his or her combat unit(s) is 10 or more",
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: "Avallac'h",
    id: 'avallach',
    image: '/assets/gwentCards/neutral/Avallach.png',
    strength: 0,
    type: ['unit', 'melee'],
    ability: ['hero', 'spy'],
    abilityDescription:
      "Hero - Not affected by any Special Cards or abilities; Spy - Place on your opponent's battlefield (count towards opponent's total) and draw 2 cards from your deck",
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Triss Merigold',
    id: 'triss-merigold',
    image: '/assets/gwentCards/neutral/Triss_Merigold.png',
    strength: 7,
    type: ['unit', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by special cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Yennefer of Vengerberg',
    id: 'yennefer-of-vengerberg',
    image: '/assets/gwentCards/neutral/Yennefer_of_Vengerberg.png',
    strength: 7,
    type: ['unit', 'range'],
    ability: ['hero', 'medic'],
    abilityDescription:
      'Hero - Not affected by special cards or abilities; Medic - Choose one card from your discard pile and play it instantly (no Heroes or Special Cards)',
    useAbility: undefined,
    boardLocations: ['p1-range:battlefield', 'pc-range:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Cirilla Fiona Elen Rianno',
    id: 'cirilla-fiona-elen-rianno',
    image: '/assets/gwentCards/neutral/Cirilla_Fiona_Elen_Rianno.png',
    strength: 15,
    type: ['unit', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by special cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  },
  {
    deck: 'Neutral',
    name: 'Geralt of Rivia',
    id: 'geralt-of-rivia',
    image: '/assets/gwentCards/neutral/Geralt_of_Rivia.png',
    strength: 15,
    type: ['unit', 'melee'],
    ability: ['hero'],
    abilityDescription: 'Not affected by special cards or abilities',
    useAbility: undefined,
    boardLocations: ['p1-melee:battlefield', 'pc-melee:battlefield']
  }
]

export const cardBackList = [
  {
    name: 'Norther Realms card Back',
    id: 'norther-realms-card-back',
    image: '/assets/gwentCards/cards_back/northern_realms_cardBack.png',
    boardLocations: ['p1-melee:discards', 'pc-melee:discards']
  },
  {
    name: 'Monsters card Back',
    id: 'monsters-card-back',
    image: '/assets/gwentCards/cards_back/monsters_cardBack.png',
    boardLocations: ['p1-melee:discards', 'pc-melee:discards']
  },
  {
    name: 'Dead card Back',
    id: 'dead-card-back',
    image: '/assets/gwentCards/cards_back/deadCards.png',
    boardLocations: ['p1-siege:discards', 'pc-siege:discards']
  }
]
