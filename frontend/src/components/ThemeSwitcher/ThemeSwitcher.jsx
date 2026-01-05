export default function ThemeSwitcher({ theme, onThemeChange }) {
  const themes = [
    { key: "light", label: "☀️ Light" },
    { key: "dark", label: "🌑 Dark" },
    { key: "tech", label: "⚡ Tech" },
    { key: "real", label: "♟ Real" },
  ];

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {themes.map((t) => (
        <button
          key={t.key}
          onClick={() => onThemeChange(t.key)}
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            border:
              theme === t.key
                ? "2px solid #64b5f6"
                : "1px solid rgba(255,255,255,0.25)",
            background:
              theme === t.key
                ? "rgba(100,181,246,0.15)"
                : "rgba(255,255,255,0.05)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
