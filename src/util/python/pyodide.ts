import { loadPyodide } from "pyodide";

export async function pyodide() {
  const pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/", // or wherever your pyodide.js lives
  });
  // Pyodide is now ready to use...
  console.log(
    pyodide.runPython(`
    import sys
    sys.version
  `),
  );
  return pyodide;
}
