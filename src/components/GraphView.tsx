import { ReactFlow, applyNodeChanges, applyEdgeChanges, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';

interface GraphViewProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange?: (changes: any) => void;
  onEdgesChange?: (changes: any) => void;
}

export default function GraphView({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange 
}: GraphViewProps) {

  const [nodes, setNodes] = useState(nodes);
  const [edges, setEdges] = useState(edges);
  const [isDark, setIsDark] = useState(true);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const handleRun = () => {
    setStep(0);
    setVisited([]);
    // TODO: execute algorithm and collect events
  };

  return (
    // graph visualizer
    <div className="right-panel">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        colorMode={isDark ? 'dark' : 'light'}
        fitView
      />
    </div>
  );
}