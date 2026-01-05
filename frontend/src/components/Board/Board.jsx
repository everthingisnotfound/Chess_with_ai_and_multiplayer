import Square from "./Square";
import "./board.css";

export default function Board({
  fen,
  selectedSquare,
  legalMoves,
  kingInCheckSquare, // ✅ NEW
  onSquareClick,
}) {
  const boardFen = fen.split(" ")[0].split("/");

  return (
    <div className="board-wrapper">
      <div className="board">
        {boardFen.map((row, rowIndex) => {
          let colIndex = 0;

          return row.split("").map((char) => {
            // piece square
            if (isNaN(char)) {
              const square =
                String.fromCharCode(97 + colIndex) + (8 - rowIndex);
              colIndex++;

              return (
                <Square
                  key={square}
                  square={square}
                  fenChar={char}
                  isLight={(rowIndex + colIndex) % 2 === 0}
                  isSelected={square === selectedSquare}
                  legalMoves={legalMoves}
                  isKingInCheck={square === kingInCheckSquare} // ✅ NEW
                  onClick={onSquareClick}
                />
              );
            }

            // empty squares
            const emptyCount = Number(char);
            const empties = [];

            for (let j = 0; j < emptyCount; j++) {
              const square =
                String.fromCharCode(97 + colIndex) + (8 - rowIndex);
              colIndex++;

              empties.push(
                <Square
                  key={square}
                  square={square}
                  fenChar={null}
                  isLight={(rowIndex + colIndex) % 2 === 0}
                  isSelected={square === selectedSquare}
                  legalMoves={legalMoves}
                  isKingInCheck={square === kingInCheckSquare} // ✅ NEW
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
