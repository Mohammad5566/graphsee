// sample events for testing purposes
export type Event = { type: 'current' | 'visit'; node: number; timestamp: number };

export const sampleEvents: Event[] = [
  { type: 'current', node: 0, timestamp: 0 },
  { type: 'visit', node: 0, timestamp: 1 },
  { type: 'current', node: 1, timestamp: 2 },
  { type: 'visit', node: 1, timestamp: 3 },
  { type: 'current', node: 2, timestamp: 4 },
  { type: 'visit', node: 2, timestamp: 5 }
];
