import { useState, useCallback, useEffect } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import {
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsFillPlayFill,
} from "react-icons/bs";
import Editor from "./components/Editor.tsx";
import Controls from "./components/Controls.tsx";
import GraphView from "./components/GraphView.tsx";
import { generateGraph } from "./util/generateGraph.ts";
import { sampleEvents } from "./util/sampleEvents.ts";

const initialNodes = generateGraph.nodes;
const initialEdges = generateGraph.edges;

const getSystemTheme = () => {
  // Check if the dark mode media query matches
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;
};

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [step, setStep] = useState(0);
  const [totalSteps] = useState(sampleEvents.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(getSystemTheme());
  const [curEventIndex, setCurEventIndex] = useState(0);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  // updates current step in events list
  const handleRun = () => {
    setStep(0);
    setVisited([]);
    // TODO: execute algorithm and collect events
    const curEvent = sampleEvents[curEventIndex];
    // update nodes/edges based on event
    if (curEvent.state === "visiting") {
      console.log(
        `VIZITING node ${curEvent.node} at line ${curEvent.lineNumber} at timestamp ${curEvent.timestamp}`,
      );
    } else if (curEvent.state === "visited") {
      console.log(
        `VIZITED node ${curEvent.node} at line ${curEvent.lineNumber} at timestamp ${curEvent.timestamp}`,
      );
    }
    setStep(() => curEventIndex);
    setCurEventIndex((i) => (i + 1) % sampleEvents.length);
  };

  useEffect(() => {
    const curEvent = sampleEvents[curEventIndex];
    if (curEvent.state === "visiting") {
      // cur visiting is blue node
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id == curEvent.node) {
            console.log(`updating node ${node.id} to visiting`);
            return { ...node, data: { ...node.data, state: curEvent.state } };
          }
          return node;
        }),
      );
    }
  }, [curEventIndex]);

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
          Run Algorithm <BsFillPlayFill />
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
          sampleEvents={sampleEvents}
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
        onStepBack={handleRun}
        onStepForward={handleRun}
        onReset={handleReset}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
      />
    </div>
  );
}
