
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
      className={`w-10 h-10 rounded-full ${isDarkMode ? 
        "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800" : 
        "bg-white hover:bg-zinc-100 border border-zinc-200"
      } transition-all duration-300`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? 
        <Sun className="h-4 w-4 text-yellow-400" /> : 
        <Moon className="h-4 w-4 text-zinc-600" />
      }
    </Toggle>
  );
}
