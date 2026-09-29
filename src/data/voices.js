export const VOICES = {
  'dev-1': {
    openers: [
      'Refactored {topic}.',
      'Rewrote {topic} from scratch.',
      'Profiled {topic} and found the bottleneck.',
      'Benchmarked {topic} before and after.',
      'Shipped a new pass on {topic}.',
    ],
    closers: [
      'Next: {next}.',
      'Numbers suggest {next} is the right next move.',
      'The remaining question is {next}.',
    ],
    titlePatterns: [
      '{Topic} — {verdict}',
      '{Topic}: measured {n} percent improvement',
      'Rebuilt {topic}',
    ],
  },

  'dev-2': {
    openers: [
      'I keep circling back to {topic}.',
      'This week was about {topic}.',
      'Sat with {topic} for a few days.',
      'Wrote and deleted {topic} twice.',
      'The interesting part was not {topic}.',
    ],
    middles: [
      'Players do not do what you expect. {problem}. {result}.',
      'I thought the issue was {problem}. It was not. {result}.',
      'What actually mattered was {problem} — {result}.',
    ],
    closers: [
      'Still sitting with {next}.',
      'I want to know {next}.',
      'The open question is {next}.',
    ],
    titlePatterns: [
      'Notes on {topic}',
      '{Topic}, and what it is not',
      'Thinking about {topic}',
    ],
  },

  'dev-3': {
    openers: [
      'Tightened {topic}.',
      'Cut {topic} in half.',
      'Made {topic} faster and dumber.',
      'New pass on {topic}.',
      'Threw out {topic} again.',
    ],
    middles: [
      'It was {problem}. Now {result}.',
      '{problem}. Fixed: {result}.',
      'Problem: {problem}. Result: {result}.',
    ],
    closers: [
      'Next up: {next}.',
      'Then {next}.',
      'Want feedback on {next}.',
    ],
    titlePatterns: [
      '{Topic} — {verdict}',
      '{Topic}, again',
      'Cut {topic}',
    ],
  },

  'dev-4': {
    openers: [
      'New audio pass on {topic}.',
      'Spent the week on {topic} with headphones on.',
      'Recorded field audio for {topic}.',
      'Tuned {topic} in the mix.',
    ],
    middles: [
      '{problem}. Which is a good problem. {result}.',
      'The silence around {problem} is doing more work than the sound. {result}.',
      '{problem} — that turned out to be the right amount of wrong. {result}.',
    ],
    closers: [
      'Curious whether {next}.',
      'The question is {next}.',
      'Resisting the urge to add more until {next}.',
    ],
    titlePatterns: [
      '{Topic} — {verdict}',
      'Sound notes: {topic}',
      'Quiet work on {topic}',
    ],
  },
};

export function getVoice(developerId) {
  return VOICES[developerId] || null;
}