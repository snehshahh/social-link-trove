
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <header className={`py-4 border-b ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'}`}>
      <div className="container flex items-center gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
          <Input
            type="search"
            placeholder="Search links and collections..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={isDark 
              ? "pl-10 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-500" 
              : "pl-10 bg-white border-zinc-200 text-zinc-800 placeholder:text-zinc-400"}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={isDark 
            ? "border-zinc-800 text-zinc-400 hover:bg-zinc-900" 
            : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}
        >
          {isDark ? '🌙' : '☀️'}
        </Button>
      </div>
    </header>
  );
}
