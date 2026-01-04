import { getPieceImage } from "../../utils/pieceMapper";

export default function Square({
  square,
  fenChar,
  isLight,
  isSelected,
  legalMoves,
  onClick
}) {
  const piece = fenChar
    ? {
        type: fenChar.toLowerCase(),
        color: fenChar === fenChar.toLowerCase() ? "b" : "w"
      }
    : null;

  const isLegal = legalMoves.some(m => m.to === square);
  const isCapture = isLegal && piece;

  const img = getPieceImage(piece);

  return (
    <div
      className={`square ${isLight ? "light" : "dark"} ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onClick(square)}
    >
      {img && <img src={img} alt="" draggable={false} />}
      {isLegal && !piece && <div className="dot" />}
      {isCapture && <div className="capture-dot" />}
    </div>
  );
}
