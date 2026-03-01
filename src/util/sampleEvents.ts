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
];
