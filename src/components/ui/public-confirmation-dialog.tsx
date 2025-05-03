import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface PublicConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function PublicConfirmationDialog({ isOpen, onClose, onConfirm, title }: PublicConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Make Link Public
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Once you make this link public, it cannot be made private again. Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 bg-zinc-950 rounded-md border border-white/10">
          <h3 className="text-white font-medium">{title}</h3>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            className="text-white border-white/20 hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Make Public
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 