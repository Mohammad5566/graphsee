import { ReactFlow, applyNodeChanges, applyEdgeChanges, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';

interface GraphViewProps {
  nodes: Node[];
  edges: Edge[];
}

export default function GraphView({ nodes, edges }: GraphViewProps) {

  const [nodes, setNodes] = useState(nodes);
  const [edges, setEdges] = useState(edges);
  const [step, setStep] = useState(0);
  const [totalSteps] = useState(12);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
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