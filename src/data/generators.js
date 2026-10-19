import { pick, pickN, hashString } from '../utils.js';

const OPENERS = [
  'Spent the week on {topic}.',
  'Finally got {topic} working.',
  'Ripped out the old {topic} and rebuilt it.',
  'Small update this week: {topic}.',
  'Big change — {topic}.',
  'This week was mostly {topic}.',
  'Sat down with {topic} and did not come up for air.',
  'Third attempt at {topic}. This one is sticking.',
  'Refactored {topic} on a hunch.',
  'Benchmarked {topic} and it was worse than I thought.',
];

const TOPICS = [
  'the intersection solver',
  'the dialogue system',
  'the magnet chaining',
  'the audio mixer',
  'the decay system',
  'the tile palette',
  'the input handler',
  'the inventory UI',
  'the save system',
  'the shader graph',
  'the animation state machine',
  'the procgen pass',
  'the fog-of-war rendering',
  'the scheduling loop',
];

const MIDDLES = [
  'Before, {problem}. Now {result}.',
  'The problem turned out to be {problem} — {result}.',
  'I was worried about {problem}, but {result}.',
  'Took me three days to realize {problem}. Once I did, {result}.',
  '{problem}, which was not obvious. Fixing it means {result}.',
  'Spent two days chasing {problem}. The actual fix was {result}.',
];

const PROBLEMS = [
  'cars would deadlock at four-way stops',
  'the NPCs kept picking the mean option',
  'players stopped feeling challenged after ninety seconds',
  'the static read as noise instead of signal',
  'the water looked flat and dead',
  'the procgen kept sealing off the exit',
  'the input buffer swallowed short presses',
  'the camera lerp made players motion-sick',
  'the audio mix buried the cue I actually needed',
  'the collision boxes were a frame behind',
  'the save file grew unbounded',
  'the AI pathing recomputed every tick',
];

const RESULTS = [
  'throughput is up about 40 percent',
  'the conversation finally has stakes',
  'the difficulty curve has a real second act',
  'playtesters are navigating by sound alone',
  'shifting the value fixed it instantly',
  'the level always has at least two exits',
  'dashes and taps are finally distinguishable',
  'a fixed camera works better than a follow cam',
  'the cue reads through anything',
  'the hitbox matches what you see',
  'the save is under 200 KB',
  'pathing runs once and caches',
];

const CLOSERS = [
  'Next: {next}.',
  'The open question is {next}.',
  'Still stuck on {next}.',
  'Would love feedback on {next}.',
  'Not sure yet about {next}.',
  'The next milestone is {next}.',
];

const NEXT_STEPS = [
  'what happens when an accident blocks a lane',
  'whether the trade-offs are legible without a stat screen',
  'making the magnets themselves the hazard',
  'whether an optional visual fallback hurts the design',
  'biasing decay away from critical routes',
  'whether the pacing holds up past the first hour',
  'how to teach the system without a tutorial',
  'if the sound design carries the tension alone',
  'whether players will accept losing progress',
  'how much randomness is too much',
  'if the UI needs a minimap after all',
  'what to cut before the demo',
];

const DETAILS = [
  'I also cleaned up a pile of dead code while I was in there.',
  'Performance is fine on the current map sizes.',
  'The debug overlay is earning its keep now.',
  'I recorded a short clip to compare before and after.',
  'Two playtesters got through it without a hint.',
  'One playtester broke it in a way I did not expect.',
  'The build is still rough but the shape is right.',
  'I am trying not to polish anything until the loop is fun.',
];

export const SAMPLE_VIDEOS = [
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
  'https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4',
];

const POOLS = {
  topic: TOPICS,
  problem: PROBLEMS,
  result: RESULTS,
  next: NEXT_STEPS,
};

function fill(template, seed) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const pool = POOLS[key];
    if (!pool) return key;
    return pick(pool, seed + ':' + key);
  });
}

export function makeDevlogContent(seed, opts = {}) {
  const parts = opts.parts ?? 3;
  const voice = opts.voice || {};

  const openers = voice.openers || OPENERS;
  const middles = voice.middles || MIDDLES;
  const closers = voice.closers || CLOSERS;
  const details = voice.details || DETAILS;

  const opener = fill(pick(openers, seed + ':opener'), seed + ':opener');
  const middle = fill(pick(middles, seed + ':middle'), seed + ':middle');
  const closer = fill(pick(closers, seed + ':closer'), seed + ':closer');

  const sections = [opener, middle, closer];

  if (parts >= 4) {
    const detail = pick(details, seed + ':detail');
    sections.splice(sections.length - 1, 0, detail);
  }

  return sections.slice(0, parts).join(' ');
}

const TITLE_PATTERNS = [
  '{Topic} — {verdict}',
  '{Topic}: {verdict}',
  'Working on {topic}: {verdict}',
  '{verdict} after rebuilding {topic}',
  '{Topic} rebuild, day {n}',
  '{Topic} is finally behaving',
  'Notes on {topic}',
  '{Topic}: still not right',
];

const VERDICTS = [
  'first working pass',
  'the fix was simpler than expected',
  'a rough but honest prototype',
  'better, but not there',
  'this one is sticking',
  'not sure yet',
  'early results',
  'playtest notes',
];

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makeDevlogTitle(seed, opts = {}) {
  const voice = opts.voice || {};
  const patterns = voice.titlePatterns || TITLE_PATTERNS;
  const pattern = pick(patterns, seed + ':title');
  const rawTopic = pick(TOPICS, seed + ':topicTitle');
  const verdict = pick(VERDICTS, seed + ':verdict');
  const n = 1 + (hashString(seed) % 6);

  return pattern
    .replace('{topic}', rawTopic)
    .replace('{Topic}', titleCase(rawTopic))
    .replace('{verdict}', verdict)
    .replace('{n}', String(n));
}

export function shouldHaveVideo(seed) {
  return hashString(String(seed) + ':video') % 2 === 0;
}

let videoPickCounter = 0;
export function pickVideo(seed) {
  const pick = videoPickCounter++;
  return SAMPLE_VIDEOS[pick % SAMPLE_VIDEOS.length];
}