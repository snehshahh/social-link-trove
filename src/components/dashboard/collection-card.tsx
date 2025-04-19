
import { useState } from "react";
import { Folder, Share2, Pencil, Trash, Check, X, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface CollectionCardProps {
  id: string;
  name: string;
  linkCount: number;
  dateCreated: string;
  onEdit?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function CollectionCard({
  id,
  name,
  linkCount,
  dateCreated,
  onEdit,
  onDelete,
  onShare,
  onClick,
}: CollectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);

  // Format the date
  const formattedDate = new Date(dateCreated).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleEditName = async () => {
    if (editedName.trim() === "") {
      toast.error("Collection name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      onEdit?.(id, editedName);
      setIsEditing(false);
      toast.success("Collection renamed successfully");
    } catch (error) {
      toast.error("Failed to rename collection");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    onShare?.(id);
    toast.success("Collection link copied to clipboard");
  };

  const handleDelete = () => {
    onDelete?.(id);
    toast.success("Collection deleted");
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click was not on a button or input
    if (
      !(e.target as HTMLElement).closest('button') &&
      !(e.target as HTMLElement).closest('input')
    ) {
      onClick?.(id);
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group",
        "animate-fade-in bg-gradient-to-br from-black to-zinc-900 border border-white/10 hover:border-white/20"
      )}
      onClick={handleCardClick}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400/10 via-yellow-400/50 to-yellow-400/10"></div>
      <CardHeader className="pb-2 relative">
        <div className="absolute top-2 right-2 flex items-center justify-center size-8 rounded-full bg-zinc-950/50 backdrop-blur border border-white/5">
          <Folder className="h-4 w-4 text-yellow-400" />
        </div>
        
        {isEditing ? (
          <div className="pt-2 flex items-center gap-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Collection name"
              className="transition-all bg-zinc-950 border-white/10 text-white focus:border-white/20"
              autoFocus
            />
          </div>
        ) : (
          <>
            <CardTitle className="text-xl font-medium pt-2 text-white pr-8">
              {name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs font-normal text-white/70 border-white/10 bg-zinc-950/50">
                <LinkIcon className="h-3 w-3 mr-1 text-yellow-400" />
                {linkCount} {linkCount === 1 ? "link" : "links"}
              </Badge>
            </div>
          </>
        )}
        <CardDescription className="text-sm mt-1 text-white/60">
          Created on {formattedDate}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="h-10 flex items-center">
          <div className="w-full h-1.5 bg-zinc-950 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400/50 to-yellow-400"
              style={{ width: `${Math.min(100, linkCount * 10)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-white/10 pt-4 bg-zinc-950/30">
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={() => {
                setIsEditing(false);
                setEditedName(name);
              }}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" className="bg-white border border-white/20 text-black hover:bg-black hover:text-white" onClick={handleEditName} disabled={isSaving}>
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}>
                <Pencil className="h-4 w-4 mr-1" />
                Rename
              </Button>
              <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button size="sm" variant="outline" className="border-white/10 text-white/90 hover:bg-white/5 hover:text-white" onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}>
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
