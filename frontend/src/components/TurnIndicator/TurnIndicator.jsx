export default function TurnIndicator({ turn }) {
  return (
    <div
      style={{
        marginTop: "16px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: turn === "w" ? "#2e7d32" : "#1e88e5",
        animation: "turnFade 0.6s ease"
      }}
    >
      {turn === "w" ? "♔ White to move" : "♚ Black to move"}
    </div>
  );
}
