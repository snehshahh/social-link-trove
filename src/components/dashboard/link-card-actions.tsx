import { Button } from "@/components/ui/button";
import { Share, Star, Trash2, Edit, BookmarkPlus, Bookmark, X } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { toggleImportant, togglePublic, deleteLink } from "@/store/slices/linksSlice";
import { setShowSharePopup, setShowPublicConfirmation } from "@/store/slices/uiSlice";
import { SharePopup } from "@/components/share-popup";
import { PublicConfirmationDialog } from "@/components/ui/public-confirmation-dialog";
import { toast } from "sonner";


interface LinkCardActionsProps {
  id: string;
  title: string;
  bool_imp: boolean;
  isPublic: boolean;
  variant?: "default" | "collection";
  onEdit: () => void;
}

// Lines 25-31: Remove these props from the function parameters
export function LinkCardActions({
  id,
  title,
  bool_imp,
  isPublic,
  variant = "default",
  onEdit,
}: LinkCardActionsProps) {
  const dispatch = useDispatch();
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

  const handleDelete = () => {
    dispatch(deleteLink(id));
    toast.success("Link removed");
  };


  if (variant === "collection") {
    return (
      <>
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
        <Button
          size="sm"
          variant="outline"
          className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white"
          onClick={() => {
            // Handle remove from collection directly here
            // This would need to be implemented with the appropriate Redux action
            toast.success("Removed from collection");
          }}
        >
          <X className="h-4 w-4 mr-1" />
          Remove
        </Button>
        <Button
          size="sm"
          className="bg-white border border-white/20 text-black hover:bg-black hover:text-white"
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
          className="border-white/10 text-black/90 hover:bg-white/5 hover:text-white"
          onClick={handleToggleImportant}
        >
          <Star className="h-4 w-4 mr-1" />
          {bool_imp ? "Remove" : "Mark"} Important
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-white/10 text-black/90 hover:bg-white/5 hover:text-white"
          onClick={handleShare}
        >
          <Share className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-white/10 text-black/90 hover:bg-white/5 hover:text-white"
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
