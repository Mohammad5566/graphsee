import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function EditorComponent() {
  const [code, setCode] = useState('// type your code...');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleEditorMount = (editor) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };

  return (
    <Editor
      width="100%"
      height="100%"
      language="python"
      theme="vs-dark"
      value={code}
      className="nokey"
      onChange={handleEditorChange}
      onMount={handleEditorMount}
      options={{
        selectOnLineNumbers: true,
        fontSize: 18
      }}
    />
  );
}