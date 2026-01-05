export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "12px",
        flexWrap: "wrap",
      }}
    >
      {[
        { id: "light", label: "☀️ Light" },
        { id: "dark", label: "🌑 Dark" },
        { id: "tech", label: "⚡ Tech" },
        { id: "wood", label: "♟️ Real" },
      ].map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          style={{
            padding: "6px 14px",
            borderRadius: "20px",
            border:
              theme === t.id
                ? "2px solid #90caf9"
                : "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.08)",
            color: "#eaeaea",
            cursor: "pointer",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
