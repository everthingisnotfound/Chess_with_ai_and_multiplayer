import "./playerInfo.css"
export default function PlayerInfo({ name, isActive }) {
  return (
    <div className={`player-info ${isActive ? "active" : ""}`}>
      {name}
    </div>
  );
}
