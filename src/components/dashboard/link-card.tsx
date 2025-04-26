import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LinkCardHeader } from "./link-card-header";
import { LinkCardActions } from "./link-card-actions";
import { LinkContent } from "./link-content";

export interface LinkCardProps {
  id: string;
  url: string;
  title: string;
  description?: string;
  notes?: string;
  favicon?: string;
  isImportant?: boolean;
  isPublic?: boolean;
  dateAdded: string;
  variant?: "default" | "collection";
  onDelete?: (id: string) => void;
  onToggleImportant?: (id: string, important: boolean) => void;
  onTogglePublic?: (id: string, isPublic: boolean) => void;
  onShare?: (id: string) => void;
  onSaveToCollection?: (id: string) => void;
  onUpdateNotes?: (id: string, notes: string) => void;
  onRemoveFromCollection?: (id: string) => void;
}

export function LinkCard({
  id,
  url,
  title,
  description,
  notes,
  favicon,
  isImportant = false,
  isPublic = false,
  dateAdded,
  variant = "default",
  onDelete,
  onToggleImportant,
  onTogglePublic,
  onShare,
  onSaveToCollection,
  onUpdateNotes,
  onRemoveFromCollection,
}: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const domain = url ? new URL(url).hostname.replace("www.", "") : "";
  const formattedDate = new Date(dateAdded).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      onUpdateNotes?.(id, editedNotes);
      setIsEditing(false);
      toast.success("Notes updated successfully");
    } catch (error) {
      toast.error("Failed to update notes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 group hover:shadow-md bg-black border border-white/10 hover:border-white/20", 
      isImportant && "border-l-4 border-l-yellow-400",
      "animate-fade-in"
    )}>
      <CardHeader className="relative pb-3">
        <LinkCardHeader
          domain={domain}
          favicon={favicon}
          isImportant={isImportant}
          isPublic={isPublic}
          isPreviewOpen={isPreviewOpen}
          onTogglePublic={() => onTogglePublic?.(id, !isPublic)}
          onTogglePreview={() => setIsPreviewOpen(!isPreviewOpen)}
        />
        <LinkContent
          url={url}
          title={title}
          description={description}
          notes={notes}
          isEditing={isEditing}
          editedNotes={editedNotes}
          showFullDescription={showFullDescription}
          onShowMoreDescription={() => setShowFullDescription(true)}
          onEditNotesChange={(value) => setEditedNotes(value)}
        />
      </CardHeader>
      
      {isPreviewOpen && (
        <div className="px-6 pb-4 -mt-2">
          <div className="w-full overflow-hidden rounded-lg border border-white/10">
            <iframe 
              src={url} 
              title={title}
              className="w-full h-[300px]"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
      
      <CardContent>
        {/* Content is handled by LinkContent component */}
      </CardContent>

      <CardFooter className={cn(
        "flex flex-wrap items-center justify-between border-t border-white/10 pt-4 gap-2",
      )}>
        <div className="text-xs text-white/50">
          Added on {formattedDate}
        </div>
        <div className="flex flex-wrap gap-2">
          <LinkCardActions
            id={id}
            isEditing={isEditing}
            isPublic={isPublic}
            isImportant={isImportant}
            variant={variant}
            isSaving={isSaving}
            onTogglePublic={(id, isPublic) => onTogglePublic?.(id, isPublic)}
            onToggleImportant={(id, important) => onToggleImportant?.(id, important)}
            onShare={(id) => onShare?.(id)}
            onDelete={(id) => onDelete?.(id)}
            onSaveToCollection={(id) => onSaveToCollection?.(id)}
            onRemoveFromCollection={(id) => onRemoveFromCollection?.(id)}
            onEdit={() => setIsEditing(true)}
            onCancelEdit={() => setIsEditing(false)}
            onSave={handleSaveNotes}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
