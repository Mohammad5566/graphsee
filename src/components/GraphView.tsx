import { ReactFlow, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CircleNode from "./CircleNode";
import { useEffect } from "react";

interface GraphViewProps {
  isDark?: boolean;
  nodes: Node[];
  edges: Edge[];
  sampleEvents?: any[];
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
  sampleEvents,
  onNodesChange,
  onEdgesChange,
}: GraphViewProps) {
  useEffect(() => {
    console.log("sampleEvents", sampleEvents);
  }, [sampleEvents]);
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
