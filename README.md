# graphsee
## Graph Algorithm Visualizer - Project Plan

#### Goal: Build a web-based tool that lets users write their own graph algorithm code (Python) and visualize execution step-by-step through an interactive graph display.

#### Core Value Proposition
* What makes this different from existing visualizers: - Users write their own code (any style: recursion/iterative, adj list/matrix, etc.) - Minimal instrumentation (2-3 function calls) instead of rigid API - Generic event model supports any graph algorithm (BFS, DFS, Dijkstra, topo, even obscure ones) - Interactive graph with drag/pan/zoom + timeline replay controls

---

#### Tech Stack
##### Frontend
* React + TypeScript + Vite (fast dev setup)
* React Flow (reactflow) - interactive node/edge visualization with drag/pan/zoom
* Monaco Editor (@monaco-editor/react) - VS Code-quality code editor in browser
* Pyodide - run Python in browser via WebAssembly (no backend needed for v1)

#### Backend
* viz.py - Python module with 2-3 instrumentation functions
* Replay engine (TypeScript) - consumes trace events and drives visualization
* Vitest/Jest - tests for replay logic

--- 

#### Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│                    Web App (React)                      │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Monaco Editor│  │  React Flow  │  │   Controls   │   │
│  │  (code input)│  │  (graph viz) │  │ (step/play)  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│         │                  ▲                  │         │
│         │                  │                  │         │
│         ▼                  │                  ▼         │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Replay Engine (TypeScript)              │   │ 
│  │   - consumes trace events                        │   │
│  │   - updates node/edge styles per step            │   │
│  └──────────────────────────────────────────────────┘   │
│                           ▲                             │
│                           │                             │
│                           │ event list in JSO           │
│                           │                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Pyodide (Python in Browser)              │   │
│  │   - executes user code                           │   │
│  │   - viz.py emits events to JS                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```
