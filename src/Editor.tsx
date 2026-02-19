import { useState } from 'react';
import Editor from '@monaco-editor/react';

const DEFAULT_CODE = `def dfs(node, visited):
    if not node: return
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(neighbor, visited)
`;

interface EditorComponentProps {
  onCodeChange?: (code: string) => void;
}

export default function EditorComponent({ onCodeChange }: EditorComponentProps) {
  const [code, setCode] = useState(DEFAULT_CODE);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value ?? '';
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleEditorMount = (editor: any) => {
    editor.focus();
  };

  return (
    <Editor
      width="100%"
      height="100%"
      language="python"
      theme="vs-dark"
      value={code}
      onChange={handleEditorChange}
      onMount={handleEditorMount}
      options={{
        selectOnLineNumbers: true,
        fontSize: 16,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        padding: { top: 12 },
      }}
    />
  );
}
