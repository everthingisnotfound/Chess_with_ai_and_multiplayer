export default function PlayerInfo({ name }) {
  return (
    <div
      style={{
        padding: "10px 18px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.15)",
        fontWeight: 600,
        letterSpacing: "0.5px"
      }}
    >
      {name}
    </div>
  );
}
