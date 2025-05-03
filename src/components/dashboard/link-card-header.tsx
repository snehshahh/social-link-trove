
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Globe, Lock, ChevronUp, ChevronDown, Star, X } from "lucide-react";
import { useDispatch } from 'react-redux';
import { togglePublic } from "@/store/slices/linksSlice";
import { setShowPublicConfirmation } from "@/store/slices/uiSlice";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface LinkCardHeaderProps {
  domain: string;
  bool_imp: boolean;
  isPublic: boolean;
  isPreviewOpen: boolean;
  favicon?: string;
  id: string;
  onTogglePreview: () => void;
}

export function LinkCardHeader({
  domain,
  bool_imp,
  isPublic,
  isPreviewOpen,
  favicon,
  id,
  onTogglePreview,
}: LinkCardHeaderProps) {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  
  const handleTogglePublic = () => {
    if (!isPublic) {
      dispatch(setShowPublicConfirmation(true));
    } else {
      dispatch(togglePublic(id));
    }
  };
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
      <div className="flex flex-wrap items-center gap-2">
        {favicon && (
          <img
            src={favicon}
            alt={`${domain} favicon`}
            width={16}
            height={16}
            className="rounded-sm hidden sm:block"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none",
            isDark ? "text-white/70 border-white/10" : "text-zinc-600 border-zinc-200"
          )}
        >
          {domain}
        </Badge>
        {bool_imp && (
          <Badge 
            variant="secondary" 
            className={cn(
              "whitespace-nowrap",
              isDark 
                ? "bg-black border border-yellow-400/50 text-yellow-400" 
                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
            )}
          >
            <Star className={cn(
              "h-3 w-3 mr-1",
              isDark ? "fill-yellow-400 stroke-yellow-400" : "fill-yellow-500 stroke-yellow-500"
            )} /> 
            Important
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs hidden sm:inline-block">
            {isPublic ? (
              <Globe className={cn(
                "h-3.5 w-3.5",
                isDark ? "text-white/60" : "text-zinc-500"
              )} />
            ) : (
              <Lock className={cn(
                "h-3.5 w-3.5",
                isDark ? "text-white/60" : "text-zinc-500"
              )} />
            )}
          </span>
          <Switch
            checked={isPublic}
            onCheckedChange={handleTogglePublic}
            className={cn(
              "scale-90",
              isDark 
                ? "data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-zinc-800" 
                : "data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-zinc-300"
            )}
          />
          <span className={cn(
            "text-xs whitespace-nowrap",
            isDark ? "text-white/60" : "text-zinc-500"
          )}>
            {isPublic ? "Public" : "Private"}
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={onTogglePreview}
        >
          {isPreviewOpen ? (
            <ChevronUp className={cn(
              "h-4 w-4",
              isDark ? "text-white/70" : "text-zinc-600"
            )} />
          ) : (
            <ChevronDown className={cn(
              "h-4 w-4",
              isDark ? "text-white/70" : "text-zinc-600"
            )} />
          )}
        </Button>
      </div>
    </div>
  );
}
