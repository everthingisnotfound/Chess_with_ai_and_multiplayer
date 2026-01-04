import "./turnIndicator.css";
export default function TurnIndicator({ turn }) {
  return (
    <div
      style={{
        marginTop: "18px",
        padding: "12px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: 600,
        borderRadius: "12px",
        background:
          turn === "w"
            ? "linear-gradient(90deg, #1e3c72, #2a5298)"
            : "linear-gradient(90deg, #232526, #414345)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
      }}
    >
      {turn === "w" ? "♔ White to move" : "♚ Black to move"}
    </div>
  );
}
