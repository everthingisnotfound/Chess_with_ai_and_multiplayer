import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { playSound } from "../utils/soundPlayer";

export default function useChessGame(playerColor) {
  const [game] = useState(() => new Chess());

  const [fen, setFen] = useState(game.fen());
  const [moves, setMoves] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);

  const [lastMoveTo, setLastMoveTo] = useState(null);

  const [isCheck, setIsCheck] = useState(false);
  const [isCheckmate, setIsCheckmate] = useState(false);

  /* ⏱ TIMER (paused until toss) */
  useEffect(() => {
    if (!playerColor || game.isGameOver()) return;

    const id = setInterval(() => {
      if (game.turn() === "w") setWhiteTime(t => t + 1);
      else setBlackTime(t => t + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [game, fen, playerColor]);

  useEffect(() => {
    if (!lastMoveTo) return;
    const t = setTimeout(() => setLastMoveTo(null), 200);
    return () => clearTimeout(t);
  }, [lastMoveTo]);

  function handleSquareClick(square) {
    if (!playerColor) return;
    if (game.isGameOver()) return;

    const piece = game.get(square);

    if (square === selectedSquare) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    if (!selectedSquare && piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      setLegalMoves(game.moves({ from: square, verbose: true }));
      return;
    }

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      setLegalMoves(game.moves({ from: square, verbose: true }));
      return;
    }

    const move = game.move({
      from: selectedSquare,
      to: square,
      promotion: "q",
    });

    if (!move) return;

    setFen(game.fen());
    setMoves(game.history({ verbose: true }));
    setLastMoveTo(move.to);

    setSelectedSquare(null);
    setLegalMoves([]);

    const check = game.isCheck();
    const mate = game.isCheckmate();

    setIsCheck(check);
    setIsCheckmate(mate);

    if (mate) playSound("Checkmate");
    else if (check) playSound("Check");
    else if (move.captured) playSound("Capture");
    else playSound("Move");
  }

  /* 🔥 KING IN CHECK */
  let kingInCheckSquare = null;
  if (isCheck) {
    const board = game.board();
    const colorInCheck = game.turn() === "w" ? "b" : "w";

    board.forEach((row, r) => {
      row.forEach((p, c) => {
        if (p && p.type === "k" && p.color === colorInCheck) {
          kingInCheckSquare =
            String.fromCharCode(97 + c) + (8 - r);
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
    isCheck,
    isCheckmate,
    kingInCheckSquare,
    lastMoveTo,
  };
}
