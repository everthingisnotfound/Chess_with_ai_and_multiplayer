import { getPieceImage } from "../../utils/pieceMapper";

export default function Square({
  square,
  fenChar,
  isLight,
  isSelected,
  isJustMoved,
  legalMoves,
  selectedSquare,
  isKingInCheck,
  onClick,
}) {
  const piece = fenChar
    ? {
        type: fenChar.toLowerCase(),
        color: fenChar === fenChar.toLowerCase() ? "b" : "w",
      }
    : null;

  // ✅ STRICT: show dots ONLY for selected piece
  const moveFromSelected = legalMoves.find(
    (m) => m.from === selectedSquare && m.to === square
  );

  const isLegal = Boolean(moveFromSelected);
  const isCapture = isLegal && piece;
  const img = getPieceImage(piece);

  return (
    <div
      className={`square ${isLight ? "light" : "dark"} 
        ${isSelected ? "selected" : ""} 
        ${isJustMoved ? "moved" : ""} 
        ${isKingInCheck ? "king-check" : ""}`}
      onClick={() => onClick(square)}
    >
      {img && <img src={img} alt="" draggable={false} />}
      {isLegal && !piece && <div className="dot" />}
      {isCapture && <div className="capture-dot" />}
    </div>
  );
}
