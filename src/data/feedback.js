import { ago, HOUR, DAY } from '../utils.js';

export const SEED_FEEDBACK = [
  {
    id: 'fb-1', postId: 'game-1-dl-1', authorId: 'dev-3', category: 'Mechanics',
    text: 'The intersection priority pass is clever but I think you should expose the scoring somehow, even a debug overlay. Otherwise players will read deadlocks as bugs.',
    timestamp: ago(2 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-2', postId: 'game-1-dl-1', authorId: 'dev-8', category: 'Mechanics',
    text: 'Have you tried making the accident itself the interesting part? Like, the ripple effects are the game, not the avoidance.',
    timestamp: ago(1 * HOUR), seenByDev: true, actedOn: true,
    replies: [
      {
        id: 'r-1', authorId: 'dev-1',
        text: 'That is a really good reframe. I was treating accidents as failures. Going to prototype a mode where you cause them on purpose.',
        timestamp: ago(30 * 60 * 1000),
      },
    ],
  },
  {
    id: 'fb-3', postId: 'game-2-dl-1', authorId: 'dev-6', category: 'UX',
    text: 'The axes problem is real. Maybe instead of showing numbers, show the NPC body language changing. Let players read the room, not the stats.',
    timestamp: ago(10 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-4', postId: 'game-3-dl-1', authorId: 'dev-7', category: 'Mechanics',
    text: 'Unstable magnets sound great. Make them visually distinct but not color-coded. Shape and motion, so it works in grayscale.',
    timestamp: ago(1 * DAY), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-5', postId: 'game-4-dl-1', authorId: 'dev-5', category: 'Audio',
    text: 'The static-as-navigation is defensible. Games like Thief did this with light. Just give players an optional visual fallback in accessibility settings.',
    timestamp: ago(1 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-6', postId: 'game-6-dl-1', authorId: 'dev-1', category: 'Art',
    text: 'The water flatness might be a value problem, not a detail problem. Try shifting the value instead of adding caustics.',
    timestamp: ago(20 * HOUR), seenByDev: true, actedOn: true, replies: [],
  },
  {
    id: 'fb-7', postId: 'game-7-dl-1', authorId: 'dev-3', category: 'Mechanics',
    text: 'For decay biasing: mark a critical path graph at level start, and weight decay probability inversely to criticality. Cheap and readable.',
    timestamp: ago(4 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-8', postId: 'game-10-dl-1', authorId: 'dev-2', category: 'UX',
    text: 'Split the ink into two pools: known and committed. Only committed ink tears paper. Gives you a safety net without removing the tension.',
    timestamp: ago(1 * DAY + 3 * HOUR), seenByDev: false, actedOn: false, replies: [],
  },

  {
    id: 'fb-9', postId: 'game-2-dl-1', authorId: 'dev-1', category: 'Narrative',
    text: 'The bus setting is doing a lot of work. Consider using the arrival at a stop as a soft timer — the argument does not need to end because the conversation runs out, it ends because the bus stops.',
    timestamp: ago(2 * DAY), seenByDev: true, actedOn: true,
    replies: [
      {
        id: 'r-2', authorId: 'dev-2',
        text: 'This is exactly the pressure I was missing. Going to prototype a bus-stop-driven pacing so the timer feels diegetic.',
        timestamp: ago(2 * DAY - 30 * 60 * 1000),
      },
    ],
  },
  {
    id: 'fb-10', postId: 'game-4-dl-1', authorId: 'dev-1', category: 'Audio',
    text: 'The static-as-direction is the right idea, but the tonal resolve may be too generous. Try leaving it unresolved when the source is very close — as if the silence is the answer. Playtesters will sit with it longer.',
    timestamp: ago(3 * DAY), seenByDev: true, actedOn: false, replies: [],
  },
  {
    id: 'fb-11', postId: 'game-7-dl-1', authorId: 'dev-1', category: 'Mechanics',
    text: 'For the decay bias problem — instead of weighting criticality, run decay on a delay after the player crosses a checkpoint. The player gets credit for progress, the floor still collapses, and you avoid the puzzle-lock feeling.',
    timestamp: ago(5 * DAY), seenByDev: false, actedOn: false, replies: [],
  },
  {
    id: 'fb-12', postId: 'game-10-dl-1', authorId: 'dev-1', category: 'UX',
    text: 'The two-pool ink idea is strong. One addition: let torn regions keep the last successful ink mark, but at reduced opacity. That way the player sees what they lost without losing the shape entirely.',
    timestamp: ago(6 * DAY), seenByDev: true, actedOn: true, replies: [],
  },
];