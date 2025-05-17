
import { Button } from "@/components/ui/button";
import { Share, Star, Trash2, Edit, BookmarkPlus, Bookmark, X, Copy } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { toggleImportant, togglePublic, deleteLink } from "@/store/slices/linksSlice";
import { setShowSharePopup, setShowPublicConfirmation } from "@/store/slices/uiSlice";
import { SharePopup } from "@/components/share-popup";
import { PublicConfirmationDialog } from "@/components/ui/public-confirmation-dialog";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface LinkCardActionsProps {
  id: string;
  title: string;
  bool_imp: boolean;
  isPublic: boolean;
  variant?: "default" | "collection";
  onEdit: () => void;
}

export function LinkCardActions({
  id,
  title,
  bool_imp,
  isPublic,
  variant = "default",
  onEdit,
}: LinkCardActionsProps) {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const showSharePopup = useSelector((state: RootState) => state.ui.showSharePopup);
  const showPublicConfirmation = useSelector((state: RootState) => state.ui.showPublicConfirmation);

  const handleToggleImportant = () => {
    dispatch(toggleImportant(id));
    toast.success(bool_imp ? "Removed from important" : "Marked as important");
  };

  const handleShare = () => {
    if (!isPublic) {
      toast.error("Only public links can be shared");
      return;
    }
    dispatch(setShowSharePopup(true));
  };

  const handleCopyLink = () => {
    // Get the hosting URL from env or fallback to current origin
    const hostingUrl = process.env.HOSTING_URL || window.location.origin;
    const shareUrl = `${hostingUrl}/sharedLink/${id}`;
    
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };

  const handleDelete = () => {
    dispatch(deleteLink(id));
    toast.success("Link removed");
  };

  const buttonClassName = cn(
    "border transition-colors",
    isDark 
      ? "border-white/10 text-white/90 hover:bg-white/5 hover:text-white" 
      : "border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
  );

  if (variant === "collection") {
    return (
      <>
        <Button
          size="sm"
          variant="outline"
          className={buttonClassName}
          onClick={handleShare}
          disabled={!isPublic}
        >
          <Share className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={buttonClassName}
          onClick={handleCopyLink}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy Link
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={buttonClassName}
          onClick={() => {
            // Handle remove from collection directly here
            toast.success("Removed from collection");
          }}
        >
          <X className="h-4 w-4 mr-1" />
          Remove
        </Button>
        <Button
          size="sm"
          className={cn(
            isDark 
              ? "bg-white border border-white/20 text-black hover:bg-black hover:text-white" 
              : "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800"
          )}
          onClick={onEdit}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className={buttonClassName}
          onClick={handleToggleImportant}
        >
          <Star className={cn(
            "h-4 w-4 mr-1",
            bool_imp && (isDark ? "text-yellow-400" : "text-blue-500")
          )} />
          {bool_imp ? "Remove" : "Mark"} Important
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={buttonClassName}
          onClick={handleCopyLink}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy Link
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={buttonClassName}
          onClick={handleShare}
        >
          <Share className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={buttonClassName}
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>

      <SharePopup
        isOpen={showSharePopup}
        onClose={() => dispatch(setShowSharePopup(false))}
        onShare={(friend) => {
          toast.success(`Shared with ${friend}`);
        }}
      />

      <PublicConfirmationDialog
        isOpen={showPublicConfirmation}
        onClose={() => dispatch(setShowPublicConfirmation(false))}
        onConfirm={() => {
          dispatch(togglePublic(id));
          dispatch(setShowPublicConfirmation(false));
        }}
        title={title}
      />
    </>
  );
}
