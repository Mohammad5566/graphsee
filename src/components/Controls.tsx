import {
  BsFastForwardFill,
  BsFillRewindFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";
interface ControlsProps {
  step: number;
  totalSteps: number;
  isPlaying: boolean;
  onRun: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onPlayPause: () => void;
  onSeek: (step: number) => void;
}

export default function Controls({
  step,
  totalSteps,
  isPlaying,
  onRun,
  onStepBack,
  onStepForward,
  onReset,
  onPlayPause,
  onSeek,
}: ControlsProps) {
  return (
    <div className="replay-bar">
      <div
        className="step-info"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Step {step} / {totalSteps}
      </div>
      <input
        type="range"
        className="progress-slider"
        min={0}
        max={totalSteps}
        value={step}
        onChange={(e) => onSeek(Number(e.target.value))}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="toolbar"
      >
        <button className="btn-secondary" onClick={onStepBack}>
          <BsFillRewindFill /> Step Back
        </button>
        <button className="btn-secondary" onClick={onStepForward}>
          Step Forward <BsFastForwardFill />
        </button>
        <button className="btn-secondary" onClick={onReset}>
          <BsArrowCounterclockwise /> Reset
        </button>
      </div>
    </div>
  );
}
