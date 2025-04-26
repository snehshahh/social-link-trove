
import { Star, Share, Edit, Save, BookmarkPlus, Bookmark, X, ChevronDown, ChevronUp, Globe, Lock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface LinkCardActionsProps {
  id: string;
  isEditing: boolean;
  isPublic: boolean;
  isImportant: boolean;
  variant?: "default" | "collection";
  isSaving?: boolean;
  onTogglePublic: (id: string, isPublic: boolean) => void;
  onToggleImportant: (id: string, important: boolean) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveToCollection?: (id: string) => void;
  onRemoveFromCollection?: (id: string) => void;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
}

export function LinkCardActions({
  id,
  isEditing,
  isPublic,
  isImportant,
  variant = "default",
  isSaving,
  onTogglePublic,
  onToggleImportant,
  onShare,
  onDelete,
  onSaveToCollection,
  onRemoveFromCollection,
  onEdit,
  onCancelEdit,
  onSave,
}: LinkCardActionsProps) {
  const handleTogglePublic = () => {
    onTogglePublic(id, !isPublic);
    toast.success(isPublic ? "Link set to private" : "Link set to public");
  };

  const handleToggleImportant = () => {
    onToggleImportant(id, !isImportant);
    toast.success(isImportant ? "Removed from important" : "Marked as important");
  };

  const handleShare = () => {
    if (!isPublic) {
      toast.error("Only public links can be shared");
      return;
    }
    onShare(id);
    toast.success("Link shared successfully");
  };

  const handleDelete = () => {
    onDelete(id);
    toast.success("Link removed");
  };

  if (isEditing) {
    return (
      <>
        <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={onCancelEdit}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button size="sm" className="bg-white border border-white/20 text-black hover:bg-black hover:text-white" onClick={onSave} disabled={isSaving}>
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save
            </>
          )}
        </Button>
      </>
    );
  }

  if (variant === "collection") {
    return (
      <>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
          onClick={() => onShare?.(id)}
          disabled={!isPublic}
        >
          <Share className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" 
          onClick={() => onRemoveFromCollection?.(id)}
        >
          <Bookmark className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </>
    );
  }

  return (
    <>
      <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={handleDelete}>
        <Trash2 className="h-4 w-4 mr-1" />
        Delete
      </Button>
      <Button 
        size="sm" 
        className={`border text-white/90 ${
          isImportant 
            ? "bg-black border-yellow-400/70 text-yellow-400 hover:bg-yellow-400/10" 
            : "border-white/10 hover:bg-white/5 hover:text-white"
        }`}
        onClick={handleToggleImportant}
      >
        <Star className={`h-4 w-4 mr-1 ${isImportant && "fill-yellow-400 stroke-yellow-400"}`} />
        {isImportant ? "Important" : "Mark Important"}
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
        onClick={handleShare}
        disabled={!isPublic}
      >
        <Share className="h-4 w-4 mr-1" />
        Share
      </Button>
      <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={onEdit}>
        <Edit className="h-4 w-4 mr-1" />
        Edit Notes
      </Button>
      <Button size="sm" className="bg-white border border-white/20 text-black hover:bg-black hover:text-white" onClick={() => onSaveToCollection?.(id)}>
        <BookmarkPlus className="h-4 w-4 mr-1" />
        Save to Collection
      </Button>
    </>
  );
}
