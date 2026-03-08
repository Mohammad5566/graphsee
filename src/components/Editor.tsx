import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

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
  const decorationsRef = useRef<any>(null);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value ?? "";
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleEditorMount = (editor: any, monaco: any) => {
    editor.focus();
    decorationsRef.current = editor.createDecorationsCollection([
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "line-highlight",
        },
      },
    ]);
  };

  return (
    <>
      <Editor
        width="100%"
        height="100%"
        language="python"
        theme={isDark ? "vs-dark" : "light"}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        options={{
          selectOnLineNumbers: true,
          fontSize: 16,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          padding: { top: 12 },
        }}
      />
      <style>{`
        .line-highlight {
          background: rgba(255, 215, 0, 0.25);
        }
      `}</style>
    </>
  );
}
