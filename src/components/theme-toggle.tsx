
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <Toggle 
      pressed={isDarkMode}
      onPressedChange={onToggle}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
    >
      {isDarkMode ? 
        <Sun className="h-4 w-4 text-yellow-400" /> : 
        <Moon className="h-4 w-4" />
      }
    </Toggle>
  );
}
