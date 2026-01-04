import { useState, useEffect } from "react";
import { Chess } from "chess.js";

export default function useChessGame() {
  const [game] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moves, setMoves] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);

  // ⏱ timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (game.turn() === "w") setWhiteTime(t => t + 1);
      else setBlackTime(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [game]);

  function handleSquareClick(square) {
    const piece = game.get(square);

    // selecting a piece
    if (!selectedSquare) {
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        const m = game.moves({ from: square, verbose: true });
        setLegalMoves(m);
      }
      return;
    }

    // switching selection
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      const m = game.moves({ from: square, verbose: true });
      setLegalMoves(m);
      return;
    }

    // attempt move
    const move = game.move({
      from: selectedSquare,
      to: square,
      promotion: "q"
    });

    if (move) {
      setFen(game.fen()); // 🔥 THIS IS CRITICAL
      setMoves(game.history({ verbose: true }));
    }

    setSelectedSquare(null);
    setLegalMoves([]);
  }

  return {
    fen,
    moves,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    turn: fen.split(" ")[1],
    whiteTime,
    blackTime
  };
}
