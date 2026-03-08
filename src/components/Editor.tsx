import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "../App.css";

const DEFAULT_CODE = `def dfs(node, visited):
    if not node: return
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(neighbor, visited)
`;

interface EditorComponentProps {
  onCodeChange?: (code: string) => void;
  lineNumber: number;
  isDark?: boolean;
}

export default function EditorComponent({
  onCodeChange,
  lineNumber,
  isDark,
}: EditorComponentProps) {
  const [code, setCode] = useState(DEFAULT_CODE);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<any>(null);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value ?? "";
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    decorationsRef.current = editor.createDecorationsCollection([]);
  }, []);

  // update line highlight in editor based on current line number
  useEffect(() => {
    if (lineNumber > 0 && decorationsRef.current && monacoRef.current) {
      decorationsRef.current.set([
        {
          range: new monacoRef.current.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            className: isDark ? "line-highlight-dark" : "line-highlight-light",
          },
        },
      ]);
    } else {
      decorationsRef.current?.set([]); // clear highlight
    }
  }, [lineNumber, isDark]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Editor
        width="100%"
        height="100%"
        language="python"
        theme={isDark ? "vs-dark" : "light"}
        value={code}
        onChange={handleEditorChange}
        onMount={handleMount}
        options={{
          selectOnLineNumbers: true,
          fontSize: 16,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
