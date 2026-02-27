import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CircleNode from "./CircleNode";

interface GraphViewProps {
  isDark?: boolean;
  nodes: Node[];
  edges: Edge[];
  onNodesChange?: (changes: any) => void;
  onEdgesChange?: (changes: any) => void;
}

const nodeTypes = {
  circle: CircleNode,
};

export default function GraphView({
  isDark,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
}: GraphViewProps) {
  return (
    // graph visualizer
    <div className="right-panel">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        colorMode={isDark ? "dark" : "light"}
        fitView
      />
    </div>
  );
}
