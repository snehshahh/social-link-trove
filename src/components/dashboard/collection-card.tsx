
import { useState } from "react";
import { Folder, Share2, Pencil, Trash, Check, X } from "lucide-react";
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
        "overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer",
        "animate-fade-in"
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-primary" />
            <Badge variant="outline" className="text-xs font-normal">
              {linkCount} {linkCount === 1 ? "link" : "links"}
            </Badge>
          </div>
        </div>
        {isEditing ? (
          <div className="pt-2 flex items-center gap-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Collection name"
              className="transition-all"
              autoFocus
            />
          </div>
        ) : (
          <CardTitle className="text-xl font-medium pt-2">
            {name}
          </CardTitle>
        )}
        <CardDescription className="text-sm mt-1">
          Created on {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Empty content to maintain consistent card height */}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button size="sm" variant="outline" onClick={() => {
                setIsEditing(false);
                setEditedName(name);
              }}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleEditName} disabled={isSaving}>
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
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}>
                <Pencil className="h-4 w-4 mr-1" />
                Rename
              </Button>
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button size="sm" variant="outline" onClick={(e) => {
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
