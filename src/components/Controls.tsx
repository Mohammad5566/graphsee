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
      <div className="step-info">
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
      <div className="replay-buttons">
        <button onClick={onReset} title="Reset">⏮</button>
        <button onClick={onStepBack} title="Step Back">⏪</button>
        <button onClick={onPlayPause} title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={onStepForward} title="Step Forward">⏩</button>
        <button onClick={() => onSeek(totalSteps)} title="Go to End">⏭</button>
      </div>
    </div>
  );
}

