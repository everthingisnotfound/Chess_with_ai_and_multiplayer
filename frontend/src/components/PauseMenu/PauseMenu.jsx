export default function PauseMenu({ onResume, onRestart, onExit }) {
  return (
    <div className="overlay">
      <div className="menu">
        <button onClick={onResume}>Resume</button>
        <button onClick={onRestart}>Restart</button>
        <button onClick={onExit}>Exit</button>
      </div>
    </div>
  );
}
