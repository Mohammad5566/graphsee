// exports a function that generates a random graph with a specified number of nodes and edges
// two types of graphs are supported: Edge List (primary), Adjacency List (secondary)
import { Edge, Node, MarkerType } from "@xyflow/react";

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

const nodes: Node[] = [
  { id: "1", type: "circle", position: { x: 0, y: 150 }, data: { label: "1" } },
  {
    id: "2",
    type: "circle",
    position: { x: 120, y: 50 },
    data: { label: "2" },
  },
  {
    id: "3",
    type: "circle",
    position: { x: 250, y: 150 },
    data: { label: "3" },
  },
  {
    id: "4",
    type: "circle",
    position: { x: 120, y: 250 },
    data: { label: "4" },
  },
  {
    id: "5",
    type: "circle",
    position: { x: 250, y: 280 },
    data: { label: "5" },
  },
  {
    id: "6",
    type: "circle",
    position: { x: 380, y: 50 },
    data: { label: "6" },
  },
  {
    id: "7",
    type: "circle",
    position: { x: 380, y: 200 },
    data: { label: "7" },
  },
  {
    id: "8",
    type: "circle",
    position: { x: 500, y: 200 },
    data: { label: "8" },
  },
];

const edges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "e3-7",
    source: "3",
    target: "7",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
    },
  },
];

export const generateGraph: Graph = {
  nodes,
  edges,
};
