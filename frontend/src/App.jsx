import Board from "./components/Board/Board";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import MoveHistory from "./components/MoveHistory/MoveHistory";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";
import useChessGame from "./hooks/useChessGame";
import GameStateBanner from "./components/GameStateBanner/GameStateBanner";

export default function App() {
  const {
    fen,
    moves,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    turn,
    whiteTime,
    blackTime,
    isCheck,
    isCheckmate,
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
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }`}
      </style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          padding: "24px",
          boxSizing: "border-box",
          color: "#eaeaea",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Top info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "520px",
            margin: "0 auto",
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
            justifyContent: "center",
          }}
        >
          <Board
            fen={fen}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            onSquareClick={handleSquareClick}
          />
          <GameStateBanner
            isCheck={isCheck}
            isCheckmate={isCheckmate}
            turn={turn}
          />
          <MoveHistory moves={moves} />
        </div>

        {/* Turn indicator */}
        <TurnIndicator turn={turn} />
      </div>
    </>
  );
}
