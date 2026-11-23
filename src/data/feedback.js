import { ago, HOUR, DAY } from '../utils.js';

export const SEED_FEEDBACK = [

  // ===========================================================
  // game-1: Lil Shroom (dev-1, Platformer) — 1 devlog
  // devlog: "Lil Shroom got a face and it is judging me"
  // ============================================================
  {
    id: 'fb-1', postId: 'game-1-dl-1', authorId: 'dev-6', category: 'Art',
    text: 'The disappointed hop is the whole game now. Please do not remove it. If anything, make it slower so it reads as genuine disappointment instead of a bounce.',
    timestamp: ago(5 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-2', postId: 'game-1-dl-1', authorId: 'dev-3', category: 'Art',
    text: 'The squint reads as "cute" at 1x but "creepy" at 2x. If that is intentional, lean in. If not, check your export scale.',
    timestamp: ago(1 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-2: Viles W/Smiles (dev-1, Horror) — 1 devlog
  // devlog: "Viles W/Smiles: first room, first vial"
  // ============================================================
  {
    id: 'fb-3', postId: 'game-2-dl-1', authorId: 'dev-4', category: 'Art',
    text: 'The debt counter as the only UI is a strong choice. One concern: if the player can\'t see what a vial does before picking it up, they will save-scum. Give them one free vial that is clearly a trap so they learn the language.',
    timestamp: ago(3 * HOUR), seenByDev: true, actedOn: false,
    replies: [
      {
        id: 'r-1', authorId: 'dev-1',
        text: 'That is a good call. I was planning to hide the first vial\'s effect but I can make it a "free" memory that is obviously bad. Thank you.',
        timestamp: ago(2 * HOUR),
      },
    ],
  },
  {
    id: 'fb-4', postId: 'game-2-dl-1', authorId: 'dev-10', category: 'Narrative',
    text: 'The mafia framing is doing less work than you think. The bar could be any bar. What if the vials are the mafia\'s product, not just debt? Then every pour is complicity.',
    timestamp: ago(2 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-3: Nihilist Me (dev-2, Narrative) — 2 devlogs
  // dl-1: "Added 3 endings placeholder + panorama background"
  // dl-2: "Implemented a local-llm driven AI to debate with you"
  // ============================================================
  {
    id: 'fb-5', postId: 'game-3-dl-1', authorId: 'dev-5', category: 'UX',
    text: 'The static panorama holding for four seconds is actually the right amount of time for a bus stop scene. Do not make the windows scroll. The stillness is the point.',
    timestamp: ago(1 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-6', postId: 'game-3-dl-1', authorId: 'dev-8', category: 'Narrative',
    text: 'The third ending (bus arrives before either of you is done) is the strongest one. If it is not the canon ending, reconsider. The unresolved conversation is more nihilist than winning the argument.',
    timestamp: ago(4 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-7', postId: 'game-3-dl-2', authorId: 'dev-1', category: 'Narrative',
    text: 'Local LLM is the right call for a debate game. One worry: if the model is polite, the game has no teeth. You may need a "cruel" system prompt as a toggle, so players can choose the bus they want to ride.',
    timestamp: ago(30 * HOUR), seenByDev: true, actedOn: true,
    replies: [
      {
        id: 'r-2', authorId: 'dev-2',
        text: 'The "cruel toggle" is a great idea. Going to add a difficulty axis that is just the model\'s hostility setting.',
        timestamp: ago(28 * HOUR),
      },
    ],
  },
  {
    id: 'fb-8', postId: 'game-3-dl-2', authorId: 'dev-7', category: 'UX',
    text: 'A local LLM will hallucinate a fallacy that is not there. Your answer to that needs to be a UI affordance, not a prompt fix. Let the player "call out" a non-existent fallacy and have the NPC react to it.',
    timestamp: ago(2 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-4: Carccident (dev-2, Simulation) — 1 devlog
  // devlog: "Modeling the 3D cars..., 2 emergency cars"
  // ============================================================
  {
    id: 'fb-9', postId: 'game-4-dl-1', authorId: 'dev-5', category: 'Mechanics',
    text: 'Emergency vehicles changing the flow is the right hook. But the AI voice line should be nervous, not authoritative. A conscious AI who has to route an ambulance is a system under stress. That is the game.',
    timestamp: ago(2 * HOUR), seenByDev: true, actedOn: false,
    replies: [
      {
        id: 'r-3', authorId: 'dev-2',
        text: 'Nervous AI is a much better read than authoritative. I was thinking "helpful assistant," but "stressed system" is way more interesting.',
        timestamp: ago(1 * HOUR),
      },
    ],
  },
  {
    id: 'fb-10', postId: 'game-4-dl-1', authorId: 'dev-8', category: 'Mechanics',
    text: 'If emergency vehicles get priority, the player will learn to spawn them. Is that the intended strategy, or an exploit? If it is the strategy, name it. "Ambulance rush" is a fun win condition.',
    timestamp: ago(1 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-5: Aspull (dev-2, Arcade) — 1 devlog
  // devlog: "Making a silly snake game for my school project"
  // ============================================================
  {
    id: 'fb-11', postId: 'game-5-dl-1', authorId: 'dev-3', category: 'Mechanics',
    text: 'The sweep-as-dodge is a real mechanic. For a school project, you are already ahead of the curve. If you have time, add one frame of coyote time on the sweep so it feels less punishing.',
    timestamp: ago(6 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-12', postId: 'game-5-dl-1', authorId: 'dev-9', category: 'Mechanics',
    text: 'The snake body as the magnet chain is clever. The magnet chain should get longer as you survive, so the difficulty is built into the visual. Real snakes do this.',
    timestamp: ago(3 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-6: Butt Pressure (dev-3, Puzzle) — 2 devlogs
  // dl-1: "Creating one of the minigame objective"
  // dl-2: "Creating the intro sequence"
  // ============================================================
  {
    id: 'fb-13', postId: 'game-6-dl-1', authorId: 'dev-1', category: 'Mechanics',
    text: 'The math test minigame is the wrong genre for this game. A poop meter game should not have arithmetic. Replace it with a rhythm or reaction minigame and the tension actually holds.',
    timestamp: ago(1 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-14', postId: 'game-6-dl-1', authorId: 'dev-8', category: 'Mechanics',
    text: 'The minigame is tedious only if it is mandatory. Make it one of three ways to earn the money and suddenly it is optional texture, not a wall. "Tedious" is a design choice.',
    timestamp: ago(8 * HOUR), seenByDev: true, actedOn: false,
    replies: [
      {
        id: 'r-4', authorId: 'dev-3',
        text: 'That is a fair reframe. The math test is currently the only way and I see now why it feels like a wall. Making it one of three routes is the fix.',
        timestamp: ago(6 * HOUR),
      },
    ],
  },
  {
    id: 'fb-15', postId: 'game-6-dl-2', authorId: 'dev-2', category: 'Narrative',
    text: 'The 20-second intro is fine, but the teacher introduction scene is doing too much work. Let the player figure out the classroom from the visuals. Cut every line the teacher says.',
    timestamp: ago(2 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-7: Train Market Simulator (dev-3, Simulation) — 1 devlog
  // devlog: "Motion blur effect on the train"
  // ============================================================
  {
    id: 'fb-16', postId: 'game-7-dl-1', authorId: 'dev-4', category: 'Art',
    text: 'Motion blur on the train is the correct call for the aesthetic. If you can, tie blur intensity to train speed so slow trains are sharp. That gives you a real visual language for "this train is going to stop."',
    timestamp: ago(3 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-17', postId: 'game-7-dl-1', authorId: 'dev-10', category: 'Art',
    text: 'You fixed motion sickness on the train but not the platform. If the camera lerps on the platform, players will still get sick. Test the whole scene, not just the blur.',
    timestamp: ago(1 * DAY + 2 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-8: A.I.D (dev-4, Action) — 3 devlogs
  // dl-1: "Martin boss preview, added shield"
  // dl-2: "Added building/skycrapper and stuff"
  // dl-3: "Finally adding a main menu for my game"
  // ============================================================
  {
    id: 'fb-18', postId: 'game-8-dl-1', authorId: 'dev-1', category: 'Audio',
    text: 'The shield needing a "please stop shooting" sound is the hardest audio problem in the game. Suggestion: the shield tone should be an inverted version of the AI voice, so players instinctively trust the shield and then feel weird about it.',
    timestamp: ago(4 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-19', postId: 'game-8-dl-1', authorId: 'dev-7', category: 'Mechanics',
    text: 'If the shield flickers every hit, the audio should flicker with it. Do not use a sustained shield hum. Use a click per impact. Sustained hums read as "immune," clicks read as "breakable."',
    timestamp: ago(1 * DAY), seenByDev: true, actedOn: false,
    replies: [
      {
        id: 'r-5', authorId: 'dev-4',
        text: 'Clicks over hums is a much better read. I was doing a hum and it made the shield feel invincible even while breaking. Changing it.',
        timestamp: ago(20 * HOUR),
      },
    ],
  },
  {
    id: 'fb-20', postId: 'game-8-dl-2', authorId: 'dev-5', category: 'Mechanics',
    text: 'Buildings as hostages is the most interesting thing in this game. It means Martin is playing defense, not offense. Lean into that: give Martin a "hostage count" so the player has a visible clock.',
    timestamp: ago(1 * DAY + 4 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-21', postId: 'game-8-dl-2', authorId: 'dev-9', category: 'Art',
    text: 'Three buildings is too few for a skyline. Skyline needs 6+ to read. If prefab instancing is cheap, do 8. The silhouette is the identity.',
    timestamp: ago(3 * DAY), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-22', postId: 'game-8-dl-3', authorId: 'dev-2', category: 'UX',
    text: 'The main menu AI voice is great. The pause menu doing the same is fine. But the death screen should be silent. The AI should have nothing to say when you die. Silence is the apology.',
    timestamp: ago(2 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-23', postId: 'game-8-dl-3', authorId: 'dev-6', category: 'UX',
    text: '"Wassup homie, whats good gng" is a great line but it will break on the third restart. Rotate three voice lines at minimum. Repetition will kill the joke.',
    timestamp: ago(6 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-9: Hammershot (dev-5, Action) — 1 devlog
  // devlog: "Implementing a roguelike element, upgrade choice"
  // ============================================================
  {
    id: 'fb-24', postId: 'game-9-dl-1', authorId: 'dev-7', category: 'Mechanics',
    text: 'Upgrades as materials is the right twist. One concern: if the upgrade screen appears between every room, it becomes a chore. Gate upgrades to every 3 rooms so the choice has weight.',
    timestamp: ago(8 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-25', postId: 'game-9-dl-1', authorId: 'dev-3', category: 'Mechanics',
    text: 'The choice screen being "ugly" is fine. Roguelikes with pretty upgrade screens make you want to linger. An ugly one that you want to click through is doing its job.',
    timestamp: ago(2 * DAY + 4 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },

  // ============================================================
  // game-10: The Absolute Theatre (dev-5, Puzzle) — 2 devlogs
  // dl-1: "UI Design on the theatre show"
  // dl-2: "Map preview"
  // ============================================================
  {
    id: 'fb-26', postId: 'game-10-dl-1', authorId: 'dev-2', category: 'UX',
    text: 'The sports-broadcast UI is a strong choice. But "audience feeling" is the one panel that could spoil the play. Try showing emotion as color only, not labels. Let the audience be legible without being explained.',
    timestamp: ago(5 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-27', postId: 'game-10-dl-1', authorId: 'dev-8', category: 'UX',
    text: 'Seating chart as puzzle is the whole game. If the feeling panel is too legible, the puzzle collapses into arithmetic. If it is too opaque, the puzzle is guessing. This is the tuning problem of the game and you already know it.',
    timestamp: ago(1 * DAY + 6 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-28', postId: 'game-10-dl-2', authorId: 'dev-6', category: 'Art',
    text: 'The play poster changing every night is a lovely detail. If you have time, give the poster its own little history: each night it gets slightly more worn. Makes the theatre feel lived-in.',
    timestamp: ago(1 * DAY), seenByDev: true, actedOn: false, replies: [],
  },
  {
    id: 'fb-29', postId: 'game-10-dl-2', authorId: 'dev-11', category: 'UX',
    text: 'The map preview as a "poster in the foyer" is charming. If the map is the theatre, can the player ever see the theatre from outside? A single exterior shot would give the interior a shape.',
    timestamp: ago(3 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-11: Lumen Vale (dev-6, RPG) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-30', postId: 'game-11-dl-1', authorId: 'dev-1', category: 'Art',
    text: 'The cozy vibe is working. The water is the one thing that reads as flat. Before adding caustics, try shifting the value one step lighter and see if it stops reading as "dead."',
    timestamp: ago(6 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-31', postId: 'game-11-dl-1', authorId: 'dev-4', category: 'Art',
    text: 'The 24-color palette is ambitious. Are you palette-swapping for night scenes, or shifting the whole hue? The latter will break the painted look. The former is the right call.',
    timestamp: ago(1 * DAY + 4 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-12: Paper Cartographer (dev-6, RPG) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-32', postId: 'game-12-dl-1', authorId: 'dev-5', category: 'UX',
    text: 'Split ink into "known" and "committed" is a strong idea. One risk: if the two pools look the same, players will confuse them and lose a run. Give committed ink a different color, not just a different counter.',
    timestamp: ago(2 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-33', postId: 'game-12-dl-1', authorId: 'dev-9', category: 'UX',
    text: 'The "torn region keeps last mark at reduced opacity" is good, but make sure the torn region is still legible as a shape. Losing a region should feel like a scar, not a void.',
    timestamp: ago(1 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-13: Dead Static (dev-7, Action) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-34', postId: 'game-13-dl-1', authorId: 'dev-3', category: 'Mechanics',
    text: 'The decay-on-a-delay-after-checkpoint trick is the right fix. If it still feels scripted, add a "collapse warning" sound that plays 2 seconds before a chunk goes. Players will route around it and feel clever.',
    timestamp: ago(1 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-35', postId: 'game-13-dl-1', authorId: 'dev-1', category: 'Mechanics',
    text: 'If decay destroys the only path forward, the player will assume the game is unfair. Easiest fix: every chunk that collapses must spawn an alternate route somewhere in the level. It sounds like more work but it is actually one spawn rule.',
    timestamp: ago(1 * DAY + 2 * HOUR), seenByDev: true, actedOn: false,
    replies: [
      {
        id: 'r-6', authorId: 'dev-7',
        text: 'The spawn-an-alternate-route rule is exactly what I needed. I was trying to bias decay away from paths. Spawning an alternate is more honest and easier to read.',
        timestamp: ago(20 * HOUR),
      },
    ],
  },

  // ============================================================
  // game-14: Overgrowth Protocol (dev-7, Strategy) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-36', postId: 'game-14-dl-1', authorId: 'dev-8', category: 'Mechanics',
    text: 'Playing as the ecosystem is a strong frame. The readability question is real: if three factions look the same on the map, the player will not see the interplay. Give each faction a distinct silhouette at every zoom level.',
    timestamp: ago(4 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-37', postId: 'game-14-dl-1', authorId: 'dev-5', category: 'Mechanics',
    text: 'If the player "nudges, never commands," the whole game is trust. That is a hard pitch. One suggestion: give the player one loud command per mission as a break-glass moment. It will feel powerful precisely because it is rare.',
    timestamp: ago(2 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-15: Small Hours (dev-8, Simulation) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-38', postId: 'game-15-dl-1', authorId: 'dev-2', category: 'Narrative',
    text: 'The no-fail-state idea is defensible for a mood piece. But players will look for a fail state even if you say there is none. Give them one: the shift ends. That is the failure, and it is real.',
    timestamp: ago(6 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-39', postId: 'game-15-dl-1', authorId: 'dev-11', category: 'Business',
    text: 'Six booths is a lot of conversations to write. If you scale this past a prototype, the writing will be the bottleneck. Consider a small pool of re-usable customer arcs rather than unique ones.',
    timestamp: ago(2 * DAY + 4 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-16: Third Shift (dev-8, Narrative) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-40', postId: 'game-16-dl-1', authorId: 'dev-6', category: 'Art',
    text: 'The notes mechanic is doing the work. The janitor should never speak. Every line of dialogue you give them is a line that should have been a note from the previous janitor.',
    timestamp: ago(3 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-41', postId: 'game-16-dl-1', authorId: 'dev-9', category: 'Narrative',
    text: 'If the notes are static text, the scope creep worry is real. But a small version: only the final note changes based on earlier choices. One dynamic line at the end is enough to sell the whole system.',
    timestamp: ago(1 * DAY + 6 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-17: Nine Lives, No Lease (dev-8, Simulation) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-42', postId: 'game-17-dl-1', authorId: 'dev-3', category: 'Mechanics',
    text: 'A cat trying to renew a lease is a great pitch. One question: is the joke the premise, or is there a game underneath? If the lease negotiation is not actually mechanical, the joke will run out in five minutes.',
    timestamp: ago(1 * DAY + 2 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-18: Pebble (dev-9, Puzzle) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-43', postId: 'game-18-dl-1', authorId: 'dev-6', category: 'Art',
    text: '"A small rock that does small things" is the whole pitch and it is enough. The art needs to be very confident to carry a premise this thin. If the pebble is not charming, the game is not a game.',
    timestamp: ago(2 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-19: Room For One More (dev-10, Roguelike) — 1 devlog
  // devlog: "My gameover screen for my over super duper dumb game"
  // ============================================================
  {
    id: 'fb-44', postId: 'game-19-dl-1', authorId: 'dev-2', category: 'Art',
    text: 'Mrs. Darwin saying nothing is the correct gameover screen. If she says anything, you lose it. The slow zoom and the sigh are doing all the work. Do not add music.',
    timestamp: ago(1 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-45', postId: 'game-19-dl-1', authorId: 'dev-12', category: 'Art',
    text: '"She is racist asl" is a real characterization choice and it is the kind of specificity that makes a villain land. Playtesters hating her is good. Playtesters hating the game is the risk. Keep her funny even when she is awful.',
    timestamp: ago(6 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-20: Disaster Protocol (dev-10, Survival) — 1 generated devlog
  // ============================================================
  {
    id: 'fb-46', postId: 'game-20-dl-1', authorId: 'dev-4', category: 'Mechanics',
    text: 'Ipin Kuning alone in a ditch is the premise and the mood. The design question is whether the game is about the disaster or about Ipin. If it is about Ipin, the disaster should be background noise, not the system.',
    timestamp: ago(4 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-47', postId: 'game-20-dl-1', authorId: 'dev-8', category: 'Mechanics',
    text: 'Survival on your own is a lonely loop. If you can, give Ipin one recurring NPC (a stray dog, a neighbor\'s voice through a wall) to break the silence. Loneliness needs a witness.',
    timestamp: ago(2 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-21: koskonomy (dev-11, Simulation) — 1 devlog
  // devlog: "art ter-gg, ter-gacor, ter-global game winning award"
  // ============================================================
  {
    id: 'fb-48', postId: 'game-21-dl-1', authorId: 'dev-3', category: 'Art',
    text: 'Manifesting the award is a valid dev strategy. The art does read as a kos-kosan, which is more than most prototypes. Alice is a good name. The four-room ledger idea is the game.',
    timestamp: ago(2 * HOUR), seenByDev: true, actedOn: false, replies: [],
  },
  {
    id: 'fb-49', postId: 'game-21-dl-1', authorId: 'dev-6', category: 'Business',
    text: 'The rent-in-favors tenant is the most interesting one. If you can make favors a currency the player can spend, you have a real economy, not just a joke.',
    timestamp: ago(1 * DAY), seenByDev: false, actedOn: false, replies: [],
  },

  // ============================================================
  // game-22: Auntie Mega's Milk Rush (dev-12, Arcade) — 2 devlogs
  // dl-1: "Upgrade menu"
  // dl-2: "Drawing a crazy cow in pixel art, also crazy side eye on the MC"
  // ============================================================
  {
    id: 'fb-50', postId: 'game-22-dl-1', authorId: 'dev-1', category: 'Mechanics',
    text: 'The bell being the best upgrade is hilarious and correct. Players will always buy the dumbest upgrade first. If you can, add a bell-tier-2 that is worse but louder. That is the joke.',
    timestamp: ago(1 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-51', postId: 'game-22-dl-2', authorId: 'dev-8', category: 'Art',
    text: 'The cow being "the slave" and "exploited by you" is a real direction. The side eye should be the cow\'s main animation. One frame of the cow judging you per delivery is enough to make it a character.',
    timestamp: ago(4 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-52', postId: 'game-22-dl-2', authorId: 'dev-6', category: 'Art',
    text: 'Pixel art cows are hard to make cute without making them babies. You drew a cow that reads as an adult. That is rarer than it sounds. Keep it.',
    timestamp: ago(2 * DAY), seenByDev: true, actedOn: true, replies: [],
  },
];