
import { useState } from "react";
import { 
  Trash2, Star, Share, Edit, Save, BookmarkPlus, Bookmark, 
  CheckCircle, X, ChevronDown, ChevronUp, Globe, Lock
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

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

  // Format the date
  const formattedDate = new Date(dateAdded).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Extract domain from URL
  const domain = url ? new URL(url).hostname.replace("www.", "") : "";

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
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

  const handleToggleImportant = () => {
    onToggleImportant?.(id, !isImportant);
    toast.success(isImportant ? "Removed from important" : "Marked as important");
  };

  const handleTogglePublic = () => {
    onTogglePublic?.(id, !isPublic);
    toast.success(isPublic ? "Link set to private" : "Link set to public");
  };

  const handleShare = () => {
    if (!isPublic) {
      toast.error("Only public links can be shared");
      return;
    }
    onShare?.(id);
    toast.success("Link shared successfully");
  };

  const handleSaveToCollection = () => {
    onSaveToCollection?.(id);
  };

  const handleDelete = () => {
    onDelete?.(id);
    toast.success("Link removed");
  };

  const handleRemoveFromCollection = () => {
    onRemoveFromCollection?.(id);
    toast.success("Removed from collection");
  };

  const truncateDescription = (text?: string, limit = 150) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 group hover:shadow-md bg-black border border-white/10 hover:border-white/20", 
      isImportant && "border-l-4 border-l-yellow-400",
      "animate-fade-in"
    )}>
      <CardHeader className="relative pb-3">
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
                onCheckedChange={handleTogglePublic}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-zinc-800"
              />
              <span className="text-xs text-white/60">{isPublic ? "Public" : "Private"}</span>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 w-8 p-0" 
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            >
              {isPreviewOpen ? (
                <ChevronUp className="h-4 w-4 text-white/70" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/70" />
              )}
            </Button>
          </div>
        </div>
        <CardTitle className="text-xl font-medium pt-2 text-balance text-white">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            {title}
          </a>
        </CardTitle>
        <CardDescription className="text-base mt-2 text-white/70">
          {showFullDescription || !description || description.length <= 150 
            ? description 
            : (
              <>
                {truncateDescription(description)}
                <button 
                  onClick={() => setShowFullDescription(true)} 
                  className="text-yellow-400 font-medium ml-1 hover:underline"
                >
                  Show more
                </button>
              </>
            )}
        </CardDescription>
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
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              placeholder="Add your notes here..."
              className="min-h-[100px] transition-all bg-zinc-950 border-white/10 text-white focus:border-white/20"
            />
          </div>
        ) : (
          notes && (
            <div className="bg-zinc-950 p-3 rounded-lg text-sm">
              <p className="text-white/50 font-medium text-xs uppercase mb-1">Notes</p>
              <p className="text-balance text-white/90">{notes}</p>
            </div>
          )
        )}
      </CardContent>
      <CardFooter className={cn(
        "flex flex-wrap items-center justify-between border-t border-white/10 pt-4 gap-2",
      )}>
        <div className="text-xs text-white/50">
          Added on {formattedDate}
        </div>
        <div className="flex flex-wrap gap-2">
          {variant === "default" ? (
            <>
              {isEditing ? (
                <>
                  <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button size="sm" className="bg-white border border-white/20 text-black hover:bg-black hover:text-white" onClick={handleSaveNotes} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Save
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                  <Button 
                    size="sm" 
                    className={cn(
                      "border text-white/90",
                      isImportant 
                        ? "bg-black border-yellow-400/70 text-yellow-400 hover:bg-yellow-400/10" 
                        : "border-white/10 hover:bg-white/5 hover:text-white"
                    )}
                    onClick={handleToggleImportant}
                  >
                    <Star className={cn(
                      "h-4 w-4 mr-1",
                      isImportant && "fill-yellow-400 stroke-yellow-400"
                    )} />
                    {isImportant ? "Important" : "Mark Important"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={cn(
                      "border-white/10 text-white/90 hover:bg-white/5 hover:text-white",
                      !isPublic && "opacity-50 cursor-not-allowed"
                    )} 
                    onClick={handleShare}
                    disabled={!isPublic}
                  >
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Notes
                  </Button>
                  <Button size="sm" className="bg-white border border-white/20 text-black hover:bg-black hover:text-white" onClick={handleSaveToCollection}>
                    <BookmarkPlus className="h-4 w-4 mr-1" />
                    Save to Collection
                  </Button>
                </>
              )}
            </>
          ) : (
            // Collection variant has fewer actions
            <>
              <Button 
                size="sm" 
                variant="outline" 
                className={cn(
                  "border-white/10 text-white/90 hover:bg-white/5 hover:text-white",
                  !isPublic && "opacity-50 cursor-not-allowed"
                )} 
                onClick={handleShare}
                disabled={!isPublic}
              >
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={handleRemoveFromCollection}>
                <Bookmark className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
