// circle node component for react flow graph nodes
import { Handle, Position } from "@xyflow/react";

export default function CircleNode({ data }: any) {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: "2px solid #555",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
      }}
    >
      {data.label}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
