let currentTheme = "light";

const audioCache = {};

export function setSoundTheme(theme) {
  currentTheme = theme;
}

export function playSound(type) {
  const key = `${currentTheme}-${type}`;

  if (!audioCache[key]) {
    audioCache[key] = new Audio(`/sounds/${currentTheme}/${type}.mp3`);
    audioCache[key].volume = 0.8;
  }

  const audio = audioCache[key];
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
