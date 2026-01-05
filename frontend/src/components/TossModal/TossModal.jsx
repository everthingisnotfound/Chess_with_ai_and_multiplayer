import "./TossModal.css";
import { useState } from "react";

export default function TossModal({ onResult }) {
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState(null);

  function toss(choice) {
    if (flipping) return;

    setFlipping(true);

    setTimeout(() => {
      const tossResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(tossResult);

      setTimeout(() => {
        onResult(choice === tossResult ? "w" : "b");
      }, 1200);
    }, 800);
  }

  return (
    <div className="toss-overlay">
      <div className="toss-box">
        <h2>Coin Toss</h2>

        {!result && (
          <div className="toss-buttons">
            <button onClick={() => toss("heads")}>🟡 Heads</button>
            <button onClick={() => toss("tails")}>⚫ Tails</button>
          </div>
        )}

        {result && (
          <div className={`coin ${flipping ? "flip" : ""}`}>
            {result === "heads" ? "🟡 Heads" : "⚫ Tails"}
          </div>
        )}
      </div>
    </div>
  );
}
