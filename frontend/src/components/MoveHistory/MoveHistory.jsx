import { useEffect, useRef } from "react";
import "./moveHistory.css";

function getPieceName(type) {
  switch (type) {
    case "p": return "Pawn";
    case "r": return "Rook";
    case "n": return "Knight";
    case "b": return "Bishop";
    case "q": return "Queen";
    case "k": return "King";
    default: return "Piece";
  }
}

export default function MoveHistory({ moves }) {
  const listRef = useRef(null);

  // 🔽 Auto-scroll ONLY inside move list
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [moves]);

  return (
    <div className="move-history">
      <h3>Move History</h3>

      <div className="move-list" ref={listRef}>
        <ol>
          {moves.map((move, i) => (
            <li key={i}>
              <strong>{move.color === "w" ? "White" : "Black"}</strong>{" "}
              moved <strong>{getPieceName(move.piece)}</strong>{" "}
              from <strong>{move.from}</strong> to <strong>{move.to}</strong>
              {move.captured && (
                <> capturing <strong>{getPieceName(move.captured)}</strong></>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
