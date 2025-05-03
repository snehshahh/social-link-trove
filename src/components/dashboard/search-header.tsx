
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/hooks/use-theme";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchHeader({
  searchQuery,
  onSearchChange,
}: SearchHeaderProps) {
  const { isDark, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };
  
  return (
    <header className={`py-4 border-b backdrop-blur-md transition-colors duration-300 ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/80' : 'border-zinc-200/80 bg-white/80'
    }`}>
      <div className="container flex items-center gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
            isDark ? 'text-zinc-500' : 'text-zinc-400'
          }`} />
          <Input
            type="search"
            placeholder="Search links and collections..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`pl-10 transition-all duration-300 ${
              isDark 
                ? "bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-500 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20" 
                : "bg-white border-zinc-200 text-zinc-800 placeholder:text-zinc-400 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            }`}
          />
        </div>
        <ThemeToggle isDarkMode={isDark} onToggle={toggleTheme} />
      </div>
    </header>
  );
}
