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

  // ⏱ Timer logic (UNCHANGED)
  useEffect(() => {
    const interval = setInterval(() => {
      if (game.turn() === "w") setWhiteTime((t) => t + 1);
      else setBlackTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [game]);

  function handleSquareClick(square) {
    if (game.isGameOver()) return;

    const piece = game.get(square);

    // No selection + empty square
    if (!selectedSquare && !piece) {
      setLegalMoves([]);
      return;
    }

    // Selecting a piece
    if (!selectedSquare && piece && piece.color === game.turn()) {
      const lm = game.moves({ from: square, verbose: true });
      setSelectedSquare(square);
      setLegalMoves(lm);
      return;
    }

    // Switching selection
    if (piece && piece.color === game.turn()) {
      const lm = game.moves({ from: square, verbose: true });
      setSelectedSquare(square);
      setLegalMoves(lm);
      return;
    }

    // Attempt move
    const move = game.move({
      from: selectedSquare,
      to: square,
      promotion: "q",
    });

    if (move) {
      setFen(game.fen());
      setMoves(game.history({ verbose: true }));
    }

    setSelectedSquare(null);
    setLegalMoves([]);
  }

  // 🔥 KING-IN-CHECK LOGIC (NEW, SAFE ADDITION)
  let kingInCheckSquare = null;

  if (game.isCheck()) {
    const board = game.board();
    const colorInCheck = game.turn() === "w" ? "b" : "w";

    board.forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        if (piece && piece.type === "k" && piece.color === colorInCheck) {
          kingInCheckSquare =
            String.fromCharCode(97 + colIndex) + (8 - rowIndex);
        }
      });
    });
  }

  return {
    fen,
    moves,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    turn: fen.split(" ")[1],
    whiteTime,
    blackTime,
    isCheck: game.isCheck(),
    isCheckmate: game.isCheckmate(),
    kingInCheckSquare, // ✅ NEW
  };
}
