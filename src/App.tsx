import { useState, useCallback, useEffect } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import {
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsFillPlayFill,
  BsFillPauseFill,
} from "react-icons/bs";
import Editor from "./components/Editor.tsx";
import Controls from "./components/Controls.tsx";
import GraphView from "./components/GraphView.tsx";
import { generateGraph } from "./util/generateGraph.ts";
import { sampleEvents } from "./util/sampleEvents.ts";
import { pyodide } from "./util/python/pyodide.js";
import { loadPyodide } from "pyodide";

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
  const [totalSteps] = useState(sampleEvents.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDark, setIsDark] = useState(getSystemTheme());
  const [curEventIndex, setCurEventIndex] = useState(-1);
  const [runAlgoClicked, setRunAlgoClicked] = useState(false);
  const [curLineNumber, setCurLineNumber] = useState(-1);
  const [pyodide, setPyodide] = useState<any>(null);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  // start the algo, clear everything
  const handleRun = async () => {
    if (!pyodide)
      setPyodide(
        await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/",
        }),
      );
    console.log(
      pyodide.runPython(`
    import sys
    sys.version
  `),
    );

    if (isPlaying) {
      setIsPlaying(false); // if already playing, stop and reset
      setCurEventIndex(-1);
      setNodes(initialNodes);
      return;
    }
    setRunAlgoClicked(true);
    setNodes(initialNodes);
    setCurEventIndex(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    // when is playing, keep increasing the event index every second until we reach the end
    const intervalId = setInterval(() => {
      setCurEventIndex((i) => {
        if (i >= totalSteps) {
          clearInterval(intervalId);
          setIsPlaying(false); // stop at the end
          return i;
        }
        return i + 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  useEffect(() => {
    // everytime, start with fresh nodes list, and modify that
    let newNodes = initialNodes;
    if (curEventIndex < 0) {
      setNodes(newNodes);
      return; // no event to show
    }

    const events = sampleEvents.slice(0, curEventIndex + 1);
    for (const e of events) {
      newNodes = newNodes.map((node) => {
        // update state
        if (node.id == e.node) {
          return { ...node, data: { ...node.data, state: e.state } };
        }
        return node;
      });
    }
    setNodes(newNodes); // new nodes list with updated states
  }, [curEventIndex]);

  const handleStepBack = () =>
    setCurEventIndex((i) => {
      setIsPlaying(false); // pause when user manually changes step, if it was playing
      return Math.max(0, i - 1);
    });
  const handleStepForward = () =>
    setCurEventIndex((i) => {
      setIsPlaying(false); // pause when user manually changes step, if it was playing
      return Math.min(totalSteps, i + 1);
    });

  // update the current line number in editor based on current event
  useEffect(() => {
    console.log("Current lineNumber index:", curLineNumber);
    const event = sampleEvents[curEventIndex];
    setCurLineNumber(event?.lineNumber ?? -1);
  }, [curEventIndex, Editor]);

  // reset button sets slider index to 0 and stops playing
  const handleReset = () => {
    setIsPlaying(false);
    setCurEventIndex(0);
  };

  // go to that index in the list of events
  const handleSeek = (s: number) => {
    setIsPlaying(false);
    setCurEventIndex(s);
  };

  async function runUserCode(code: string) {
    const py = await pyodide();
    await py.runPythonAsync(code);
  }

  return (
    <div className={`app${isDark ? "" : " light"}`}>
      {/* ── Top toolbar ── */}
      <div className="toolbar">
        <button className="btn-run" onClick={handleRun}>
          Run Algorithm {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
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
            <Editor isDark={isDark} lineNumber={curLineNumber} />
          </div>
          <div className="variables-panel">
            <h3>Variables:</h3>
            <div>
              Visited:{" "}
              <span className="var-value">
                {/*visited.length > 0 ? `{${visited.join(", ")}}` : "{}"}*/}
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
      {
        //{runAlgoClicked && ( // only show controls after user clicks "Run Algorithm" once
        <Controls
          step={curEventIndex}
          totalSteps={totalSteps}
          onStepBack={handleStepBack}
          onStepForward={handleStepForward}
          onReset={handleReset}
          onSeek={handleSeek}
        />
        //)}
      }
    </div>
  );
}
