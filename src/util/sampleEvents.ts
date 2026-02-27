// sample events for testing purposes
export type Event = {
  node: number;
  state: "visited" | "visiting";
  timestamp: number;
  edge?: { from: number; to: number }; // traversing edge from -> to
};

export const sampleEvents: Event[] = [
  { state: "visiting", node: 1, timestamp: 0 },
  { state: "visited", node: 1, timestamp: 1 },
  // visiting node 1 from node 0
  { state: "visiting", node: 2, timestamp: 2, edge: { from: 1, to: 2 } },
  { state: "visited", node: 2, timestamp: 3 },
  // visiting node 2 from node 1
  { state: "visiting", node: 4, timestamp: 4, edge: { from: 2, to: 4 } },
  { state: "visited", node: 4, timestamp: 5 },
];
