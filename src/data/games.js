export const GAMES = [
  // ============ dev-1: Guy ============
  { id: 'game-1', title: 'Lil Shroom', developerId: 'dev-1', genre: 'Platformer', engine: 'Unity', stage: 'Prototype',
    shortDescription: 'A tiny mushroom cooking MBG, anjay mabar.',
    thumbnailSeed: 'lilshroom', needsFeedback: true, feedbackCategory: 'Art',
    coverUrl: 'asset/covers/lilshroom_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 0.4, spacingDays: 5 },
    handWritten: [
      {
        title: 'Lil Shroom got a face and it is judging me',
        content: 'Spent the week on the character rig. The shroom now blinks, squints, and does a little disappointed hop when you miss a jump. It was supposed to be cute. It is now slightly threatening. Keeping it. The MBG stand in the background is still a placeholder cube but honestly it reads.',
        imageUrl: 'asset/devlogs/lilshroom_solver1.png',
      },
    ],
  },

  { id: 'game-2', title: 'Viles W/Smiles', developerId: 'dev-1', genre: 'Horror', engine: 'Unity', stage: 'Concept',
    shortDescription: 'A game about being a guy who needs to work as a bartender to a mafia to pay off his debt.',
    thumbnailSeed: 'vileswsmiles', needsFeedback: false,
    coverUrl: 'asset/covers/vileswsmiles_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 2.5, spacingDays: 6 },
    handWritten: [
      {
        title: 'Viles W/Smiles: first room, first vial',
        content: 'Built the first bar room. You are behind the counter, the mafia guys are at the tables, and every drink you pour is a vial with a smile on it. Picking one up changes the room into a memory. The smile is doing a lot of work and I do not know why. The debt counter in the corner is the only UI and it is enough.',
        imageUrl: 'asset/devlogs/vileswsmiles_solver1.png',
      },
    ],
  },

  // ============ dev-2: NatK ============
  { id: 'game-3', title: 'Nihilist Me', developerId: 'dev-2', genre: 'Narrative', engine: 'Unity', stage: 'Development',
    shortDescription: 'A debate-driven narrative game where you argue with strangers and mock their logical fallacies.',
    thumbnailSeed: 'nihilistme', needsFeedback: true, feedbackCategory: 'UX',
    coverUrl: 'asset/covers/nihilistme_cover.png',
    devlogPlan: { count: 2, recentDaysAgo: 0.6, spacingDays: 7 },
    handWritten: [
      {
        title: 'Added 3 endings placeholder + panorama background',
        content: 'Wired up three ending placeholders — one where you win the argument, one where you lose it, one where the bus arrives before either of you is done. The last one is the most interesting and I did not plan for it. Also built a panorama background for the bus interior so the windows actually show the city passing. It is a static panorama right now, which means the bus is technically not moving, but the illusion holds for about four seconds. Next: making the windows actually scroll.',
        imageUrl: 'asset/devlogs/nihilistme_solver1.png',
      },
      {
        title: 'Implemented a local-llm driven AI to debate with you',
        content: 'Running a small local LLM (nothing cloud, nothing API-billed) to generate the stranger\'s responses in real time. It works, mostly. The problem is the model agrees with you too easily, which defeats the whole point of a debate game. Spent two days tweaking the prompt to make it push back without being hostile. Current version is stubborn but polite. The hidden axes (confidence, honesty, curiosity) are now being read off the model output instead of hardcoded, which is either clever or a terrible idea. Testing this week.',
        imageUrl: 'asset/devlogs/nihilistme_solver2.png',
      },
    ],
  },

  { id: 'game-4', title: 'Carccident', developerId: 'dev-2', genre: 'Simulation', engine: 'Unity', stage: 'Prototype',
    shortDescription: 'A traffic simulation where you as a conscious AI manage an intersection traffic lights.',
    thumbnailSeed: 'carccident', needsFeedback: true, feedbackCategory: 'Mechanics',
    coverUrl: 'asset/covers/carccident_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 0.12, spacingDays: 4 },
    handWritten: [
      {
        title: 'Modeling the 3D cars for the game, 2 emergency cars, and the rest are normal.',
        content: 'Finished the car roster: two emergency vehicles (ambulance, police) and six normal cars. The emergency ones get priority routing through the intersection, which changes the whole flow when they spawn. Modeling was fast; getting the lights to react to them was not. The AI voice line when an ambulance spawns is still a placeholder beep.',
        imageUrl: 'asset/devlogs/carccident_solver1.png',
      },
    ],
  },

  { id: 'game-5', title: 'Aspull', developerId: 'dev-2', genre: 'Arcade', engine: 'Unity', stage: 'Prototype',
    shortDescription: 'A reimagination of snake game. Sweep and dodge falling block, and survive as long as possible',
    thumbnailSeed: 'aspull', needsFeedback: true, feedbackCategory: 'Mechanics',
    coverUrl: 'asset/covers/aspull_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 1.2, spacingDays: 3 },
    handWritten: [
      {
        title: 'Making a silly snake game for my school project',
        content: 'It started as a snake game and turned into something else. You sweep left and right, blocks fall, and the sweep is also your dodge. The snake body is the magnet chain. It is silly and it is due next week and I am going to pretend I planned all of this.',
        imageUrl: 'asset/devlogs/aspull_solver1.png',
      },
    ],
  },

  // ============ dev-3: Maxim ============
  { id: 'game-6', title: 'Butt Pressure', developerId: 'dev-3', genre: 'Puzzle', engine: 'Unity', stage: 'Prototype',
    shortDescription: 'This guy needs to take a poopie wowow. Reach the toilet as soon as possible, before the poo meter runs out',
    thumbnailSeed: 'buttpressure', needsFeedback: true, feedbackCategory: 'Mechanics',
    coverUrl: 'asset/covers/buttpressure_cover.png',
    devlogPlan: { count: 2, recentDaysAgo: 0.8, spacingDays: 4 },
    handWritten: [
      {
        title: 'Creating one of the minigame objective, is it too tedious?',
        content: 'One of the minigames is a quick math test. You need to complete the challenge to earn enough money to buy a drink.',
        imageUrl: 'asset/devlogs/buttpressure_solver1.png',
      },
      {
        title: 'Creating the intro sequence. (Main character introduction)',
        content: 'The intro is a 20-second cutscene where the main character came in class after the teacher introduces you. It is an okay thing I have made.',
        imageUrl: 'asset/devlogs/buttpressure_solver2.png',
      },
    ],
  },

  { id: 'game-7', title: 'Train Market Simulator', developerId: 'dev-3', genre: 'Simulation', engine: 'Unreal', stage: 'Development',
    shortDescription: 'Run a market stall on the platform of a train that never stops. The customers are uhh, gitu lah, so they buy stuff at the side of the rail.',
    thumbnailSeed: 'trainmarket', needsFeedback: false,
    coverUrl: 'asset/covers/trainmarketsimulator_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 3, spacingDays: 5 },
    handWritten: [
      {
        title: 'Motion blur effect on the train',
        content: 'Added motion blur to the passing trains so the platform actually feels like it is next to a rail. Took three attempts while playing Terraria.',
        imageUrl: 'asset/devlogs/trainmarketsimulator_solver1.png',
      },
    ],
  },

  // ============ dev-4: Delwen ============
  { id: 'game-8', title: 'A.I.D', developerId: 'dev-4', genre: 'Action', engine: 'Unity', stage: 'Beta',
    shortDescription: 'An AI assistant that helps protect an island from Martin (an alien spaceship)',
    thumbnailSeed: 'aid', needsFeedback: true, feedbackCategory: 'Audio',
    coverUrl: 'asset/covers/aid_cover.png',
    devlogPlan: { count: 3, recentDaysAgo: 0.08, spacingDays: 5 },
    handWritten: [
      {
        title: 'Martin boss preview, added shield',
        content: 'Martin now has a shield phase. The shield flickers when you hit it, and the AI companion reads out the shield integrity in that too-calm voice. The fight is readable now. Next: giving the shield a sound that makes players want to stop shooting it, which is the opposite of what a shooter usually does.',
        imageUrl: 'asset/devlogs/aid_solver1.png',
      },
      {
        title: 'Added building/skycrapper and stuff',
        content: 'The island now has a skyline. 3 buildings prefab, all destructible, all wired to the same physics system. Martin uses them as an hostage, which means the boss fight has terrain for the first time. Performance is holding on the target hardware.',
        imageUrl: 'asset/devlogs/aid_solver2.png',
      },
      {
        title: 'Finally adding a main menu for my game',
        content: 'The main menu is the AI speaking directly to you for the first time. No music yet, just the voice saying "Wassup homie, whats good gng." Playtesters are unnerved. That is the correct reaction. The pause menu now does the same thing, which is either a great decision or a terrible one.',
        imageUrl: 'asset/devlogs/aid_solver3.png',
      },
    ],
  },

  // ============ dev-5: Silvana ============
  { id: 'game-9', title: 'Hammershot', developerId: 'dev-5', genre: 'Action', engine: 'Godot', stage: 'Prototype',
    shortDescription: 'A one-gun shooter where the gun is a hammer and the ammo is whatever you hit.',
    thumbnailSeed: 'hammershot', needsFeedback: false,
    coverUrl: 'asset/covers/hammershot_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 1.6, spacingDays: 5 },
    handWritten: [
      {
        title: 'Implementing a roguelike element, upgrade choice',
        content: 'Added a between-rooms upgrade screen with three choices. The twist is that the upgrades are made of the same materials as your ammo, so picking one means giving up a shot type. First build works. The choice screen is ugly but the trade-off is real, which is the part that matters.',
        imageUrl: 'asset/devlogs/hammershot_solver1.png',
      },
    ],
  },

  { id: 'game-10', title: 'The Absolute Theatre', developerId: 'dev-5', genre: 'Puzzle', engine: 'Godot', stage: 'Development',
    shortDescription: 'A puzzle game where the stage is the audience and the play changes every night based on who is watching.',
    thumbnailSeed: 'absolutethetre', needsFeedback: true, feedbackCategory: 'UX',
    coverUrl: 'asset/covers/theabsolutetheatre_cover.png',
    devlogPlan: { count: 2, recentDaysAgo: 4, spacingDays: 6 },
    handWritten: [
      {
        title: 'UI Design on the theatre show that is currently playing',
        content: 'Designed the show UI: a stage view, a seating chart, and a small panel showing what the audience is currently feeling. It reads like a sports broadcast and I love it. Next: making the feeling panel not spoil the ending of the play.',
        imageUrl: 'asset/devlogs/theabsolutethetre_solver1.png',
      },
      {
        title: 'Map preview',
        content: 'The map is the theatre itself. Each room is a stage. The seating arrangement is the puzzle. The preview shows the current play poster on the wall of the foyer, which changes every night. Small touch, but it makes the theatre feel like a place instead of a menu.',
        imageUrl: 'asset/devlogs/theabsolutethetre_solver2.png',
      },
    ],
  },

  // ============ dev-6: Olive Tong — 2 random ============
  { id: 'game-11', title: 'Lumen Vale', developerId: 'dev-6', genre: 'RPG', engine: 'Godot', stage: 'Development',
    shortDescription: 'A hand-painted cozy RPG about restoring light to a valley that forgot the sun.',
    thumbnailSeed: 'lumenvale', needsFeedback: true, feedbackCategory: 'Art',
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 1.1, spacingDays: 8 },
  },

  { id: 'game-12', title: 'Paper Cartographer', developerId: 'dev-6', genre: 'RPG', engine: 'Godot', stage: 'Beta',
    shortDescription: 'Draw your own map to explore a world that only exists where you ink it.',
    thumbnailSeed: 'papercart', needsFeedback: true, feedbackCategory: 'UX',
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 2, spacingDays: 7 },
  },

  // ============ dev-7: Nian Bean — 2 random ============
  { id: 'game-13', title: 'Dead Static', developerId: 'dev-7', genre: 'Action', engine: 'Unreal', stage: 'Prototype',
    shortDescription: 'Roguelike shooter where the level decays in real time and enemies spawn from noise.',
    thumbnailSeed: 'deadstatic', needsFeedback: true, feedbackCategory: 'Mechanics',
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 0.25, spacingDays: 3 },
  },

  { id: 'game-14', title: 'Overgrowth Protocol', developerId: 'dev-7', genre: 'Strategy', engine: 'Unreal', stage: 'Development',
    shortDescription: 'Real-time strategy where you play as the ecosystem, not the army.',
    thumbnailSeed: 'overgrowth', needsFeedback: false,
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 7, spacingDays: 5 },
  },

  // ============ dev-8: Balmond — 3 random ============
  { id: 'game-15', title: 'Small Hours', developerId: 'dev-8', genre: 'Simulation', engine: 'Unity', stage: 'Concept',
    shortDescription: 'A game about running a 24-hour diner where every customer conversation matters.',
    thumbnailSeed: 'smallhours', needsFeedback: true, feedbackCategory: 'Business',
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 5, spacingDays: 6 },
  },

  { id: 'game-16', title: 'Third Shift', developerId: 'dev-8', genre: 'Narrative', engine: 'Unity', stage: 'Prototype',
    shortDescription: 'A branching story about a night janitor who finds messages left for them.',
    thumbnailSeed: 'thirdshift', needsFeedback: true, feedbackCategory: 'Art',
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 0.45, spacingDays: 5 },
  },

  { id: 'game-17', title: 'Nine Lives, No Lease', developerId: 'dev-8', genre: 'Simulation', engine: 'Unity', stage: 'Concept',
    shortDescription: 'You are a cat trying to renew a lease in a city that does not rent to cats.',
    thumbnailSeed: 'ninelives', needsFeedback: true, feedbackCategory: 'UX',
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 6.5, spacingDays: 5 },
  },

  // ============ dev-9: Nailong — 1 random ============
  { id: 'game-18', title: 'Pebble', developerId: 'dev-9', genre: 'Puzzle', engine: 'Godot', stage: 'Prototype',
    shortDescription: 'A small game about a small rock that does small things. That is the whole pitch.',
    thumbnailSeed: 'pebble', needsFeedback: false,
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 3.5, spacingDays: 5 },
  },

  // ============ dev-10: Dape ============
  { id: 'game-19', title: 'Room For One More', developerId: 'dev-10', genre: 'Roguelike', engine: 'Unity', stage: 'Development',
    shortDescription: 'You worked for Mrs. Darwin who is a b****. She keeps complaining, blabbering about decorating on her small a** room',
    thumbnailSeed: 'roomforonemore', needsFeedback: true, feedbackCategory: 'Art',
    coverUrl: 'asset/covers/roomforonemore_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 0.9, spacingDays: 5 },
    handWritten: [
      {
        title: 'My gameover screen for my over super duper dumb game',
        content: 'The gameover screen is supposedly look like this: Mrs. Darwin standing in the doorway, arms crossed, saying nothing. Just a slow zoom and a sigh. Playtesters hate her. Also, she is racist asl.',
        imageUrl: 'asset/devlogs/roomforonemore_solver1.png',
      },
    ],
  },

  { id: 'game-20', title: 'Disaster Protocol', developerId: 'dev-10', genre: 'Survival', engine: 'Unity', stage: 'Prototype',
    shortDescription: 'Ipin kuning trying to survive a disaster on his own, because his parent left him in the ditch.',
    thumbnailSeed: 'disasterprotocol', needsFeedback: true, feedbackCategory: 'Mechanics',
    coverUrl: null,
    devlogPlan: { count: 1, recentDaysAgo: 2.2, spacingDays: 5 },
  },

  // ============ dev-11: London ============
  { id: 'game-21', title: 'koskonomy', developerId: 'dev-11', genre: 'Simulation', engine: 'Unity', stage: 'Concept',
    shortDescription: 'A game about a college student who lives in a kos-kosan, can you manage your finance?',
    thumbnailSeed: 'koskonomy', needsFeedback: true, feedbackCategory: 'Business',
    coverUrl: 'asset/covers/koskonomy_cover.png',
    devlogPlan: { count: 1, recentDaysAgo: 1.4, spacingDays: 5 },
    handWritten: [
      {
        title: 'art ter-gg, ter-gacor, ter-global game winning award',
        content: 'No explanation needed, rate 9-10 for the art. MC name is Alice btw',
        imageUrl: 'asset/devlogs/koskonomy_solver1.png',
      },
    ],
  },

  // ============ dev-12: Shina ============
  { id: 'game-22', title: "Auntie Mega's Milk Rush", developerId: 'dev-12', genre: 'Arcade', engine: 'Unity', stage: 'Prototype',
    shortDescription: "idk man",
    thumbnailSeed: 'auntiemega', needsFeedback: true, feedbackCategory: 'Mechanics',
    coverUrl: 'asset/covers/auntiemegamilk_cover.png',
    devlogPlan: { count: 2, recentDaysAgo: 0.3, spacingDays: 4 },
    handWritten: [
      {
        title: "Upgrade menu",
        content: 'Built the upgrade menu. You earn coins per delivery and spend them on routes, bottles, and a louder bicycle bell. The bell is the best upgrade. Players keep buying it first. I did not expect that and I am not going to argue with it.',
        imageUrl: 'asset/devlogs/auntiemegamilk_solver1.png',
      },
      {
        title: "Drawing a crazy cow in pixel art, also crazy side eye on the MC",
        content: 'The cow is the slave. It being exploitated by you is part of the game.',
        imageUrl: 'asset/devlogs/auntiemegamilk_solver2.png',
      },
    ],
  },
];