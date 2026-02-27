// circle node component for react flow graph nodes
import { Handle, Position } from "@xyflow/react";

export default function CircleNode({ data }: any) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: "2px solid var(--node-border)",
        background: "var(--node-bg, white)",
        color: "var(--node-text, #333)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {data.label}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        style={{ opacity: 0 }}
      />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
