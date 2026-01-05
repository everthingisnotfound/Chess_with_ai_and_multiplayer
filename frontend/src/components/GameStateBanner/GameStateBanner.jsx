import "./gameStateBanner.css";

export default function GameStateBanner({ isCheck, isCheckmate, turn }) {
  if (isCheckmate) {
    return (
      <div className="game-banner checkmate">
        ♚ CHECKMATE — {turn === "w" ? "Black" : "White"} Wins
      </div>
    );
  }

  if (isCheck) {
    return (
      <div className="game-banner check">
        ⚠ CHECK
      </div>
    );
  }

  return null;
}
