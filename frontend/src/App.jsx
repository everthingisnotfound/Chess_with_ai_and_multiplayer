import { useEffect, useState } from "react";
import Board from "./components/Board/Board";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import MoveHistory from "./components/MoveHistory/MoveHistory";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";
import GameStateBanner from "./components/GameStateBanner/GameStateBanner";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import useChessGame from "./hooks/useChessGame";
import { setSoundTheme } from "./utils/soundPlayer";

export default function App() {
  const [theme, setTheme] = useState("light");

  // 🎨 Theme + Sound sync
  function handleThemeChange(newTheme) {
    setTheme(newTheme);
    setSoundTheme(newTheme);
  }

  // 🌍 Apply theme globally
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

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
    kingInCheckSquare,
  } = useChessGame();

  return (
    <>
      {/* Global styles */}
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
        `}
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
        {/* ⏱ Player info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          <PlayerInfo name={`White (${whiteTime}s)`} isActive={turn === "w"} />
          <PlayerInfo name={`Black (${blackTime}s)`} isActive={turn === "b"} />
        </div>

        {/* 🎨 Theme Switcher */}
        <ThemeSwitcher
          theme={theme}
          onThemeChange={handleThemeChange}
        />

        {/* ♟ Board + History */}
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
            kingInCheckSquare={kingInCheckSquare}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <GameStateBanner
              isCheck={isCheck}
              isCheckmate={isCheckmate}
              turn={turn}
            />
            <MoveHistory moves={moves} />
          </div>
        </div>

        {/* 🔁 Turn Indicator (optional now, since player box lights up) */}
        <TurnIndicator turn={turn} />
      </div>
    </>
  );
}
