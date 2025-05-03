
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsDown, Globe, Clock } from "lucide-react";
import { Link } from "@/types/link";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface LinkContentProps {
  link: Link;
  isEditing: boolean;
  editedNotes: string;
  showFullDescription: boolean;
  onShowMoreDescription: () => void;
  onEditNotesChange: (value: string) => void;
}

export function LinkContent({
  link,
  isEditing,
  editedNotes,
  showFullDescription,
  onShowMoreDescription,
  onEditNotesChange,
}: LinkContentProps) {
  const { isDark } = useTheme();
  
  const truncateDescription = (text?: string, limit = 150) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };
  return (
    <div className="w-full space-y-3">
      <CardTitle className={cn(
        "text-lg md:text-xl font-medium text-balance break-words",
        isDark ? "text-white" : "text-zinc-900"
      )}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "transition-colors hover:underline",
            isDark ? "hover:text-white" : "hover:text-zinc-700"
          )}
        >
          {link.title}
        </a>
      </CardTitle>
      
      <CardDescription className={cn(
        "text-sm md:text-base break-words",
        isDark ? "text-white/70" : "text-zinc-600"
      )}>
        {showFullDescription || !link.description || link.description.length <= 150
          ? link.description
          : (
            <>
              {truncateDescription(link.description)}
              <button
                onClick={onShowMoreDescription}
                className="text-yellow-400 font-medium ml-1 hover:underline inline-block"
              >
                Show more
              </button>
            </>
          )}
      </CardDescription>
      
      {link.tags && link.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {link.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={cn(
                "text-xs",
                isDark 
                  ? "bg-zinc-800/50 text-white/70 border-zinc-700" 
                  : "bg-zinc-100 text-zinc-700 border-zinc-200"
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      {isEditing ? (
        <div className="space-y-2 mt-3 w-full">
          <Textarea
            value={editedNotes}
            onChange={(e) => onEditNotesChange(e.target.value)}
            placeholder="Add your notes here..."
            className={cn(
              "min-h-[100px] w-full transition-all resize-y",
              isDark 
                ? "bg-zinc-950 border-white/10 text-white focus:border-white/20" 
                : "bg-white border-zinc-200 text-zinc-900 focus:border-zinc-300"
            )}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
