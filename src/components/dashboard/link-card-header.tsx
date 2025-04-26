
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Globe, Lock, ChevronUp, ChevronDown } from "lucide-react";
import { Star } from "lucide-react";

interface LinkCardHeaderProps {
  domain: string;
  favicon?: string;
  isImportant: boolean;
  isPublic: boolean;
  isPreviewOpen: boolean;
  onTogglePublic: () => void;
  onTogglePreview: () => void;
}

export function LinkCardHeader({
  domain,
  favicon,
  isImportant,
  isPublic,
  isPreviewOpen,
  onTogglePublic,
  onTogglePreview,
}: LinkCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {favicon && (
          <img 
            src={favicon} 
            alt={`${domain} favicon`} 
            width={16} 
            height={16} 
            className="rounded-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <Badge variant="outline" className="text-xs font-normal text-white/70 border-white/10">
          {domain}
        </Badge>
        {isImportant && (
          <Badge variant="secondary" className="bg-black border border-yellow-400/50 text-yellow-400">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 stroke-yellow-400" /> Important
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white/60">
            {isPublic ? (
              <Globe className="h-3.5 w-3.5 text-white/60" />
            ) : (
              <Lock className="h-3.5 w-3.5 text-white/60" />
            )}
          </span>
          <Switch 
            checked={isPublic}
            onCheckedChange={onTogglePublic}
            className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-zinc-800"
          />
          <span className="text-xs text-white/60">{isPublic ? "Public" : "Private"}</span>
        </div>
        <Button 
          size="sm" 
          variant="ghost"
          className="h-8 w-8 p-0" 
          onClick={onTogglePreview}
        >
          {isPreviewOpen ? (
            <ChevronUp className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/70" />
          )}
        </Button>
      </div>
    </div>
  );
}
