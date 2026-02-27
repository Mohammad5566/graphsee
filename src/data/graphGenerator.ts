// exports a function that generates a random graph with a specified number of nodes and edges
// two types of graphs are supported: Edge List (primary), Adjacency List (secondary)
import { Edge, Node } from "@xyflow/react";

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

const nodes: Node[] = [
  { id: "1", position: { x: 0, y: 150 }, data: { label: "1" } },
  { id: "2", position: { x: 120, y: 50 }, data: { label: "2" } },
  { id: "3", position: { x: 250, y: 150 }, data: { label: "3" } },
  { id: "4", position: { x: 120, y: 250 }, data: { label: "4" } },
  { id: "5", position: { x: 250, y: 280 }, data: { label: "5" } },
  { id: "6", position: { x: 380, y: 50 }, data: { label: "6" } },
  { id: "7", position: { x: 380, y: 200 }, data: { label: "7" } },
  {
    id: "8",
    position: { x: 500, y: 200 },
    type: "shape",
    data: { type: "circle", label: "8" },
  },
];

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e3-7", source: "3", target: "7" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-7", source: "5", target: "7" },
  { id: "e7-8", source: "7", target: "8" },
];

export const generateGraph: Graph = {
  nodes,
  edges,
};
