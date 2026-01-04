export default function Timer({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
      {minutes}:{seconds}
    </div>
  );
}
