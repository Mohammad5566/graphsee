// sample events for testing purposes
export interface Event {
  node: string;
  state: "visited" | "visiting";
  timestamp: number;
  lineNumber: number; // line number in code being executed
  edge?: { from: string; to: string }; // traversing edge from -> to
}

export const sampleEvents: Event[] = [
  { state: "visiting", node: "1", timestamp: 0, lineNumber: 1 },
  { state: "visited", node: "1", timestamp: 1, lineNumber: 2 },
  // visiting node 1 from node 0
  {
    state: "visiting",
    node: "2",
    timestamp: 2,
    lineNumber: 3,
    edge: { from: "1", to: "2" },
  },
  { state: "visited", node: "2", timestamp: 3, lineNumber: 4 },
  // visiting node 2 from node 1
  {
    state: "visiting",
    node: "4",
    timestamp: 4,
    lineNumber: 5,
    edge: { from: "2", to: "4" },
  },
  { state: "visited", node: "4", timestamp: 5, lineNumber: 6 },
  // visiting node 5 from node 4
  {
    state: "visiting",
    node: "5",
    timestamp: 6,
    lineNumber: 7,
    edge: { from: "4", to: "5" },
  },
  { state: "visited", node: "5", timestamp: 7, lineNumber: 8 },
  // visiting node 7 from node 5
  {
    state: "visiting",
    node: "7",
    timestamp: 8,
    lineNumber: 9,
    edge: { from: "5", to: "7" },
  },
  { state: "visited", node: "7", timestamp: 9, lineNumber: 10 },
  // visiting node 8 from node 7
  {
    state: "visiting",
    node: "8",
    timestamp: 10,
    lineNumber: 11,
    edge: { from: "7", to: "8" },
  },
  { state: "visited", node: "8", timestamp: 11, lineNumber: 12 },
  // backtracking to node 2 and visiting node 3
  {
    state: "visiting",
    node: "3",
    timestamp: 12,
    lineNumber: 13,
    edge: { from: "2", to: "3" },
  },
  { state: "visited", node: "3", timestamp: 13, lineNumber: 14 },
  // visiting node 6 from node 3
  {
    state: "visiting",
    node: "6",
    timestamp: 14,
    lineNumber: 15,
    edge: { from: "3", to: "6" },
  },
  { state: "visited", node: "6", timestamp: 15, lineNumber: 16 },
];
