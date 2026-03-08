# graphsee

## Graph Algorithm Visualizer - Project Plan

#### Goal: Build a web-based tool that lets users write their own graph algorithm code (Python) and visualize execution step-by-step through an interactive graph display.

#### What seperates this from all the other graph visualizers?

- Users write their own code (their own style: recursive, iterative, etc)
- Minimal instrumentationinstead of rigid API (user has to include just 3 functions)
- Generic events abstraction supports any graph algorithm (BFS, DFS, Dijkstra, Topo, etc)
- Interactive graph with drag/pan/zoom + timeline replay controls

---

#### Tech Stack

##### Frontend

- React + TypeScript
- React Flow - interactive node/edge visualization with drag/pan/zoom
- Monaco Editor - VS Code-quality code editor in browser
- Pyodide - run Python in browser (maybe use backend instead)

#### Backend

- viz.py - Python module with 2-3 instrumentation functions
- Replay engine - consumes trace events and drives visualization
- Vitest/Jest - tests for replay logic

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
│  │                   Replay Engine                  │   │
│  │   - consumes trace events                        │   │
│  │   - updates node/edge styles per step            |   |
   |   - allow forward/rewind based on events list    │   │
│  └──────────────────────────────────────────────────┘   │
│                           ▲                             │
│                           │                             │
│                           │ event list in JSON          │
│                           │                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Pyodide (Python in Browser)              │   │
│  │   - executes user code                           │   │
│  │   - viz.py emits events to JS                    |   |
   |    - collect list of events from code run        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```
