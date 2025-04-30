import { useState } from "react";
import { BookmarkPlus, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Collection {
  id: string;
  name: string;
}

interface CollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkId: string;
  collections: Collection[];
  onAddToCollection: (linkId: string, collectionId: string) => void;
  onRemoveFromCollection: (collectionId: string, linkId: string) => void;
  onCreateCollection: (name: string) => Promise<void>;
}

export function CollectionDialog({
  open,
  onOpenChange,
  linkId,
  collections,
  onAddToCollection,
  onRemoveFromCollection,
  onCreateCollection,
}: CollectionDialogProps) {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);

  const handleAddToCollection = async () => {
    if (showNewCollectionInput) {
      if (newCollectionName.trim() === "") {
        toast.error("Please enter a collection name");
        return;
      }

      setIsCreating(true);
      try {
        await onCreateCollection(newCollectionName);
        toast.success(`Added to "${newCollectionName}" collection`);
        onOpenChange(false);
        resetForm();
      } catch (error) {
        toast.error("Failed to create collection");
      } finally {
        setIsCreating(false);
      }
    } else {
      if (!selectedCollection) {
        toast.error("Please select a collection");
        return;
      }

      try {
        onAddToCollection(linkId, selectedCollection);
        const collection = collections.find(c => c.id === selectedCollection);
        toast.success(`Added to "${collection?.name}" collection`);
        onOpenChange(false);
        resetForm();
      } catch (error) {
        toast.error("Failed to add to collection");
      }
    }
  };

  const resetForm = () => {
    setSelectedCollection(null);
    setNewCollectionName("");
    setShowNewCollectionInput(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save to Collection</DialogTitle>
          <DialogDescription>
            Choose a collection to save your link to or create a new one.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          {collections.length > 0 && !showNewCollectionInput && (
            <ScrollArea className="h-[200px] pr-4">
              <RadioGroup 
                value={selectedCollection || ""} 
                onValueChange={setSelectedCollection}
                className="space-y-2"
              >
                {collections.map((collection) => (
                  <div key={collection.id} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary">
                    <RadioGroupItem value={collection.id} id={collection.id} />
                    <Label htmlFor={collection.id} className="flex-grow cursor-pointer">
                      {collection.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </ScrollArea>
          )}

          {showNewCollectionInput ? (
            <div className="space-y-2">
              <Label htmlFor="collection-name">New Collection Name</Label>
              <Input
                id="collection-name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter collection name"
                className="col-span-3"
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setShowNewCollectionInput(false)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowNewCollectionInput(true)}
            >
              <BookmarkPlus className="h-4 w-4 mr-1" />
              Create New Collection
            </Button>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddToCollection}
            disabled={isCreating || (!selectedCollection && !newCollectionName)}
          >
            {isCreating ? "Creating..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
