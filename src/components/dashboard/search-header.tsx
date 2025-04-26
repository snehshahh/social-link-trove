
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchHeader({
  isDarkMode,
  onToggleTheme,
  searchQuery,
  onSearchChange,
}: SearchHeaderProps) {
  return (
    <header className={`py-4 border-b ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'}`}>
      <div className="container flex items-center gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search links and collections..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-500"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          className="border-zinc-800 text-zinc-400 hover:bg-zinc-900"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </Button>
      </div>
    </header>
  );
}
