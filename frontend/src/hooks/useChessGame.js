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
      if (game.turn() === "w") setWhiteTime((t) => t + 1);
      else setBlackTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [game]);

  function handleSquareClick(square) {
    const piece = game.get(square);

    // ❌ No selection + empty square
    if (!selectedSquare && !piece) {
      setLegalMoves([]);
      return;
    }

    // ✅ Selecting a piece
    if (!selectedSquare && piece && piece.color === game.turn()) {
      const moves = game.moves({
        from: square, // 🔥 THIS IS THE KEY
        verbose: true,
      });

      setSelectedSquare(square);
      setLegalMoves(moves); // ONLY this piece's moves
      return;
    }

    // 🔁 Switching to another own piece
    if (piece && piece.color === game.turn()) {
      const moves = game.moves({
        from: square, // 🔥 AGAIN — FROM SELECTED PIECE ONLY
        verbose: true,
      });

      setSelectedSquare(square);
      setLegalMoves(moves);
      return;
    }

    // 🎯 Attempt move
    const move = game.move({
      from: selectedSquare,
      to: square,
      promotion: "q",
    });

    if (move) {
      setFen(game.fen());
      setMoves(game.history({ verbose: true }));
    }

    // 🧹 Always clear
    setSelectedSquare(null);
    setLegalMoves([]);
  }

  const isCheck = game.isCheck();
  const isCheckmate = game.isCheckmate();

  return {
    fen,
    moves,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    turn: fen.split(" ")[1],
    whiteTime,
    blackTime,
    isCheck,
    isCheckmate,
  };
}
