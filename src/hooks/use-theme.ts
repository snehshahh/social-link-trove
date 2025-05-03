
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  
  // If the theme is set to system, use the system preference
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return {
    theme: currentTheme,
    setTheme,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
  };
}
