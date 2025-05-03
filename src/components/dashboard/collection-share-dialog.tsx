import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface CollectionShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  collectionId: string;
  collectionName: string;
  internalShare: (collectionId: string) => void;
  externalShare: (collectionId: string) => string;
}

export default function CollectionShareDialog({
  isOpen,
  onClose,
  collectionId,
  collectionName,
  internalShare,
  externalShare,
}: CollectionShareDialogProps) {
  const [isInternalShare, setIsInternalShare] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(externalShare(collectionId));

  const handleInternalShare = () => {
    internalShare(collectionId);
    toast.success("Collection shared internally");
    onClose();
  };

  const handleExternalShare = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success("Collection URL copied to clipboard");
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">
            Share Collection: {collectionName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant={isInternalShare ? "default" : "outline"}
              onClick={() => setIsInternalShare(true)}
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Internally
            </Button>
            <Button
              variant={!isInternalShare ? "default" : "outline"}
              onClick={() => setIsInternalShare(false)}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Share Externally
            </Button>
          </div>

          {!isInternalShare && (
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={handleExternalShare}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {isCopied ? "Copied!" : "Copy URL"}
                </Button>
              </div>
              <p className="text-sm text-white/60">
                Share this URL with anyone to give them access to your collection
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={isInternalShare ? handleInternalShare : handleExternalShare}>
            {isInternalShare ? "Share Internally" : "Copy URL"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}