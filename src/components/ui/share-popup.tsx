import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, Copy, Mail, X } from "lucide-react";
import { toast } from "sonner";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shareUrl: string;
  type: "friend" | "link";
}

export function SharePopup({ isOpen, onClose, title, shareUrl, type }: SharePopupProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleShareEmail = () => {
    const subject = `Check out this ${type} on Linker's DB`;
    const body = `I wanted to share this ${type} with you: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Share {type === "friend" ? "Friend" : "Link"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-zinc-950 rounded-md border border-white/10">
            <h3 className="text-white font-medium mb-2">{title}</h3>
            <p className="text-sm text-white/70 break-all">{shareUrl}</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 text-white border-white/20 hover:bg-white/10"
              onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-white border-white/20 hover:bg-white/10"
              onClick={handleShareEmail}
            >
              <Mail className="mr-2 h-4 w-4" />
              Share via Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 