import { useEffect, useState } from "react";
import "./gameStateBanner.css";

export default function GameStateBanner({ isCheck, isCheckmate, turn }) {
  const [showCheck, setShowCheck] = useState(false);

  // Auto-hide CHECK only
  useEffect(() => {
    if (isCheck && !isCheckmate) {
      setShowCheck(true);
      const t = setTimeout(() => setShowCheck(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isCheck, isCheckmate]);

  // CHECKMATE is derived — no state needed
  if (!isCheckmate && !showCheck) return null;

  const winner =
    isCheckmate && (turn === "w" ? "Black" : "White");

  return (
    <div
      className={`game-banner ${
        isCheckmate ? "checkmate" : "check"
      }`}
    >
      {isCheckmate ? (
        <>
          <span className="icon">♚</span>
          <div className="text">
            <strong>CHECKMATE</strong>
            <div className="sub">{winner} wins</div>
          </div>
        </>
      ) : (
        <>
          <span className="icon">⚠</span>
          <div className="text">
            <strong>CHECK</strong>
          </div>
        </>
      )}
    </div>
  );
}
