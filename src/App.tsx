import { useState, useCallback } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Editor from "./components/Editor.tsx";
import Controls from "./components/Controls.tsx";
import GraphView from "./components/GraphView.tsx";
import { generateGraph } from "./util/graphGenerator.ts";

const initialNodes = generateGraph.nodes;
const initialEdges = generateGraph.edges;

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
  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
    setVisited([]);
  };
  const handlePlayPause = () => setIsPlaying((p) => !p);
  const handleSeek = (s: number) => setStep(s);

  return (
    <div className={`app${isDark ? "" : " light"}`}>
      {/* ── Top toolbar ── */}
      <div className="toolbar">
        <button className="btn-run" onClick={handleRun}>
          ▶ Run Algorithm
        </button>
        <button className="btn-secondary" onClick={handleStepBack}>
          ◀ Step Back
        </button>
        <button className="btn-secondary" onClick={handleStepForward}>
          Step Forward ▶▶
        </button>
        <button className="btn-secondary" onClick={handleReset}>
          ↻ Reset
        </button>
        <button
          className="btn-theme-toggle"
          onClick={() => setIsDark((d) => !d)}
          title="Toggle theme"
        >
          {isDark ? (
            <BsFillSunFill color="white" />
          ) : (
            <BsFillMoonStarsFill color="navy" />
          )}
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
              Visited:{" "}
              <span className="var-value">
                {visited.length > 0 ? `{${visited.join(", ")}}` : "{}"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: graph visualizer */}
        <GraphView
          isDark={isDark}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
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
