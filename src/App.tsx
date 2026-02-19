import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
import Editor from './Editor.tsx';
import Controls from './components/Controls.tsx';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 150 },   data: { label: '1' } },
  { id: '2', position: { x: 120, y: 50 },   data: { label: '2' } },
  { id: '3', position: { x: 250, y: 150 },  data: { label: '3' } },
  { id: '4', position: { x: 120, y: 250 },  data: { label: '4' } },
  { id: '5', position: { x: 250, y: 280 },  data: { label: '5' } },
  { id: '6', position: { x: 380, y: 50 },   data: { label: '6' } },
  { id: '7', position: { x: 380, y: 200 },  data: { label: '7' } },
  { id: '8', position: { x: 500, y: 200 },  data: { label: '8' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e3-7', source: '3', target: '7' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-7', source: '5', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
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

  const handleStepBack = () => setStep((s) => Math.max(0, s - 1));
  const handleStepForward = () => setStep((s) => Math.min(totalSteps, s + 1));
  const handleReset = () => { setStep(0); setIsPlaying(false); setVisited([]); };
  const handlePlayPause = () => setIsPlaying((p) => !p);
  const handleSeek = (s: number) => setStep(s);

  return (
    <div className={`app${isDark ? '' : ' light'}`}>
      {/* ── Top toolbar ── */}
      <div className="toolbar">
        <button className="btn-run" onClick={handleRun}>▶ Run Algorithm</button>
        <button className="btn-secondary" onClick={handleStepBack}>◀ Step Back</button>
        <button className="btn-secondary" onClick={handleStepForward}>Step Forward ▶▶</button>
        <button className="btn-secondary" onClick={handleReset}>↻ Reset</button>
        <button className="btn-theme-toggle" onClick={() => setIsDark((d) => !d)} title="Toggle theme">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* ── Main content ── */}
      <div className="main-content">
        {/* Left: code editor + variables */}
        <div className="left-panel">
          <div className="editor-wrapper">
            <Editor isDark={isDark} />
          </div>
          <div className="variables-panel">
            <h3>Variables:</h3>
            <div>
              Visited: <span className="var-value">
                {visited.length > 0 ? `{${visited.join(', ')}}` : '{}'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: graph visualizer */}
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
      </div>

      {/* ── Bottom replay controls ── */}
      <Controls
        step={step}
        totalSteps={totalSteps}
        isPlaying={isPlaying}
        onRun={handleRun}
        onStepBack={handleStepBack}
        onStepForward={handleStepForward}
        onReset={handleReset}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
      />
    </div>
  );
}
