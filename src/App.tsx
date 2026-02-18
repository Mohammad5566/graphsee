import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Editor from './Editor.tsx';
 
const initialNodes: Node[] = [];
for (let i = 0; i < 5; i += 1) {
  var newNode = { id: 'n' + i, width: 50, height: 20, position: { x: 0, y: i * 100 }, data: { label: 'Node ' + i } }
  initialNodes.push(newNode); 
}
const initialEdges: Edge[] = [];
for (let i = 0; i < 4; i += 1) {
  initialEdges.push({ id: 'n' + i + '-n' + (i + 1), source: 'n' + i, target: 'n' + (i + 1) });
}
 
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{ width: '50%', height: '100%' }}>
        <Editor></Editor>
      </div>
      <div style={{ width: '50%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        />
      </div>
    </div>
  );
}
