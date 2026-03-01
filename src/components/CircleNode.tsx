// circle node component for react flow graph nodes
import { Handle, Position } from "@xyflow/react";

const stateColors: Record<string, string> = {
  visiting: "#facc15",
  visited: "#22c55e",
  default: "var(--node-bg, white)",
};

export default function CircleNode({ data }: any) {
  const bgColor = stateColors[data.state ?? "default"];

  return (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: "2px solid var(--node-border)",
        background: bgColor,
        color: "var(--node-text, #333)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {data.label}
      <Handle
        type="target"
        position={Position.Left}
        id="target-right"
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-left"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
