export default function GameStateBanner({ isCheck, isCheckmate, turn }) {
  if (!isCheck && !isCheckmate) return null;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "10px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "18px",
        color: "#fff",
        backgroundColor: isCheckmate ? "#c62828" : "#f57c00",
        borderRadius: "6px",
        animation: "fadeIn 0.4s ease"
      }}
    >
      {isCheckmate
        ? `♚ CHECKMATE — ${turn === "w" ? "Black" : "White"} wins`
        : "⚠️ CHECK"}
    </div>
  );
}
