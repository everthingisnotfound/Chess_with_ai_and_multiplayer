let currentTheme = "light";

export function setSoundTheme(theme) {
  currentTheme = theme;
}

export function playSound(type) {
  const audio = new Audio(
    `/sounds/${currentTheme}/${type}.mp3`
  );

  audio.volume = 0.8;
  audio.play().catch(() => {});
}
