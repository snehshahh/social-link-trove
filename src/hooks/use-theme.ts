
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  
  // If the theme is set to system, use the system preference
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  const isLight = currentTheme === 'light';

  return {
    theme: currentTheme,
    setTheme,
    isDark,
    isLight,
  };
}
