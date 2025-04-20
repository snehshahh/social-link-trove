
import { Search, LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface SearchHeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchHeader({ isDarkMode, onToggleTheme, searchQuery, onSearchChange }: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <p className="text-2xl font-bold mx-3 font-poppins text-white">linker'sdb</p>
        <div className="flex items-center space-x-4">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 bg-zinc-950 border-white/10 text-white/90 focus:border-white/20"
            />
          </div>
          <Button className="bg-white border border-white/20 text-black hover:bg-black hover:text-white">
            <LinkIcon className="h-4 w-4 mr-1" />
            Add Link
          </Button>
        </div>
      </div>
    </header>
  );
}
