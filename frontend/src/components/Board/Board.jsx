import Square from "./Square";
import "./board.css";

export default function Board({
  fen,
  selectedSquare,
  legalMoves,
  kingInCheckSquare,
  lastMoveTo,
  onSquareClick,
}) {
  const boardFen = fen.split(" ")[0].split("/");

  return (
    <div className="board-wrapper">
      <div className="board">
        {boardFen.map((row, rowIndex) => {
          let colIndex = 0;

          return row.split("").map((char) => {
            // 🧩 PIECE SQUARE
            if (isNaN(char)) {
              const square =
                String.fromCharCode(97 + colIndex) + (8 - rowIndex);

              const isLight = (rowIndex + colIndex) % 2 === 0;
              colIndex++;

              return (
                <Square
                  key={square}
                  square={square}
                  fenChar={char}
                  isLight={isLight}
                  isSelected={square === selectedSquare}
                  isJustMoved={square === lastMoveTo}
                  legalMoves={legalMoves}
                  selectedSquare={selectedSquare}
                  isKingInCheck={square === kingInCheckSquare}
                  onClick={onSquareClick}
                />
              );
            }

            // 🧩 EMPTY SQUARES
            const emptyCount = Number(char);
            const empties = [];

            for (let j = 0; j < emptyCount; j++) {
              const square =
                String.fromCharCode(97 + colIndex) + (8 - rowIndex);

              const isLight = (rowIndex + colIndex) % 2 === 0;
              colIndex++;

              empties.push(
                <Square
                  key={square}
                  square={square}
                  fenChar={null}
                  isLight={isLight}
                  isSelected={square === selectedSquare}
                  isJustMoved={square === lastMoveTo}
                  legalMoves={legalMoves}
                  selectedSquare={selectedSquare}
                  isKingInCheck={square === kingInCheckSquare}
                  onClick={onSquareClick}
                />
              );
            }

            return empties;
          });
        })}
      </div>
    </div>
  );
}
