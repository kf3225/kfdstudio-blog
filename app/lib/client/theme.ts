const THEME_KEY = "theme";

type Theme = "light" | "dark";

const getStoredTheme = (): Theme | null => {
  const value = localStorage.getItem(THEME_KEY);
  if (value === "light" || value === "dark") {
    return value;
  }
  return null;
};

const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getPreferredTheme = (): Theme => {
  return getStoredTheme() ?? getSystemTheme();
};

const applyTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

const updateThemeToggleButton = (button: HTMLButtonElement, theme: Theme): void => {
  const icon = button.querySelector<HTMLElement>("[data-theme-icon]");
  if (icon) {
    icon.textContent = theme === "dark" ? "☀" : "☾";
  }
  button.setAttribute(
    "aria-label",
    theme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え",
  );
};

export const initThemeToggle = (): void => {
  const button = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  if (!button) {
    return;
  }

  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);
  updateThemeToggleButton(button, currentTheme);

  button.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, currentTheme);
    applyTheme(currentTheme);
    updateThemeToggleButton(button, currentTheme);
  });
};
