import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { playSound } from "../utils/soundPlayer";

export default function useChessGame() {
  const [game] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moves, setMoves] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [lastMoveTo, setLastMoveTo] = useState(null);

  useEffect(() => {
    if (lastMoveTo) {
      const t = setTimeout(() => setLastMoveTo(null), 200);
      return () => clearTimeout(t);
    }
  }, [lastMoveTo]);

  // ⏱ Timer
  useEffect(() => {
    const id = setInterval(() => {
      if (game.turn() === "w") setWhiteTime((t) => t + 1);
      else setBlackTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [game]);

  function handleSquareClick(square) {
    // 🛑 HARD STOP IF GAME OVER
    if (game.isGameOver()) return;

    const piece = game.get(square);

    // 🔄 DESELECT if same square
    if (square === selectedSquare) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // ❌ Empty click with nothing selected
    if (!selectedSquare && !piece) {
      setLegalMoves([]);
      return;
    }

    // ✅ SELECT PIECE (STRICT)
    if (!selectedSquare && piece && piece.color === game.turn()) {
      const scopedMoves = game.moves({
        from: square,
        verbose: true,
      });

      setSelectedSquare(square);
      setLegalMoves(scopedMoves); // 🔒 ONLY THIS PIECE
      return;
    }

    // 🔁 SWITCH SELECTION
    if (piece && piece.color === game.turn()) {
      const scopedMoves = game.moves({
        from: square,
        verbose: true,
      });

      setSelectedSquare(square);
      setLegalMoves(scopedMoves); // 🔒 ONLY THIS PIECE
      return;
    }

    const move = game.move({
      from: selectedSquare,
      to: square,
      promotion: "q",
    });

    if (move) {
      setFen(game.fen());
      setMoves(game.history({ verbose: true }));
      setLastMoveTo(move.to);

      // 🔊 SOUND LOGIC
      if (move.captured) {
        playSound("capture");
      } else {
        playSound("move");
      }

      // 🔔 CHECK / CHECKMATE
      if (game.isCheckmate()) {
        playSound("checkmate");
      } else if (game.isCheck()) {
        playSound("check");
      }
    }
  }

  // 🔥 KING-IN-CHECK
  let kingInCheckSquare = null;
  if (game.isCheck()) {
    const board = game.board();
    const colorInCheck = game.turn() === "w" ? "b" : "w";

    board.forEach((row, r) => {
      row.forEach((p, c) => {
        if (p && p.type === "k" && p.color === colorInCheck) {
          kingInCheckSquare = String.fromCharCode(97 + c) + (8 - r);
        }
      });
    });
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
    kingInCheckSquare,
    lastMoveTo,
  };
}
