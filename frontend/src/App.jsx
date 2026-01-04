import Board from "./components/Board/Board";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import MoveHistory from "./components/MoveHistory/MoveHistory";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";
import useChessGame from "./hooks/useChessGame";

export default function App() {
  const {
    fen,
    moves,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    turn,
    whiteTime,
    blackTime
  } = useChessGame();

  return (
    <>
      {/* 🌍 Global layout fix */}
      <style>
        {`
          body {
            margin: 0;
            min-height: 100vh;
          }
        `}
      </style>

      <div style={{ padding: "20px" }}>
        {/* Top info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "520px",
            margin: "0 auto"
          }}
        >
          <PlayerInfo name={`White (${whiteTime}s)`} />
          <PlayerInfo name={`Black (${blackTime}s)`} />
        </div>

        {/* Board + History */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "20px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <Board
            fen={fen}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            onSquareClick={handleSquareClick}
          />
          <MoveHistory moves={moves} />
        </div>

        {/* Turn indicator */}
        <TurnIndicator turn={turn} />
      </div>
    </>
  );
}
