import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Globe, Lock, ChevronUp, ChevronDown, Star, X } from "lucide-react";
import { useDispatch } from 'react-redux';
import { togglePublic } from "@/store/slices/linksSlice";
import { setShowPublicConfirmation } from "@/store/slices/uiSlice";

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
        <Badge variant="outline" className="text-xs font-normal text-white/70 border-white/10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">
          {domain}
        </Badge>
        {bool_imp && (
          <Badge variant="secondary" className="bg-black border border-yellow-400/50 text-yellow-400 whitespace-nowrap">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 stroke-yellow-400" /> Important
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white/60 hidden sm:inline-block">
            {isPublic ? (
              <Globe className="h-3.5 w-3.5 text-white/60" />
            ) : (
              <Lock className="h-3.5 w-3.5 text-white/60" />
            )}
          </span>
          <Switch
            checked={isPublic}
            onCheckedChange={handleTogglePublic}
            className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-zinc-800 scale-90"
          />
          <span className="text-xs text-white/60 whitespace-nowrap">{isPublic ? "Public" : "Private"}</span>
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
